import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  href?: string | null;
  className?: string;
}

const sizes = {
  sm: { w: 280, h: 56 },
  md: { w: 280, h: 56 },
  lg: { w: 440, h: 88 },
  xl: { w: 620, h: 124 },
};

export default function Logo({ size = "md", href = "/", className = "" }: LogoProps) {
  const { w, h } = sizes[size];
  const img = (
    <Image
      src="/images/premium-tarbut-logo.png"
      alt="פרימיום תרבות — הבית לאירועי תרבות ובידור נבחרים"
      width={w}
      height={h}
      priority={size === "xl" || size === "lg"}
      className={`h-auto w-auto select-none ${className}`}
      style={{ maxHeight: h }}
    />
  );
  if (!href) return img;
  return (
    <Link href={href} aria-label="פרימיום תרבות — דף הבית" className="inline-flex">
      {img}
    </Link>
  );
}
