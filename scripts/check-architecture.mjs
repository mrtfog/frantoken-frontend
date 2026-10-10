import { readdir, readFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "../src");
const nextFiles = new Set([
  "page.tsx",
  "layout.tsx",
  "template.tsx",
  "loading.tsx",
  "error.tsx",
  "global-error.tsx",
  "not-found.tsx",
  "forbidden.tsx",
  "unauthorized.tsx",
  "default.tsx",
  "route.ts",
  "sitemap.ts",
  "robots.ts",
  "manifest.ts",
  "icon.tsx",
  "apple-icon.tsx",
  "opengraph-image.tsx",
  "twitter-image.tsx",
]);
const typedName =
  /^[a-z][A-Za-z0-9]*\.(adapter|action|config|constants|context|hook|mapper|model|provider|repository|schema|service|type|util)\.(ts|tsx)$/;
const componentName = /^[A-Z][A-Za-z0-9]*(\.container)?\.tsx$/;
const uiName = /^[a-z][A-Za-z0-9]*\.tsx$/;
const testName =
  /^(?:[A-Z][A-Za-z0-9]*|[a-z][A-Za-z0-9]*)\.(test|spec)\.(ts|tsx)$/;
const errors = [];
const allowedCss = new Set([
  "app/globals.css",
  // Inventario histórico de referencia, no tema activo de la aplicación.
  "assets/css/design-tokens.css",
]);

async function visit(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  if (
    relative(root, directory).split(sep)[0] === "app" &&
    entries.some((entry) => entry.name === "page.tsx") &&
    !entries.some((entry) => entry.name === "loading.tsx")
  ) {
    errors.push(
      `${relative(root, directory)}/loading.tsx: falta skeleton de ruta`,
    );
  }
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(path);
      continue;
    }
    if (!entry.isFile()) continue;

    const parts = relative(root, path).split(sep);
    const relativePath = parts.join("/");
    if (entry.name.endsWith(".css")) {
      if (!allowedCss.has(relativePath)) {
        errors.push(
          `${relativePath}: usá Tailwind; CSS de componentes no permitido`,
        );
      }
      continue;
    }
    if (!/\.tsx?$/.test(entry.name)) continue;

    const [area] = parts;
    const name = entry.name;
    const source = await readFile(path, "utf8");
    if (
      parts.includes("constants") &&
      /\b(?:export\s+)?(?:type|interface)\s+[A-Z]/.test(source)
    ) {
      errors.push(`${relativePath}: declará los tipos en types/*.type.ts`);
    }
    if (name.endsWith(".tsx") && /<svg(?:\s|>)/i.test(source)) {
      errors.push(
        `${relativePath}: usá iconos de lucide-react en vez de SVG inline`,
      );
    }
    const cssImports = source.matchAll(
      /(?:from\s*|import\s*)["']([^"']+\.css)["']/g,
    );
    for (const [, importedCss] of cssImports) {
      if (
        relativePath !== "app/layout.tsx" ||
        importedCss !== "./globals.css"
      ) {
        errors.push(`${relativePath}: no importes CSS de componentes`);
      }
    }
    const isFeature = area === "features";
    if (isFeature && /^index\.tsx?$/.test(name)) {
      errors.push(`${parts.join("/")}: las features no usan barrels`);
      continue;
    }
    if (area === "app" && nextFiles.has(name)) continue;
    if (
      name === "index.ts" &&
      (area === "core" ||
        area === "lib" ||
        parts.slice(0, 2).join("/") === "components/ui")
    )
      continue;
    if (typedName.test(name) || testName.test(name)) continue;
    if (name.endsWith(".tsx") && componentName.test(name)) continue;
    if (parts.slice(0, 2).join("/") === "components/ui" && uiName.test(name))
      continue;
    errors.push(`${parts.join("/")}: nombre fuera de la convención`);
  }
}

await visit(root);
const globals = await readFile(resolve(root, "app/globals.css"), "utf8");
if (!/@import\s+["']tailwindcss["']\s*;/.test(globals)) {
  errors.push("app/globals.css: falta la entrada de Tailwind CSS");
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    "Arquitectura: nombres, barrels, tipos, iconos, skeletons y CSS válidos.",
  );
}
