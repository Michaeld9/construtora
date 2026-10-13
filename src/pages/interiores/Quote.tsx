import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Img } from "../../components/Img";
import { FadeUp } from "../../components/Reveal";

export function Quote() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} aria-label="Depoimento de cliente" className="relative mx-4 overflow-hidden rounded-[18px] md:mx-8">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -top-[14%] h-[128%]">
        <Img photo="livingLight" width={1800} alt="Sala clara com sofá bege, mesa de centro e luz natural" className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(8_12_10/0.85)] via-[rgb(8_12_10/0.6)] to-[rgb(8_12_10/0.15)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(8_12_10/0.55)] to-transparent" />
      <FadeUp className="relative flex min-h-[80vh] max-w-[1400px] flex-col justify-end p-6 text-[#eef2ed] md:p-14">
        <figure>
          <blockquote className="max-w-[30ch] text-3xl font-medium leading-[1.2] tracking-tight md:text-[2.4rem]">
            “Entenderam nossa rotina antes de desenhar qualquer móvel. E a casa ficou pronta na data combinada.”
          </blockquote>
          <figcaption className="mt-8">
            <span className="block font-medium">Juliana e Rafael Okamoto</span>
            <span className="text-[#eef2ed]/75">Projeto e execução, apartamento em Pinheiros</span>
          </figcaption>
        </figure>
      </FadeUp>
    </section>
  );
}
