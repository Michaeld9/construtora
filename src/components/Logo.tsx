type LogoProps = { className?: string; label?: string };

/** Marca: hexágono simples, referência às colunas de basalto. */
export function LogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-accent" />
      <path
        d="M16 6.5l8.2 4.75v9.5L16 25.5l-8.2-4.75v-9.5z"
        fill="none"
        className="stroke-accent-ink"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "", label }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight text-ink">
        Basalto
        {label && <span className="font-normal text-muted"> {label}</span>}
      </span>
    </span>
  );
}
