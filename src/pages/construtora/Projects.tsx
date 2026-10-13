import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLayoutEffect, useRef, useState } from "react";
import { Img } from "../../components/Img";
import { useMediaQuery, prefillContact } from "../../lib/hooks";
import type { PhotoKey } from "../../lib/images";

export const projects: {
  name: string;
  place: string;
  status: "Lançamento" | "Em obras" | "Pronto para morar";
  spec: string;
  photo: PhotoKey;
  alt: string;
}[] = [
  {
    name: "Edifício Jacarandá",
    place: "Vila Mariana",
    status: "Lançamento",
    spec: "2 e 3 suítes, de 74 a 128 m²",
    photo: "facadeBlue",
    alt: "Fachada de edifício residencial com varandas e céu azul",
  },
  {
    name: "Residencial Aroeira",
    place: "Pinheiros",
    status: "Em obras",
    spec: "Studios e 2 dormitórios, de 32 a 71 m²",
    photo: "brickSunset",
    alt: "Edifício de tijolos aparentes iluminado pelo pôr do sol",
  },
  {
    name: "Torre Ipê Corporate",
    place: "Itaim Bibi",
    status: "Em obras",
    spec: "Lajes corporativas de 412 m²",
    photo: "towerLookUp",
    alt: "Torres de vidro vistas de baixo para cima",
  },
  {
    name: "Casas Quaresmeira",
    place: "Granja Viana, Cotia",
    status: "Pronto para morar",
    spec: "Casas de 4 suítes com 286 m²",
    photo: "houseDusk",
    alt: "Casa contemporânea iluminada ao entardecer",
  },
  {
    name: "Edifício Paineira",
    place: "Perdizes",
    status: "Pronto para morar",
    spec: "3 dormitórios, de 96 a 140 m²",
    photo: "whiteBuilding",
    alt: "Edifício branco de linhas curvas contra o céu",
  },
];

const statusStyle: Record<(typeof projects)[number]["status"], string> = {
  Lançamento: "bg-accent text-accent-ink border-transparent",
  "Em obras": "border-line text-ink",
  "Pronto para morar": "bg-accent-soft text-accent border-transparent",
};

function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  return (
    <motion.button
      onClick={() => prefillContact(p.name)}
      aria-label={`${p.name}, ${p.place}. ${p.status}. Agendar visita`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group block w-[78vw] shrink-0 snap-start text-left sm:w-[46vw] md:w-[clamp(320px,30vw,440px)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px]">
        <Img
          photo={p.photo}
          alt={p.alt}
          width={900}
          sizes="(min-width: 768px) 30vw, 78vw"
          className="h-full w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{p.name}</h3>
          <p className="mt-1 text-[15px] text-muted">{p.place}</p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className={`rounded-full border px-3 py-1 text-[13px] font-medium ${statusStyle[p.status]}`}>{p.status}</span>
        <span className="text-[14px] text-muted">{p.spec}</span>
      </div>
    </motion.button>
  );
}

function Intro() {
  return (
    <div className="w-[min(600px,84vw)] shrink-0 md:pr-12">
      <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-6xl xl:text-7xl">Empreendimentos</h2>
      <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-muted">
        Cinco endereços em fases diferentes, do lançamento ao pronto para morar. Escolha um para agendar sua visita.
      </p>
    </div>
  );
}

/**
 * Desktop: a seção fica fixa e a rolagem vertical move a faixa de cards na horizontal.
 * Mobile ou movimento reduzido: rolagem horizontal nativa com snap.
 */
export function Projects() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduce = useReducedMotion();
  const pan = isDesktop && !reduce;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const dist = useMotionValue(0);

  useLayoutEffect(() => {
    if (!pan || !trackRef.current) return;
    const el = trackRef.current;
    const measure = () => {
      const d = Math.max(0, el.scrollWidth - window.innerWidth);
      dist.set(d);
      setDistance(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pan, dist]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * dist.get());

  if (!pan) {
    return (
      <section id="empreendimentos" className="py-20">
        <div className="px-4 md:px-8">
          <Intro />
        </div>
        <div
          role="region"
          aria-label="Lista de empreendimentos"
          tabIndex={0}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-4 px-4 pb-4 md:px-8"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="empreendimentos"
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100dvh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-end gap-8 pl-8 pr-[8vw] will-change-transform">
          <Intro />
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} index={i} />
          ))}
        </motion.div>
        <div className="mx-8 mt-12 h-px">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-ink/60" />
        </div>
      </div>
    </section>
  );
}
