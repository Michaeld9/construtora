import { AnimatePresence, motion } from "motion/react";
import { Check } from "@phosphor-icons/react";
import { useState } from "react";
import { Img } from "../../components/Img";
import { FadeUp, WordReveal } from "../../components/Reveal";

const options = [
  { id: "padrao", label: "Planta padrão", photo: "minimalRoom" as const, alt: "Ambiente com acabamento padrão de entrega, claro e quase vazio" },
  { id: "personalizado", label: "Personalizado", photo: "livingPlants" as const, alt: "Mesmo tipo de ambiente com marcenaria, mobiliário e plantas" },
];

const included = [
  "Troca de revestimentos e metais antes da instalação",
  "Cozinha integrada ou dormitório reversível",
  "Pontos elétricos e de iluminação no lugar certo",
  "Marcenaria entregue junto com as chaves",
];

export function Personalize() {
  const [mode, setMode] = useState(1);

  return (
    <section aria-labelledby="personalize-titulo" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeUp className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-surface lg:aspect-[5/4]">
            <AnimatePresence initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Img photo={options[mode].photo} alt={options[mode].alt} width={1400} sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div role="radiogroup" aria-label="Comparar acabamento" className="mt-5 inline-flex rounded-full border border-line bg-surface p-1">
            {options.map((o, i) => (
              <button
                key={o.id}
                role="radio"
                aria-checked={mode === i}
                onClick={() => setMode(i)}
                className={`relative h-10 rounded-full px-5 text-sm font-medium transition-colors ${mode === i ? "text-accent-ink" : "text-muted hover:text-ink"}`}
              >
                {mode === i && (
                  <motion.span layoutId="modo-planta" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{o.label}</span>
              </button>
            ))}
          </div>
        </FadeUp>

        <div className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Para clientes Basalto</p>
          <WordReveal
            text="Personalize sua unidade antes da entrega."
            className="mt-5 max-w-[14ch] text-4xl font-semibold leading-[1.02] tracking-tighter md:text-5xl"
          />
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
              Comprou na planta? Ajustamos layout, acabamentos e marcenaria enquanto a obra acontece, sem quebra-quebra depois das chaves.
            </p>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {included.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check size={14} weight="bold" />
                  </span>
                  <span className="leading-snug text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
