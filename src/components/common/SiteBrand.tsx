import Link from "next/link";

export function SiteBrand() {
  return (
    <Link
      href="/"
      aria-label="FranToken, ir al inicio"
      className="inline-flex items-center gap-2 whitespace-nowrap text-[23px] leading-none font-black tracking-[-0.075em] text-[#f3f2e9]"
    >
      <span
        aria-hidden="true"
        className="grid h-[29px] w-[29px] rotate-[-14deg] grid-cols-2 gap-[3px]"
      >
        <span className="row-span-2 rounded-l-full bg-[#d5f36a]" />
        <span className="rounded-[2px] bg-[#d5f36a]" />
        <span className="rounded-br-[9px] bg-[#d5f36a]" />
      </span>
      <span>
        fran<span className="font-normal">token</span>
        <span className="text-[#d5f36a]">.</span>
      </span>
    </Link>
  );
}
