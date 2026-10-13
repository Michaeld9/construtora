import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const fmt = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

/** Número que conta até o valor final ao entrar na tela. Atualiza o DOM direto, sem re-render. */
export function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const format = (v: number) =>
      decimals ? fmt.format(Number(v.toFixed(decimals))) : fmt.format(Math.round(v));
    if (reduce) {
      el.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, reduce]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        0
      </span>
      <span className="sr-only">{fmt.format(value)}</span>
    </>
  );
}
