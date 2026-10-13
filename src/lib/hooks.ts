import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("basalto-theme", next);
    } catch {
      // armazenamento indisponível: o tema vale só para esta visita
    }
  };

  return { theme, toggle };
}

/** Pré-preenche o formulário de contato a partir de outros pontos da página. */
export const PREFILL_EVENT = "basalto:prefill";

export function prefillContact(interest: string) {
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: interest }));
  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
}
