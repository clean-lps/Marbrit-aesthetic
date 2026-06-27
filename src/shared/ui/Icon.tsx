import { cn } from "@/shared/lib";
import type { LucideIcon } from "lucide-react";

interface IconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

export function Icon({ icon: LucideIcon, size = "md", className }: IconProps) {
  return (
    <LucideIcon
      className={cn("shrink-0", sizes[size], className)}
      aria-hidden="true"
    />
  );
}
