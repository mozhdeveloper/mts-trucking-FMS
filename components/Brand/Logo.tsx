import Image from "next/image";

interface LogoProps {
  /** size in pixels for the icon tile */
  size?: number;
  /** show wordmark next to the icon */
  showWordmark?: boolean;
  /** force light text (use on dark backgrounds) */
  light?: boolean;
  /** wordmark visual scale */
  wordmarkSize?: "sm" | "md" | "lg";
  className?: string;
}

const WORDMARK_TEXT: Record<NonNullable<LogoProps["wordmarkSize"]>, string> = {
  sm: "text-base",
  md: "text-2xl",
  lg: "text-3xl",
};
const TAGLINE_TEXT: Record<NonNullable<LogoProps["wordmarkSize"]>, string> = {
  sm: "text-[7px] tracking-[0.25em] mt-0.5",
  md: "text-[9px] tracking-[0.3em] mt-1",
  lg: "text-[11px] tracking-[0.35em] mt-1",
};

/**
 * MTS Trucking Incorporated brand logo.
 * Uses /public/logo.jpg (chevron + MTS wordmark).
 * Sharp corners and industrial styling per brand guidelines.
 */
export function Logo({
  size = 56,
  showWordmark = true,
  light = false,
  wordmarkSize = "md",
  className = "",
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        className="relative shrink-0 overflow-hidden bg-white ring-1 ring-brand-border"
        style={{ width: size, height: size, borderRadius: 2 }}
      >
        <Image
          src="/logo.jpg"
          alt="MTS Trucking Incorporated"
          fill
          sizes={`${size}px`}
          className="object-contain p-1"
          priority
        />
      </div>
      {showWordmark && (
        <div className="text-left leading-none">
          <div
            className={`font-display ${WORDMARK_TEXT[wordmarkSize]} font-black tracking-tight uppercase ${
              light ? "text-white" : "text-brand-black"
            }`}
          >
            MTS <span className="text-brand-red">TRUCKING</span>
          </div>
          <div
            className={`${TAGLINE_TEXT[wordmarkSize]} font-bold uppercase ${
              light ? "text-brand-steel" : "text-brand-charcoal"
            }`}
          >
            Incorporated
          </div>
        </div>
      )}
    </div>
  );
}

export default Logo;
