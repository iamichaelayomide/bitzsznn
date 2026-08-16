import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
  showIcon?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-[var(--button-primary)] text-primary-foreground hover:bg-[var(--button-primary-hover)] shadow-[0_12px_30px_rgba(75,165,11,0.24)]",
  secondary:
    "bg-[var(--button-secondary)] text-[#121512] hover:bg-white shadow-[0_12px_30px_rgba(255,255,255,0.1)]",
  ghost:
    "border border-border bg-white/5 text-foreground hover:border-primary/60 hover:bg-white/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  disabled = false,
  showIcon = false,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-control)] px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] transition duration-200 hover:-translate-y-0.5 active:translate-y-0 md:min-h-[50px] md:px-5",
    variants[variant],
    className,
  );

  const content = (
    <>
      {children}
      {showIcon ? <ArrowRight className="size-4 transition duration-200 group-hover:translate-x-0.5" strokeWidth={1.8} /> : null}
    </>
  );

  if (href && !disabled) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} type={type}>
      {content}
    </button>
  );
}
