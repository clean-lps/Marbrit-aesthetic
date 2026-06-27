import { cn } from "@/shared/lib";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export function Select({
  className,
  error,
  placeholder = "Seleccionar...",
  options,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1">
      <select
        className={cn(
          "w-full rounded-lg border px-3 py-2 text-sm transition-colors",
          "border-surface-300 bg-white text-surface-900",
          "focus:outline-none focus:ring-2 focus:ring-accent/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-error text-error",
          className,
        )}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
