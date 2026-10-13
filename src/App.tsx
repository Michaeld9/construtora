import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { lazy, Suspense, useEffect } from "react";
import { Curtain } from "./components/Curtain";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { useRoute } from "./lib/router";
import ConstrutoraPage from "./pages/construtora";
// A guia de Interiores carrega sob demanda, enquanto a cortina cobre a tela.
const InterioresPage = lazy(() => import("./pages/interiores"));

const titles = {
  construtora: "Basalto Construtora e Interiores",
  interiores: "Basalto Interiores | Projeto e execução de interiores",
};

/** Ao montar uma guia, leva até a âncora da URL (ex.: /interiores#formatos vindo do rodapé). */
function ScrollToHash() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const raf = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }));
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}

export default function App() {
  const route = useRoute();

  useEffect(() => {
    document.title = titles[route];
  }, [route]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-full bg-accent px-5 py-3 text-accent-ink focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Nav route={route} />
      <AnimatePresence
        mode="wait"
        initial={true}
        onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
      >
        <motion.div key={route}>
          <main id="conteudo">
            <Suspense fallback={<div className="min-h-[100dvh]" />}>
              {route === "construtora" ? <ConstrutoraPage /> : <InterioresPage />}
            </Suspense>
          </main>
          <Footer />
          <ScrollToHash />
          <Curtain label={route === "construtora" ? "Construtora" : "Interiores"} />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
