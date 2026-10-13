import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { MouseEvent, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  magnetic?: boolean;
};

const styles = {
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  secondary: "border border-line text-ink hover:border-ink/40 bg-bg/40",
  ghost: "text-ink hover:text-accent",
  inverse: "bg-accent-ink text-accent hover:bg-accent-ink/90",
};

/** Botão pill com leve atração magnética ao cursor (apenas em ponteiros finos). */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
  icon,
  className = "",
  magnetic = true,
}: ButtonProps) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnetic || reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const cls = `group relative inline-flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full pl-6 pr-2 text-[15px] font-medium transition-colors duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      <span
        className={`grid size-9 place-items-center overflow-hidden rounded-full ${
          variant === "primary" ? "bg-accent-ink/15" : variant === "inverse" ? "bg-accent/12" : "bg-surface-2"
        }`}
      >
        <span className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-px group-hover:translate-x-0.5">
          {icon ?? <ArrowUpRight size={16} weight="bold" />}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x, y }} className={cls}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className={cls}
    >
      {inner}
    </motion.button>
  );
}
