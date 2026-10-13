import { motion } from "motion/react";
import { Counter } from "../../components/Counter";
import { FadeUp, staggerItem } from "../../components/Reveal";

// Números ilustrativos: substituir pelos dados reais da empresa.
const stats = [
  { value: 31, label: "anos construindo em São Paulo" },
  { value: 47, label: "edifícios entregues" },
  { value: 6218, label: "famílias morando em obras Basalto" },
  { value: 1.3, decimals: 1, suffix: " mi", label: "m² construídos" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
      <FadeUp>
        <p className="max-w-[26ch] text-3xl font-medium leading-[1.15] tracking-tight md:text-[2.75rem]">
          Da fundação às chaves, a mesma equipe responde pela sua obra.
        </p>
      </FadeUp>
      <motion.dl
        className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-0"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={staggerItem} className="flex flex-col-reverse border-l border-line pl-5 lg:pl-8">
            <dt className="mt-3 max-w-[18ch] text-[15px] leading-snug text-muted">{s.label}</dt>
            <dd className="text-5xl font-semibold tracking-tighter text-ink md:text-6xl">
              <Counter value={s.value} decimals={s.decimals} />
              {s.suffix && <span className="text-3xl text-muted md:text-4xl">{s.suffix}</span>}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
