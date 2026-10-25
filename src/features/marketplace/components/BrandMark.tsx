import type { DemoProject } from "../types/marketplace.type";

export function BrandMark({
  project,
  size = "default",
}: {
  project: DemoProject;
  size?: "default" | "large";
}) {
  if (!project.logoUrl) return null;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#173d34]/10 bg-white shadow-sm ${size === "large" ? "h-20 w-20" : "h-14 w-14"}`}
    >
      {/* biome-ignore lint/performance/noImgElement: los iconos SVG de marca se sirven sin optimización necesaria */}
      <img
        src={project.logoUrl}
        alt=""
        width={size === "large" ? 48 : 34}
        height={size === "large" ? 48 : 34}
        className="object-contain"
      />
    </span>
  );
}
