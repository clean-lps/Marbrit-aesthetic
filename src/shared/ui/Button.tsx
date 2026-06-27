interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<string, string> = {
  primary: "bg-accent text-white hover:bg-accent/90",
  secondary: "bg-surface-100 text-surface-900 hover:bg-surface-200",
  ghost: "text-surface-600 hover:bg-surface-100",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

function Button({ children, variant = "primary", size = "md", disabled, loading, onClick }: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {loading ? "..." : children}
    </button>
  );
}

export default Button;
