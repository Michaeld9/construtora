import { motion } from "motion/react";
import { Bank, DeviceMobile, Leaf, ShieldCheck } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { Counter } from "../../components/Counter";
import { Img } from "../../components/Img";
import { WordReveal } from "../../components/Reveal";
import type { PhotoKey } from "../../lib/images";

const ease = [0.16, 1, 0.3, 1] as const;

function Cell({ className = "", children, i }: { className?: string; children: ReactNode; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: i * 0.08, ease }}
      className={`group relative overflow-hidden rounded-[18px] ${className}`}
    >
      {children}
    </motion.article>
  );
}

function PhotoBg({ photo, alt }: { photo: PhotoKey; alt: string }) {
  return (
    <>
      <Img
        photo={photo}
        alt={alt}
        width={1200}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="absolute inset-0 h-full w-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(8_12_10/0.82)] via-[rgb(8_12_10/0.25)] to-transparent" />
    </>
  );
}

export function Bento() {
  return (
    <section id="diferenciais" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <WordReveal
        text="O que muda quando você compra na planta com a Basalto."
        className="max-w-[20ch] text-4xl font-semibold leading-[1.02] tracking-tighter md:text-6xl"
      />

      <div className="mt-14 grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Cell i={0} className="min-h-[420px] md:col-span-2 lg:col-span-3 lg:row-span-2">
          <PhotoBg photo="houseWood" alt="Casa contemporânea de concreto e madeira recém-entregue" />
          <div className="relative flex h-full flex-col justify-end p-7 text-[#eef2ed] md:p-10">
            <p className="text-7xl font-semibold tracking-tighter md:text-8xl">
              <Counter value={44} />
              <span className="text-4xl text-[#eef2ed]/70 md:text-5xl"> de 47</span>
            </p>
            <h3 className="mt-4 max-w-[26ch] text-xl font-medium leading-snug md:text-2xl">
              obras entregues antes do prazo previsto em contrato.
            </h3>
          </div>
        </Cell>

        <Cell i={1} className="bg-accent p-7 text-accent-ink md:p-9 lg:col-span-3">
          <ShieldCheck size={40} weight="light" />
          <h3 className="mt-8 text-3xl font-semibold tracking-tight">Cinco anos de garantia estrutural</h3>
          <p className="mt-3 max-w-[40ch] leading-relaxed opacity-85">
            E assistência técnica com visita agendada em até 72 horas depois da entrega.
          </p>
        </Cell>

        <Cell i={2} className="border border-line bg-surface p-7 md:p-9 lg:col-span-3">
          <DeviceMobile size={40} weight="light" className="text-accent" />
          <h3 className="mt-8 text-3xl font-semibold tracking-tight">Portal do proprietário</h3>
          <p className="mt-3 max-w-[40ch] leading-relaxed text-muted">
            Fotos mensais da obra, documentos, boletos e agendamento de vistoria em um só lugar.
          </p>
        </Cell>

        <Cell i={3} className="bg-surface-2 p-7 md:p-9 lg:col-span-2">
          <Leaf size={40} weight="light" className="text-accent" />
          <h3 className="mt-8 text-2xl font-semibold tracking-tight">Energia solar e reuso de água</h3>
          <p className="mt-3 leading-relaxed text-muted">Nas áreas comuns de todos os lançamentos desde 2021.</p>
        </Cell>

        <Cell i={4} className="min-h-[300px] md:col-span-1 lg:col-span-4">
          <PhotoBg photo="balconies" alt="Fachada de edifício com varandas em sequência" />
          <div className="relative flex h-full flex-col justify-end p-7 text-[#eef2ed] md:p-9">
            <Bank size={36} weight="light" />
            <h3 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">Tabela direta com a construtora</h3>
            <p className="mt-2 max-w-[44ch] leading-relaxed text-[#eef2ed]/80">
              Parcelas mensais durante a obra e financiamento bancário só na entrega das chaves.
            </p>
          </div>
        </Cell>
      </div>
    </section>
  );
}
