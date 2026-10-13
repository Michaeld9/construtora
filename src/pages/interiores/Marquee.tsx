import { Sparkle } from "@phosphor-icons/react";

const words = [
  "Marcenaria sob medida",
  "Iluminação",
  "Curadoria de mobiliário",
  "Revestimentos",
  "Cortinas e tecidos",
  "Automação residencial",
  "Paisagismo interno",
];

/** Faixa contínua com as disciplinas atendidas. Única marquee do site. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="whitespace-nowrap px-8 text-4xl font-medium tracking-tight text-ink md:text-6xl">{w}</span>
          <Sparkle size={28} weight="fill" className="text-accent" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Disciplinas atendidas" className="overflow-hidden border-y border-line py-10 md:py-14">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
