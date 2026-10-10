import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "dark"
  | "chip"
  | "chipActive"
  | "pill"
  | "icon";

const base =
  "inline-flex items-center justify-center font-extrabold transition-[transform,background-color,color] duration-[250ms] hover:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7dbb4b] motion-reduce:transform-none motion-reduce:transition-none";
const variants: Record<ButtonVariant, string> = {
  primary:
    "min-h-[54px] gap-5 rounded-[3px] bg-[#d5f36a] px-[21px] text-[13px] text-[#09262a] hover:bg-[#e7ff93]",
  dark: "min-h-[54px] gap-5 rounded-[3px] bg-[#09262a] px-[21px] text-[13px] text-[#f3f2e9] hover:bg-[#1d4446]",
  chip: "min-h-[42px] shrink-0 rounded-full border border-[#173d34]/20 bg-transparent px-4 text-[12px] text-[#3d6152] hover:border-[#11382e] hover:bg-[#e4e9d9]",
  chipActive:
    "min-h-[42px] shrink-0 rounded-full border border-[#11382e] bg-[#11382e] px-4 text-[12px] text-[#f2f1e8]",
  pill: "rounded-full bg-[#d5f36a] px-5 py-3 text-[12px] text-[#11382e]",
  icon: "h-11 w-11 rounded-full border border-[#f3f2e9]/25 bg-transparent p-0 text-[#f3f2e9]",
};

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant };
type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(base, variants[variant], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={clsx(base, variants[variant], className)} {...props} />
  );
}
