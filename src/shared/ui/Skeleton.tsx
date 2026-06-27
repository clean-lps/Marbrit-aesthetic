import { cn } from "@/shared/lib";

interface SkeletonProps {
  className?: string;
  as?: "div" | "span";
}

export function Skeleton({ className, as: Tag = "div" }: SkeletonProps) {
  return (
    <Tag
      className={cn(
        "animate-pulse rounded-md bg-surface-200",
        className,
      )}
      aria-hidden="true"
    />
  );
}
