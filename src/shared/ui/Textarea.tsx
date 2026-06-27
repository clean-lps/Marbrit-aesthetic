import { cn } from "@/shared/lib";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <div className="space-y-1">
      <textarea
        className={cn(
          "w-full rounded-lg border px-3 py-2 text-sm transition-colors",
          "border-surface-300 bg-white text-surface-900",
          "placeholder:text-surface-400",
          "focus:outline-none focus:ring-2 focus:ring-accent/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-y min-h-[80px]",
          error && "border-error text-error",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
