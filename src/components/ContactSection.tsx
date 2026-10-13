import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, Clock, EnvelopeSimple, MapPin, Phone, WarningCircle } from "@phosphor-icons/react";
import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { PREFILL_EVENT } from "../lib/hooks";
import { Button } from "./Button";
import { FadeUp, WordReveal } from "./Reveal";

export type ContactConfig = {
  eyebrow?: string;
  title: string;
  accentWords?: number[];
  text: string;
  submitLabel: string;
  interestLabel: string;
  interests: string[];
  info: { icon: "map" | "phone" | "mail" | "clock"; label: string; value: string; href?: string }[];
  successText: string;
};

type Values = { nome: string; email: string; telefone: string; interesse: string; mensagem: string };
type Errors = Partial<Record<keyof Values, string>>;

const icons: Record<ContactConfig["info"][number]["icon"], ReactNode> = {
  map: <MapPin size={20} />,
  phone: <Phone size={20} />,
  mail: <EnvelopeSimple size={20} />,
  clock: <Clock size={20} />,
};

const empty: Values = { nome: "", email: "", telefone: "", interesse: "", mensagem: "" };

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.nome.trim().length < 3) e.nome = "Informe seu nome completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Digite um e-mail válido, como nome@email.com.";
  const digits = v.telefone.replace(/\D/g, "");
  if (digits.length < 10) e.telefone = "Inclua DDD e número, com 10 ou 11 dígitos.";
  if (!v.interesse) e.interesse = "Escolha uma opção para direcionarmos seu contato.";
  return e;
}

const fieldCls = (invalid?: boolean) =>
  `h-12 w-full rounded-xl border bg-bg px-4 text-[15px] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-4 ${
    invalid
      ? "border-red-700 focus:ring-red-700/15 dark:border-red-400 dark:focus:ring-red-400/20"
      : "border-line focus:border-accent focus:ring-accent/15"
  }`;

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false} mode="wait">
        {error ? (
          <motion.p
            key="err"
            id={`${id}-msg`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-sm text-red-700 dark:text-red-400"
          >
            <WarningCircle size={16} weight="fill" /> {error}
          </motion.p>
        ) : hint ? (
          <motion.p key="hint" id={`${id}-msg`} className="text-sm text-muted">
            {hint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ContactSection({ config }: { config: ContactConfig }) {
  const uid = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const interest = (e as CustomEvent<string>).detail;
      if (config.interests.includes(interest)) setValues((v) => ({ ...v, interesse: interest }));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, [config.interests]);

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    const value = k === "telefone" ? maskPhone(e.target.value) : e.target.value;
    setValues((v) => ({ ...v, [k]: value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`${uid}-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      // Envio simulado. Conectar ao CRM ou endpoint real aqui.
      await new Promise((r) => setTimeout(r, 1400));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const id = (k: keyof Values) => `${uid}-${k}`;
  const aria = (k: keyof Values) => ({
    id: id(k),
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": `${id(k)}-msg`,
  });

  return (
    <section id="contato" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          {config.eyebrow && (
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent">{config.eyebrow}</p>
          )}
          <WordReveal
            text={config.title}
            accentWords={config.accentWords}
            className="max-w-[14ch] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-5xl"
          />
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">{config.text}</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {config.info.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    {icons[item.icon]}
                  </span>
                  <div>
                    <dt className="text-sm text-muted">{item.label}</dt>
                    <dd className="mt-0.5 text-[15px] font-medium text-ink">
                      {item.href ? (
                        <a href={item.href} className="underline-offset-4 hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>

        <FadeUp className="lg:col-span-7" delay={0.1}>
          <div className="relative overflow-hidden rounded-[18px] border border-line bg-surface p-6 md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[460px] flex-col items-start justify-center"
                  role="status"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                    className="grid size-16 place-items-center rounded-full bg-accent text-accent-ink"
                  >
                    <CheckCircle size={32} weight="fill" />
                  </motion.span>
                  <h3 className="mt-8 text-3xl font-semibold tracking-tight">
                    Recebemos seu contato, {values.nome.trim().split(" ")[0]}.
                  </h3>
                  <p className="mt-3 max-w-[44ch] text-lg leading-relaxed text-muted">{config.successText}</p>
                  <button
                    onClick={() => {
                      setValues(empty);
                      setStatus("idle");
                    }}
                    className="mt-8 text-[15px] font-medium text-accent underline-offset-4 hover:underline"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="grid gap-6 md:grid-cols-2"
                >
                  <div className="md:col-span-2">
                    <Field id={id("nome")} label="Nome completo" error={errors.nome}>
                      <input {...aria("nome")} autoComplete="name" value={values.nome} onChange={set("nome")} className={fieldCls(!!errors.nome)} placeholder="Como devemos te chamar" />
                    </Field>
                  </div>
                  <Field id={id("email")} label="E-mail" error={errors.email}>
                    <input {...aria("email")} type="email" autoComplete="email" value={values.email} onChange={set("email")} className={fieldCls(!!errors.email)} placeholder="nome@email.com" />
                  </Field>
                  <Field id={id("telefone")} label="Telefone ou WhatsApp" error={errors.telefone}>
                    <input {...aria("telefone")} type="tel" inputMode="tel" autoComplete="tel" value={values.telefone} onChange={set("telefone")} className={fieldCls(!!errors.telefone)} placeholder="(11) 90000-0000" />
                  </Field>
                  <div className="md:col-span-2">
                    <Field id={id("interesse")} label={config.interestLabel} error={errors.interesse}>
                      <select {...aria("interesse")} value={values.interesse} onChange={set("interesse")} className={`${fieldCls(!!errors.interesse)} appearance-none pr-10`} style={{ backgroundImage: "linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)", backgroundPosition: "calc(100% - 22px) 52%, calc(100% - 16px) 52%", backgroundSize: "6px 6px, 6px 6px", backgroundRepeat: "no-repeat" }}>
                        <option value="" disabled>
                          Selecione
                        </option>
                        {config.interests.map((i) => (
                          <option key={i}>{i}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <div className="md:col-span-2">
                    <Field id={id("mensagem")} label="Mensagem" hint="Opcional. Conte o melhor horário para falarmos.">
                      <textarea {...aria("mensagem")} rows={4} value={values.mensagem} onChange={set("mensagem")} className={`${fieldCls()} h-auto resize-none py-3`} />
                    </Field>
                  </div>
                  <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
                    <p className="max-w-[40ch] text-sm text-muted">
                      Usamos seus dados apenas para responder a este contato, conforme a LGPD.
                    </p>
                    <Button type="submit" disabled={status === "sending"} magnetic={false}>
                      {status === "sending" ? (
                        <span className="inline-flex items-center gap-2">
                          Enviando
                          <span className="inline-flex gap-0.5" aria-hidden="true">
                            {[0, 1, 2].map((d) => (
                              <motion.span
                                key={d}
                                className="size-1 rounded-full bg-current"
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                              />
                            ))}
                          </span>
                        </span>
                      ) : (
                        config.submitLabel
                      )}
                    </Button>
                  </div>
                  {status === "error" && (
                    <p role="alert" className="text-sm text-red-700 md:col-span-2 dark:text-red-400">
                      Não conseguimos enviar agora. Tente novamente ou fale pelo telefone ao lado.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
