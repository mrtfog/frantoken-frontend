import clsx from "clsx";
import type { ComponentProps } from "react";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "animate-pulse rounded-lg bg-[#173d34]/12 motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}
