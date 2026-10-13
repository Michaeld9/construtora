import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, Moon, Sun, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { navigate, type Route } from "../lib/router";
import { useTheme } from "../lib/hooks";
import { Logo } from "./Logo";
import { Button } from "./Button";

export const NAV_LINKS: Record<Route, { id: string; label: string }[]> = {
  construtora: [
    { id: "empreendimentos", label: "Empreendimentos" },
    { id: "como-construimos", label: "Como construímos" },
    { id: "diferenciais", label: "Diferenciais" },
  ],
  interiores: [
    { id: "servicos", label: "Serviços" },
    { id: "projetos", label: "Projetos" },
    { id: "formatos", label: "Formatos" },
  ],
};

export const CTA_LABEL: Record<Route, string> = {
  construtora: "Agendar visita",
  interiores: "Solicitar projeto",
};

const ease = [0.16, 1, 0.3, 1] as const;

function RouteTabs({ route, onSwitch, size = "md" }: { route: Route; onSwitch?: () => void; size?: "md" | "lg" }) {
  const tabs: { id: Route; label: string }[] = [
    { id: "construtora", label: "Construtora" },
    { id: "interiores", label: "Interiores" },
  ];
  return (
    <div
      role="tablist"
      aria-label="Áreas da Basalto"
      className={`relative flex rounded-full border border-line bg-surface/70 p-1 ${size === "lg" ? "w-full" : ""}`}
    >
      {tabs.map((t) => {
        const active = route === t.id;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => {
              onSwitch?.();
              navigate(t.id);
            }}
            className={`relative z-0 rounded-full px-4 font-medium transition-colors duration-300 ${
              size === "lg" ? "h-12 flex-1 text-base" : "h-9 text-sm"
            } ${active ? "text-accent-ink" : "text-muted hover:text-ink"}`}
          >
            {active && (
              <motion.span
                layoutId={`route-pill-${size}`}
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      className="grid size-10 place-items-center overflow-hidden rounded-full border border-line text-ink transition-colors hover:border-ink/40"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.35, ease }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Nav({ route }: { route: Route }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - last.current;
    if (Math.abs(diff) > 6) setHidden(diff > 0 && y > 240);
    setScrolled(y > 24);
    last.current = y;
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [route]);

  const links = NAV_LINKS[route];

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: hidden && !open ? -88 : 0 }}
        transition={{ duration: 0.5, ease }}
        className="fixed inset-x-0 top-0 z-40"
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
          }`}
        >
          <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center gap-6 px-4 md:px-8">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (route === "construtora") window.scrollTo({ top: 0, behavior: "smooth" });
                else navigate("construtora");
              }}
              aria-label="Basalto, página inicial"
            >
              <Logo />
            </a>

            <div className="hidden sm:block">
              <RouteTabs route={route} />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={route}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease }}
                className="ml-auto hidden items-center gap-7 xl:flex"
              >
                {links.map((l) => (
                  <li key={l.id}>
                    <a href={`#${l.id}`} className="group relative whitespace-nowrap text-[15px] text-muted transition-colors hover:text-ink">
                      {l.label}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <div className="ml-auto flex items-center gap-2 xl:ml-0">
              <ThemeToggle />
              <div className="hidden md:block">
                <Button href="#contato" magnetic={false}>
                  {CTA_LABEL[route]}
                </Button>
              </div>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                className="grid size-10 place-items-center rounded-full border border-line text-ink xl:hidden"
              >
                {open ? <X size={18} /> : <List size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-30 flex flex-col bg-bg px-4 pb-8 pt-[92px] xl:hidden"
          >
            <div className="sm:hidden">
              <RouteTabs route={route} size="lg" />
            </div>
            <motion.ul
              className="mt-10 flex flex-col gap-2"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {links.map((l) => (
                <motion.li
                  key={l.id}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-4 text-3xl font-medium tracking-tight text-ink"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-auto">
              <Button href="#contato" onClick={() => setOpen(false)} className="w-full justify-between" magnetic={false}>
                {CTA_LABEL[route]}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
