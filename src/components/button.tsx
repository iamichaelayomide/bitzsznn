import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-[var(--button-primary)] text-primary-foreground hover:bg-[var(--button-primary-hover)] shadow-[0_16px_38px_rgba(75,165,11,0.28)]",
  secondary:
    "bg-[var(--button-secondary)] text-[#121512] hover:bg-white shadow-[0_16px_38px_rgba(255,255,255,0.12)]",
  ghost:
    "border border-border bg-white/5 text-foreground hover:border-primary/60 hover:bg-white/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-control)] px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 md:min-h-[58px] md:px-7 md:text-base",
    variants[variant],
    className,
  );

  const content = (
    <>
      {children}
      <ArrowRight className="size-4 transition duration-200 group-hover:translate-x-0.5" />
    </>
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type}>
      {content}
    </button>
  );
}
