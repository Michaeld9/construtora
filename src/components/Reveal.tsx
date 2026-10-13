import { motion, type HTMLMotionProps } from "motion/react";
import type { ElementType, ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type FadeUpProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Entrada suave ao rolar até o elemento. */
export function FadeUp({ delay = 0, y = 28, children, ...rest }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type WordRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Palavras (índices) destacadas na cor de acento. */
  accentWords?: number[];
  delay?: number;
  /** Anima ao montar em vez de ao entrar na viewport (usado no hero). */
  onMount?: boolean;
};

/** Títulos que sobem palavra por palavra a partir de uma máscara. */
export function WordReveal({ text, as: Tag = "h2", className = "", accentWords = [], delay = 0, onMount }: WordRevealProps) {
  const words = text.split(" ");
  const trigger = onMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.4 } };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="block"
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
        {...trigger}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span
              className={`inline-block ${accentWords.includes(i) ? "text-accent" : ""}`}
              variants={{
                hidden: { y: "105%" },
                show: { y: "0%", transition: { duration: 0.95, ease } },
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function Stagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
