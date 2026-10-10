import clsx from "clsx";
import type { ComponentProps } from "react";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={clsx(
        "min-h-28 w-full resize-y rounded-md border border-[#173d34]/25 bg-[#faf9f3] px-4 py-3 text-[13px] text-[#11382e] outline-none placeholder:text-[#799186] focus-visible:border-[#173d34] focus-visible:ring-2 focus-visible:ring-[#8cac78]",
        className,
      )}
      {...props}
    />
  );
}
