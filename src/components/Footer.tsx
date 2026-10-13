import { motion } from "motion/react";
import { InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react";
import { navigate } from "../lib/router";
import { LogoMark } from "./Logo";

const cols = [
  {
    title: "Construtora",
    route: "construtora" as const,
    links: [
      { label: "Empreendimentos", hash: "empreendimentos" },
      { label: "Como construímos", hash: "como-construimos" },
      { label: "Diferenciais", hash: "diferenciais" },
      { label: "Agendar visita", hash: "contato" },
    ],
  },
  {
    title: "Interiores",
    route: "interiores" as const,
    links: [
      { label: "Serviços", hash: "servicos" },
      { label: "Projetos", hash: "projetos" },
      { label: "Formatos", hash: "formatos" },
      { label: "Solicitar projeto", hash: "contato" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-4 pt-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <LogoMark className="size-9" />
              <span className="text-xl font-semibold tracking-tight">Basalto</span>
            </div>
            <p className="mt-5 max-w-[38ch] leading-relaxed text-muted">
              Incorporação, construção e arquitetura de interiores em São Paulo desde 1995.
            </p>
            <div className="mt-8 flex gap-2">
              {[
                { icon: <InstagramLogo size={20} />, label: "Instagram" },
                { icon: <LinkedinLogo size={20} />, label: "LinkedIn" },
                { icon: <YoutubeLogo size={20} />, label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <h3 className="text-sm font-medium text-ink">{c.title}</h3>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={`${c.route === "interiores" ? "/interiores" : "/"}#${l.hash}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(c.route, l.hash);
                      }}
                      className="text-[15px] text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-3">
            <h3 className="text-sm font-medium text-ink">Sede</h3>
            <address className="mt-5 space-y-3 text-[15px] not-italic leading-relaxed text-muted">
              <p>Av. Brigadeiro Faria Lima, 3144, 9º andar<br />Itaim Bibi, São Paulo, SP</p>
              <p>
                <a href="tel:+551130472186" className="hover:text-ink">(11) 3047-2186</a>
              </p>
            </address>
          </div>
        </div>

        <div className="overflow-hidden pt-16">
          <motion.p
            aria-hidden="true"
            initial={{ y: "60%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="select-none text-[25vw] font-semibold leading-[0.78] tracking-[-0.06em] text-surface-2 md:text-[21vw]"
          >
            Basalto
          </motion.p>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-sm text-muted md:flex-row md:justify-between">
          <p>© 2026 Basalto Construtora e Incorporadora Ltda. CNPJ 00.000.000/0001-00</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink">Política de privacidade</a>
            <a href="#" className="hover:text-ink">Termos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
