import { motion } from "motion/react";
import { LogoMark } from "./Logo";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Cortina de transição entre as guias.
 * Ao sair: um painel sobe e cobre a página. Ao entrar: o painel com o nome da guia se recolhe para cima.
 */
export function Curtain({ label }: { label: string }) {
  return (
    <>
      {/* cobre a página que está saindo */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 origin-bottom bg-accent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease }}
      />
      {/* revela a página que está entrando */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 flex origin-top items-center justify-center bg-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.8, delay: 0.45, ease } }}
        exit={{ scaleY: 0, transition: { duration: 0 } }}
      >
        <motion.span
          className="flex items-center gap-4 text-4xl font-semibold tracking-tight text-accent-ink md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
          transition={{ duration: 0.9, times: [0, 0.3, 0.7, 1], ease: "easeOut" }}
        >
          <LogoMark className="size-10 md:size-14 [&_rect]:fill-accent-ink [&_path]:stroke-accent" />
          {label}
        </motion.span>
      </motion.div>
    </>
  );
}
