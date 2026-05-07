interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: Props) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-right";
  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
          <span className="inline-block h-px w-6 bg-gold-400/60" />
          {eyebrow}
          <span className="inline-block h-px w-6 bg-gold-400/60" />
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-base leading-7 text-gray-300">{subtitle}</p>
      )}
      <div className="divider-gold mt-2" />
    </div>
  );
}
