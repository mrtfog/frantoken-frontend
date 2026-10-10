import clsx from "clsx";
import type { ComponentProps } from "react";

type SelectProps = ComponentProps<"select"> & { variant?: "default" | "bare" };

export function Select({
  className,
  variant = "default",
  ...props
}: SelectProps) {
  return (
    <select
      className={clsx(
        "min-h-11 w-full cursor-pointer appearance-none text-[13px] font-semibold text-[#21483b] outline-none",
        variant === "default"
          ? "rounded-md border border-[#173d34]/25 bg-[#faf9f3] px-4 focus-visible:border-[#173d34] focus-visible:ring-2 focus-visible:ring-[#8cac78]"
          : "border-0 bg-transparent px-0",
        className,
      )}
      {...props}
    />
  );
}
