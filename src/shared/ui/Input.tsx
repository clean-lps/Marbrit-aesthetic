interface InputProps {
  label: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
}

function Input({ label, error, success, disabled }: InputProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-surface-700">{label}</span>
      <input
        disabled={disabled}
        aria-invalid={!!error}
        className={`rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed ${
          error
            ? "border-red-500 focus:ring-red-500/50"
            : success
              ? "border-green-500 focus:ring-green-500/50"
              : "border-surface-300"
        }`}
      />
      {error && <span role="alert" className="text-xs text-red-500">{error}</span>}
    </label>
  );
}

export default Input;
