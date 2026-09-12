export default function Button({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700",
    danger: "bg-red-600 hover:bg-red-700",
    ghost: "bg-transparent border border-gray-600 hover:bg-gray-800",
  };
  return (
    <button
      aria-disabled={props.disabled || undefined}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}