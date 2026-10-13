import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "../../components/Button";
import { Img } from "../../components/Img";
import { WordReveal } from "../../components/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = (delay: number) => ({
  initial: { clipPath: "inset(0% 0% 100% 0% round 18px)", scale: 1.1 },
  animate: { clipPath: "inset(0% 0% 0% 0% round 18px)", scale: 1 },
  transition: { duration: 1.4, delay, ease },
});

/** Colagem em três camadas que se movem em velocidades diferentes na rolagem. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "-48%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-12 px-4 pb-16 pt-24 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-8"
    >
      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 lg:col-span-6">
        <WordReveal
          as="h1"
          onMount
          delay={1}
          text="Interiores com rigor de obra."
          accentWords={[2, 3, 4]}
          className="max-w-[13ch] text-[clamp(2.6rem,5.4vw,5rem)] font-semibold leading-[1] tracking-[-0.045em]"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.45, ease }}
          className="mt-7 max-w-[42ch] text-lg leading-relaxed text-muted md:text-xl"
        >
          Projeto, marcenaria e execução pela mesma equipe que constrói, do apartamento na planta ao imóvel em que você já mora.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button href="#contato">Solicitar projeto</Button>
          <Button href="#projetos" variant="secondary">
            Ver projetos
          </Button>
        </motion.div>
      </motion.div>

      <div className="relative h-[64vh] min-h-[420px] lg:col-span-6 lg:h-[calc(100dvh-9rem)]">
        <motion.div style={{ y: yBack }} className="absolute right-0 top-0 h-[82%] w-[72%]">
          <motion.div {...reveal(0.75)} className="h-full overflow-hidden rounded-[18px]">
            <Img photo="livingMirror" priority width={1200} sizes="(min-width: 1024px) 34vw, 72vw" alt="Sala minimalista com espelho redondo, aparador e plantas" className="h-full w-full" />
          </motion.div>
        </motion.div>
        <motion.div style={{ y: yMid }} className="absolute bottom-0 left-0 h-[48%] w-[46%]">
          <motion.div {...reveal(0.95)} className="h-full overflow-hidden rounded-[18px] shadow-[var(--shadow)] ring-8 ring-bg">
            <Img photo="livingWood" width={800} sizes="(min-width: 1024px) 22vw, 46vw" alt="Ambiente com painéis de madeira, poltrona e luminária de piso" className="h-full w-full" />
          </motion.div>
        </motion.div>
        <motion.div style={{ y: yFront }} className="absolute bottom-[14%] right-[6%] hidden h-[26%] w-[26%] sm:block">
          <motion.div {...reveal(1.15)} className="h-full overflow-hidden rounded-[18px] shadow-[var(--shadow)] ring-8 ring-bg">
            <Img photo="chairYellow" width={500} sizes="14vw" alt="Poltrona amarela ao lado de uma parede clara" className="h-full w-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
