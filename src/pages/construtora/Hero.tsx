import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "../../components/Button";
import { Img } from "../../components/Img";
import { WordReveal } from "../../components/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-10 px-4 pb-12 pt-24 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-8"
    >
      <motion.div style={{ y: textY, opacity: textOpacity }} className="lg:col-span-7">
        <WordReveal
          as="h1"
          onMount
          delay={1}
          text="Endereços construídos para durar."
          accentWords={[2, 3]}
          className="max-w-[15ch] text-[clamp(2.6rem,5vw,4.75rem)] font-semibold leading-[1] tracking-[-0.045em]"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.45, ease }}
          className="mt-7 max-w-[44ch] text-lg leading-relaxed text-muted md:text-xl"
        >
          Incorporamos e construímos edifícios residenciais em São Paulo há 31 anos, com engenharia própria do terreno às chaves.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button href="#empreendimentos">Ver empreendimentos</Button>
          <Button href="#contato" variant="secondary">
            Agendar visita
          </Button>
        </motion.div>
      </motion.div>

      <div className="relative h-[58vh] lg:col-span-5 lg:h-[calc(100dvh-8rem)]">
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0% round 18px)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 18px)" }}
          transition={{ duration: 1.5, delay: 0.75, ease }}
          className="absolute inset-0 overflow-hidden rounded-[18px]"
        >
          <motion.div
            style={{ y: imgY }}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 2.2, delay: 0.75, ease }}
            className="absolute inset-x-0 -top-[8%] h-[116%]"
          >
            <Img
              photo="heroTower"
              priority
              width={1400}
              sizes="(min-width: 1024px) 42vw, 100vw"
              alt="Fachada de edifício residencial contemporâneo com varandas, visto de baixo contra o céu"
              className="h-full w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
