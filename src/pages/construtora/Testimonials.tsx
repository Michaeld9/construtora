import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Quotes } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const items = [
  {
    quote: "Recebemos as chaves vinte dias antes do prazo, e o pós-obra respondeu em menos de uma semana.",
    name: "Renata Albuquerque",
    role: "Proprietária no Edifício Paineira",
  },
  {
    quote: "Acompanhei a obra inteira pelo portal, com fotos todo mês. Para quem compra na planta, faz diferença.",
    name: "Thiago Moreira Lins",
    role: "Proprietário no Residencial Aroeira",
  },
  {
    quote: "Contratamos casa e interiores com a mesma equipe. Mudamos com tudo instalado, até as cortinas.",
    name: "Helena e Caio Prado",
    role: "Moradores das Casas Quaresmeira",
  },
  {
    quote: "A valorização veio, mas o que me fez investir de novo foi a seriedade na entrega.",
    name: "Marcos Tavares Uehara",
    role: "Investidor com duas unidades no Edifício Paineira",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), 7000);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  return (
    <section
      aria-labelledby="depoimentos-titulo"
      className="bg-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-24 md:px-8 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="depoimentos-titulo" className="text-4xl font-semibold tracking-tighter md:text-5xl">
            Quem já mora
          </h2>
          <div role="tablist" aria-label="Depoimentos" className="mt-10 flex flex-col">
            {items.map((it, i) => (
              <button
                key={it.name}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className="group relative py-4 text-left"
              >
                <span className={`block text-lg font-medium transition-colors ${active === i ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                  {it.name}
                </span>
                <span className="absolute bottom-0 left-0 h-px w-full bg-line" />
                {active === i && (
                  <motion.span
                    key={`bar-${active}-${paused}`}
                    className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
                    initial={{ scaleX: reduce || paused ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: reduce || paused ? 0 : 7, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[320px] lg:col-span-7 lg:col-start-6" role="tabpanel" aria-live="polite">
          <Quotes size={56} weight="fill" className="text-accent" />
          <AnimatePresence mode="wait">
            <motion.figure
              key={active}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <blockquote className="max-w-[38ch] text-2xl font-medium leading-[1.25] tracking-tight md:text-3xl lg:text-[2.1rem]">
                “{items[active].quote}”
              </blockquote>
              <figcaption className="mt-8">
                <span className="block font-medium text-ink">{items[active].name}</span>
                <span className="text-muted">{items[active].role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
