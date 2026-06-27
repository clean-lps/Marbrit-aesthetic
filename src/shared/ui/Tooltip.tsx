import { cn } from "@/shared/lib";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom";
}

export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  return (
    <div className="group/tooltip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2",
          "whitespace-nowrap rounded-lg bg-surface-900 px-2 py-1",
          "text-xs text-white opacity-0 shadow-lg transition-opacity",
          "group-hover/tooltip:opacity-100",
          position === "top" ? "bottom-full mb-2" : "top-full mt-2",
        )}
      >
        {content}
      </span>
    </div>
  );
}
