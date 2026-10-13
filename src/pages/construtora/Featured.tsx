import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "../../components/Button";
import { Img } from "../../components/Img";
import { FadeUp } from "../../components/Reveal";
import { prefillContact } from "../../lib/hooks";

const specs = [
  { label: "Plantas", value: "2 e 3 suítes" },
  { label: "Área privativa", value: "74 a 128 m²" },
  { label: "Lazer", value: "Rooftop com piscina aquecida" },
  { label: "Entrega prevista", value: "Dezembro de 2028" },
];

/** Lançamento em destaque: a imagem se expande até ocupar a largura total conforme a rolagem. */
export function Featured() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["inset(0% 5% 0% 5% round 18px)", "inset(0% 0% 0% 0% round 0px)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <section ref={ref} aria-labelledby="destaque-titulo" className="relative py-10">
      <motion.div style={reduce ? undefined : { clipPath }} className="relative min-h-[110vh] overflow-hidden">
        <motion.div style={reduce ? undefined : { scale }} className="absolute inset-0">
          <Img
            photo="facadeBlue"
            width={1800}
            alt="Edifício Jacarandá: fachada com varandas amplas e céu aberto"
            className="h-full w-full"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(8_12_10/0.55)] via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[110vh] max-w-[1400px] items-end px-4 pb-10 md:px-8 md:pb-16">
          <FadeUp className="w-full max-w-[560px] rounded-[18px] bg-bg/92 p-7 shadow-[var(--shadow)] backdrop-blur-xl md:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Lançamento</p>
            <h2 id="destaque-titulo" className="mt-4 text-4xl font-semibold tracking-tighter md:text-5xl">
              Edifício Jacarandá
            </h2>
            <p className="mt-4 max-w-[42ch] leading-relaxed text-muted">
              Vinte e dois andares a quatro quadras do metrô Santa Cruz, com plantas que integram varanda e sala.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {specs.map((s) => (
                <div key={s.label} className="bg-bg p-4">
                  <dt className="text-[13px] text-muted">{s.label}</dt>
                  <dd className="mt-1 text-[15px] font-medium leading-snug text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <Button onClick={() => prefillContact("Edifício Jacarandá")}>Receber tabela</Button>
            </div>
          </FadeUp>
        </div>
      </motion.div>
    </section>
  );
}
