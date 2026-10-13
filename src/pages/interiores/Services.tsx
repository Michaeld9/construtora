import { AnimatePresence, motion } from "motion/react";
import { Armchair, Hammer, Lightbulb, PencilRuler, Ruler, Plus } from "@phosphor-icons/react";
import { useState, type ReactNode } from "react";
import { Img } from "../../components/Img";
import { WordReveal } from "../../components/Reveal";
import type { PhotoKey } from "../../lib/images";

const ease = [0.16, 1, 0.3, 1] as const;

const services: { title: string; text: string; icon: ReactNode; photo: PhotoKey; alt: string }[] = [
  {
    title: "Projeto completo",
    text: "Layout, marcenaria, iluminação, revestimentos e mobiliário detalhados em projeto executivo, com imagens realistas de cada ambiente.",
    icon: <PencilRuler size={24} />,
    photo: "livingGrey",
    alt: "Sala de estar em tons de cinza com sofá amplo e estante",
  },
  {
    title: "Marcenaria sob medida",
    text: "Cozinhas, armários e painéis fabricados por marcenarias parceiras, com medição e instalação acompanhadas pela nossa equipe.",
    icon: <Hammer size={24} />,
    photo: "kitchenGrey",
    alt: "Cozinha planejada em marcenaria cinza com bancada clara",
  },
  {
    title: "Iluminação e automação",
    text: "Projeto luminotécnico com cenas, dimerização e integração com assistentes de voz, pensado junto com o forro e a elétrica.",
    icon: <Lightbulb size={24} />,
    photo: "stairsGlass",
    alt: "Escada com guarda-corpo de vidro e iluminação natural",
  },
  {
    title: "Curadoria e styling",
    text: "Seleção de móveis, arte, tapetes e objetos. Cuidamos da compra, da entrega e da montagem.",
    icon: <Armchair size={24} />,
    photo: "sofaOrange",
    alt: "Sofá laranja com almofadas e manta",
  },
  {
    title: "Personalização na planta",
    text: "Para quem comprou uma unidade Basalto: mudanças de layout e acabamento feitas durante a obra, antes das chaves.",
    icon: <Ruler size={24} />,
    photo: "minimalRoom",
    alt: "Ambiente claro e minimalista com móvel baixo e planta",
  },
];

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="servicos" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <WordReveal
        text="Tudo o que a casa precisa, sob um único contrato."
        className="max-w-[18ch] text-4xl font-semibold leading-[1.02] tracking-tighter md:text-6xl"
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <ul className="lg:col-span-6">
          {services.map((s, i) => {
            const open = active === i;
            return (
              <li key={s.title} className="border-b border-line first:border-t">
                <button
                  onClick={() => setActive(i)}
                  onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(i)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-5 py-6 text-left"
                >
                  <span className={`grid size-12 shrink-0 place-items-center rounded-full transition-colors duration-500 ${open ? "bg-accent text-accent-ink" : "bg-surface text-muted"}`}>
                    {s.icon}
                  </span>
                  <span className={`flex-1 text-2xl font-medium tracking-tight transition-colors md:text-3xl ${open ? "text-ink" : "text-muted"}`}>
                    {s.title}
                  </span>
                  <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4, ease }} className="text-muted">
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[48ch] pb-7 pl-[68px] text-lg leading-relaxed text-muted">{s.text}</p>
                      <div className="mb-7 aspect-[4/3] overflow-hidden rounded-[18px] lg:hidden">
                        <Img photo={s.photo} alt={s.alt} width={900} sizes="100vw" className="h-full w-full" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
          <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-[18px] bg-surface">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 0.9, ease }}
                className="absolute inset-0"
              >
                <motion.div initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease }} className="h-full w-full">
                  <Img photo={services[active].photo} alt={services[active].alt} width={1000} sizes="40vw" className="h-full w-full" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
