import { readdir } from "node:fs/promises";
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

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(path);
      continue;
    }
    if (!entry.isFile() || !/\.tsx?$/.test(entry.name)) continue;

    const parts = relative(root, path).split(sep);
    const [area] = parts;
    const name = entry.name;
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
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Arquitectura: nombres y barrels válidos.");
}
