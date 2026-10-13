import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Img } from "../../components/Img";
import { FadeUp, WordReveal } from "../../components/Reveal";
import { navigate } from "../../lib/router";
import type { PhotoKey } from "../../lib/images";

const rooms: { photo: PhotoKey; label: string; alt: string }[] = [
  { photo: "livingWarm", label: "Sala integrada, Edifício Paineira", alt: "Sala de estar com sofá claro, tapete e iluminação indireta" },
  { photo: "diningGreen", label: "Jantar, Casas Quaresmeira", alt: "Sala de jantar com cadeiras verdes e mesa de madeira" },
  { photo: "bedroom", label: "Suíte principal, Residencial Aroeira", alt: "Quarto com cama de casal, roupa de cama clara e luminárias" },
  { photo: "kitchenIsland", label: "Cozinha com ilha, Edifício Paineira", alt: "Cozinha branca com ilha central e banquetas" },
];

/** Ponte para a guia de Interiores: faixas de imagem que se expandem no hover ou foco. */
export function InteriorsBridge() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="ponte-interiores" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Basalto Interiores</p>
          <WordReveal
            text="Seu apartamento entregue pronto para morar."
            className="mt-5 max-w-[15ch] text-4xl font-semibold leading-[1.02] tracking-tighter md:text-5xl xl:text-6xl"
          />
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-muted">
              Projeto de interiores, marcenaria e instalação executados junto com a obra, no mesmo cronograma e com a mesma garantia.
            </p>
            <div className="mt-10">
              <Button
                href="/interiores"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("interiores");
                }}
              >
                Conhecer Interiores
              </Button>
            </div>
          </FadeUp>
        </div>

        <FadeUp className="lg:col-span-7" delay={0.1}>
          <div className="flex h-[420px] gap-3 md:h-[560px]">
            {rooms.map((r, i) => (
              <button
                key={r.photo}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={r.label}
                aria-pressed={active === i}
                className="relative min-w-0 overflow-hidden rounded-[18px] transition-[flex-grow] duration-700 ease-out-expo"
                style={{ flexGrow: active === i ? 5 : 1, flexBasis: 0 }}
              >
                <Img
                  photo={r.photo}
                  alt={r.alt}
                  width={1000}
                  sizes="(min-width: 1024px) 40vw, 70vw"
                  className={`absolute inset-0 h-full w-full transition-[filter] duration-700 ${active === i ? "" : "grayscale-[60%]"}`}
                />
              </button>
            ))}
          </div>
          <div className="mt-5 h-6 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={active}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15px] text-muted"
              >
                {rooms[active].label}
              </motion.p>
            </AnimatePresence>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
