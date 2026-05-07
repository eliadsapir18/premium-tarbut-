import SectionHeading from "./SectionHeading";

interface Props {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; body: string[] }[];
}

export default function PolicyPage({ eyebrow, title, intro, sections }: Props) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-gold-400/15">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-50" />
        <div className="container-prem py-14">
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={intro} />
        </div>
      </section>

      <section className="container-prem py-14">
        <div className="card-prem prose prose-invert mx-auto max-w-3xl space-y-8 p-7 sm:p-10">
          {sections.map((s) => (
            <article key={s.title}>
              <h2 className="font-display text-2xl font-semibold text-gold-100">
                {s.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-gray-200">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
