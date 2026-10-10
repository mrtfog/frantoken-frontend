import clsx from "clsx";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & { variant?: "default" | "bare" };

export function Input({
  className,
  variant = "default",
  ...props
}: InputProps) {
  return (
    <input
      className={clsx(
        "min-h-11 min-w-0 text-[13px] text-[#11382e] outline-none placeholder:text-[#799186]",
        variant === "default"
          ? "rounded-md border border-[#173d34]/25 bg-[#faf9f3] px-4 focus-visible:border-[#173d34] focus-visible:ring-2 focus-visible:ring-[#8cac78]"
          : "border-0 bg-transparent px-0",
        className,
      )}
      {...props}
    />
  );
}
