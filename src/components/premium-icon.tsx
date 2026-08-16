import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PremiumIconProps = {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  tone?: "light" | "dark" | "green" | "white" | "danger";
  size?: "sm" | "md" | "lg";
};

const tones = {
  dark: "border-white/12 bg-white/8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
  danger: "border-red-200 bg-red-50 text-red-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]",
  green: "border-[#b9d7ad] bg-[#eef8ea] text-[#2f7a13] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]",
  light: "border-[#dce8d8] bg-white text-[#183814] shadow-[0_10px_28px_rgba(24,56,20,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]",
  white: "border-white/70 bg-white text-[#071007] shadow-[0_14px_34px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.9)]",
};

const sizes = {
  lg: "size-14 rounded-[18px]",
  md: "size-12 rounded-[16px]",
  sm: "size-10 rounded-[14px]",
};

const iconSizes = {
  lg: "size-6",
  md: "size-5",
  sm: "size-4",
};

export function PremiumIcon({
  icon: Icon,
  className,
  iconClassName,
  size = "md",
  tone = "light",
}: PremiumIconProps) {
  return (
    <span className={cn("relative grid shrink-0 place-items-center overflow-hidden border backdrop-blur", tones[tone], sizes[size], className)}>
      <span className="pointer-events-none absolute inset-x-2 top-1 h-1/2 rounded-full bg-white/35 blur-[10px]" />
      <Icon className={cn("relative z-10", iconSizes[size], iconClassName)} strokeWidth={1.8} />
    </span>
  );
}
