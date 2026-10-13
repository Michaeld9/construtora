import { motion } from "motion/react";
import { Check } from "@phosphor-icons/react";
import { Button } from "../../components/Button";
import { WordReveal } from "../../components/Reveal";
import { prefillContact } from "../../lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

// Valores de referência ilustrativos: ajustar à tabela comercial real.
const secondary = [
  {
    name: "Projeto completo",
    price: "A partir de R$ 140 por m²",
    text: "Projeto executivo detalhado para você executar com seus próprios fornecedores.",
    interest: "Projeto completo",
  },
  {
    name: "Consultoria",
    price: "A partir de R$ 2.900",
    text: "Dois encontros no imóvel, plano de layout, paleta de cores e lista de compras com links.",
    interest: "Consultoria",
  },
];

export function Formats() {
  return (
    <section id="formatos" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <WordReveal text="Três formas de contratar." className="text-4xl font-semibold tracking-tighter md:text-6xl" />

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col rounded-[18px] bg-accent p-8 text-accent-ink md:p-12 lg:col-span-7 lg:row-span-2"
        >
          <span className="text-sm font-medium opacity-80">Mais contratado</span>
          <h3 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Projeto e execução</h3>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed opacity-85">
            Projeto completo, compras, obra e montagem com gestão da Basalto. Você recebe a casa pronta, com data de entrega em contrato.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {["Projeto executivo e imagens realistas", "Gestão de todos os fornecedores", "Obra, marcenaria e instalação", "Dois anos de garantia nos serviços"].map((i) => (
              <li key={i} className="flex gap-3">
                <Check size={20} weight="bold" className="mt-0.5 shrink-0" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col items-start gap-6 pt-12 xl:flex-row xl:items-center xl:justify-between">
            <p className="text-2xl font-medium tracking-tight">Orçamento sob medida</p>
            <Button variant="inverse" onClick={() => prefillContact("Projeto e execução")}>
              Solicitar projeto
            </Button>
          </div>
        </motion.article>

        {secondary.map((f, i) => (
          <motion.article
            key={f.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
            className="flex flex-col rounded-[18px] border border-line bg-surface p-8 md:p-10 lg:col-span-5"
          >
            <h3 className="text-3xl font-semibold tracking-tight">{f.name}</h3>
            <p className="mt-2 text-lg font-medium text-accent">{f.price}</p>
            <p className="mt-4 max-w-[40ch] leading-relaxed text-muted">{f.text}</p>
            <button
              onClick={() => prefillContact(f.interest)}
              className="mt-8 self-start text-[15px] font-medium text-ink underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent"
            >
              Solicitar projeto
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
