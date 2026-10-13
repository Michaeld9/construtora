import { AnimatePresence, motion, useInView, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Img } from "../../components/Img";
import { WordReveal } from "../../components/Reveal";
import type { PhotoKey } from "../../lib/images";

const steps: { title: string; text: string; photo: PhotoKey; alt: string }[] = [
  {
    title: "Terreno e viabilidade",
    text: "Estudamos solo, vizinhança e legislação antes de desenhar qualquer planta. Só lançamos o que temos certeza de entregar.",
    photo: "siteAerial",
    alt: "Vista aérea de um canteiro de obras com equipe trabalhando",
  },
  {
    title: "Projeto integrado",
    text: "Arquitetura, estrutura e instalações são compatibilizadas em BIM antes da obra começar. Menos improviso no canteiro, menos surpresa para você.",
    photo: "sitePlans",
    alt: "Arquiteto revisando plantas impressas sobre a mesa",
  },
  {
    title: "Obra com equipe própria",
    text: "Engenheiros e mestres de obra Basalto em todos os canteiros. Você recebe um relatório mensal com fotos e o andamento de cada etapa.",
    photo: "siteRebar",
    alt: "Operários montando armações de aço em uma laje",
  },
  {
    title: "Entrega e pós-obra",
    text: "Vistoria guiada, manual do proprietário e assistência técnica por cinco anos. A obra termina, o atendimento continua.",
    photo: "livingModern",
    alt: "Sala de estar de apartamento recém-entregue, clara e mobiliada",
  },
];

function Step({ step, index, onActive }: { step: (typeof steps)[number]; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex flex-col justify-center py-10 lg:min-h-[70vh] lg:py-0">
      <div className="mb-6 aspect-[4/3] overflow-hidden rounded-[18px] lg:hidden">
        <Img photo={step.photo} alt={step.alt} width={900} sizes="100vw" className="h-full w-full" />
      </div>
      <motion.div
        animate={{ opacity: inView ? 1 : 0.32 }}
        transition={{ duration: 0.5 }}
        className="max-lg:!opacity-100"
      >
        <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{step.title}</h3>
        <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted">{step.text}</p>
      </motion.div>
    </div>
  );
}

export function Method() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });

  return (
    <section id="como-construimos" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <WordReveal
        text="Como construímos cada edifício."
        className="max-w-[16ch] text-4xl font-semibold leading-[1.02] tracking-tighter md:text-6xl"
      />

      <div className="mt-12 grid gap-10 lg:mt-4 lg:grid-cols-12">
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-24 h-[calc(100dvh-8rem)] overflow-hidden rounded-[18px] bg-surface">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Img photo={steps[active].photo} alt={steps[active].alt} width={1200} sizes="45vw" className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div ref={listRef} className="relative lg:col-span-5 lg:col-start-8">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-line lg:block" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-accent lg:block"
          />
          <div className="lg:pl-10">
            {steps.map((s, i) => (
              <Step key={s.title} step={s} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
