import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CornersOut, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Img } from "../../components/Img";
import { WordReveal } from "../../components/Reveal";
import type { PhotoKey } from "../../lib/images";

type Category = "Salas" | "Cozinhas" | "Quartos" | "Banheiros";
type Item = {
  id: string;
  photo: PhotoKey;
  category: Category;
  title: string;
  place: string;
  area: string;
  text: string;
  shape: "tall" | "wide" | "regular";
};

const items: Item[] = [
  { id: "p1", photo: "livingBoho", category: "Salas", title: "Sala com tons de areia", place: "Vila Madalena", area: "112 m²", text: "Paleta neutra, fibras naturais e iluminação indireta para uma família que recebe muito em casa.", shape: "tall" },
  { id: "p2", photo: "kitchenWhite", category: "Cozinhas", title: "Cozinha branca integrada", place: "Perdizes", area: "96 m²", text: "Parede removida para integrar cozinha e jantar, com armários até o teto e bancada em quartzo.", shape: "regular" },
  { id: "p3", photo: "livingColor", category: "Salas", title: "Living colorido", place: "Pinheiros", area: "84 m²", text: "Peças de design brasileiro e cores fortes em uma base de marcenaria clara.", shape: "wide" },
  { id: "p4", photo: "bathroom", category: "Banheiros", title: "Banho em pedra e vidro", place: "Granja Viana", area: "286 m²", text: "Banheira livre, revestimento contínuo e nicho iluminado no box.", shape: "tall" },
  { id: "p5", photo: "bedroomGrey", category: "Quartos", title: "Suíte em tons de grafite", place: "Itaim Bibi", area: "138 m²", text: "Cabeceira estofada até o teto e cortinas em linho para bloquear a luz da manhã.", shape: "regular" },
  { id: "p6", photo: "kitchenBright", category: "Cozinhas", title: "Cozinha de apartamento compacto", place: "Vila Mariana", area: "58 m²", text: "Marcenaria planejada para caber forno, lava-louças e despensa em menos de seis metros.", shape: "regular" },
  { id: "p7", photo: "bedroomWhite", category: "Quartos", title: "Quarto de hóspedes claro", place: "Perdizes", area: "112 m²", text: "Ambiente que funciona como escritório durante a semana, com cama embutida.", shape: "regular" },
  { id: "p8", photo: "livingBlue", category: "Salas", title: "Sala com estante azul", place: "Moema", area: "102 m²", text: "Estante de piso a teto para a coleção de livros, com escada corrediça.", shape: "regular" },
  { id: "p9", photo: "bathroomLight", category: "Banheiros", title: "Lavabo em tons claros", place: "Pinheiros", area: "71 m²", text: "Cuba esculpida e espelho com iluminação embutida.", shape: "regular" },
  { id: "p10", photo: "livingPlants2", category: "Salas", title: "Sala com jardim interno", place: "Alto de Pinheiros", area: "164 m²", text: "Vasos de grande porte e irrigação automática para trazer o verde para dentro.", shape: "wide" },
];

const filters: ("Todos" | Category)[] = ["Todos", "Salas", "Cozinhas", "Quartos", "Banheiros"];

const shapeCls: Record<Item["shape"], string> = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  regular: "",
};

function Lightbox({ item, onClose, onStep }: { item: Item; onClose: () => void; onStep: (dir: 1 | -1) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const handlers = useRef({ onClose, onStep });
  handlers.current = { onClose, onStep };

  // Executa uma vez por abertura: foco inicial, trava de rolagem e atalhos de teclado.
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handlers.current.onClose();
      if (e.key === "ArrowRight") handlers.current.onStep(1);
      if (e.key === "ArrowLeft") handlers.current.onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prevFocus?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-titulo"
    >
      <motion.div
        className="absolute inset-0 bg-scrim backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div className="relative grid max-h-full w-full max-w-6xl overflow-hidden rounded-[18px] bg-bg md:grid-cols-[1.5fr_1fr]">
        <motion.div layoutId={`proj-${item.id}`} className="relative h-[42vh] overflow-hidden md:h-[78vh]">
          <Img photo={item.photo} alt={item.title} width={1600} sizes="60vw" className="h-full w-full" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          exit={{ opacity: 0 }}
          className="flex flex-col p-6 md:p-10"
        >
          <span className="text-sm text-accent">{item.category}</span>
          <h3 id="lightbox-titulo" className="mt-2 text-3xl font-semibold tracking-tight">
            {item.title}
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{item.text}</p>
          <dl className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <dt className="text-sm text-muted">Bairro</dt>
              <dd className="mt-1 font-medium">{item.place}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Área do imóvel</dt>
              <dd className="mt-1 font-medium">{item.area}</dd>
            </div>
          </dl>
          <div className="mt-auto flex items-center gap-2 pt-8">
            <button onClick={() => onStep(-1)} aria-label="Projeto anterior" className="grid size-11 place-items-center rounded-full border border-line hover:border-ink/40">
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => onStep(1)} aria-label="Próximo projeto" className="grid size-11 place-items-center rounded-full border border-line hover:border-ink/40">
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-bg text-ink shadow-[var(--shadow)]"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const [openId, setOpenId] = useState<string | null>(null);
  const visible = filter === "Todos" ? items : items.filter((i) => i.category === filter);
  const openItem = items.find((i) => i.id === openId) ?? null;

  const step = (dir: 1 | -1) => {
    const idx = visible.findIndex((i) => i.id === openId);
    if (idx === -1) return;
    setOpenId(visible[(idx + dir + visible.length) % visible.length].id);
  };

  return (
    <section id="projetos" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <WordReveal text="Projetos recentes" className="text-4xl font-semibold tracking-tighter md:text-6xl" />

      <LayoutGroup>
        <div role="tablist" aria-label="Filtrar por ambiente" className="no-scrollbar mt-10 flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`relative h-11 shrink-0 rounded-full border px-5 text-[15px] font-medium transition-colors ${
                filter === f ? "border-transparent text-accent-ink" : "border-line text-muted hover:text-ink"
              }`}
            >
              {filter === f && (
                <motion.span layoutId="filtro-ativo" className="absolute inset-0 -z-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.ul layout className="mt-10 grid auto-rows-[240px] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[260px]">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={shapeCls[item.shape]}
              >
                <button
                  onClick={() => setOpenId(item.id)}
                  className="group relative block h-full w-full overflow-hidden rounded-[18px] text-left"
                  aria-label={`Ver projeto: ${item.title}, ${item.place}`}
                >
                  <motion.div layoutId={`proj-${item.id}`} className="absolute inset-0 overflow-hidden">
                    <Img
                      photo={item.photo}
                      alt={item.title}
                      width={900}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                    />
                  </motion.div>
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-4 bg-gradient-to-t from-[rgb(8_12_10/0.75)] to-transparent p-5 pt-16 text-[#eef2ed] opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                    <span>
                      <span className="block text-lg font-medium">{item.title}</span>
                      <span className="text-sm text-[#eef2ed]/80">{item.place}</span>
                    </span>
                    <CornersOut size={20} />
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <div className="mt-10 rounded-[18px] border border-dashed border-line p-12 text-center">
            <p className="text-lg text-ink">Ainda não publicamos projetos nesta categoria.</p>
            <button onClick={() => setFilter("Todos")} className="mt-3 font-medium text-accent underline-offset-4 hover:underline">
              Ver todos os projetos
            </button>
          </div>
        )}

        <AnimatePresence>
          {openItem && <Lightbox key="lb" item={openItem} onClose={() => setOpenId(null)} onStep={step} />}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
}
