interface ButtonProps {
  children: React.ReactNode; // bất kỳ JSX nào
  onClick?: () => void; // optional — không truyền cũng được
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string; // cho phép thêm class từ ngoài
}
export default function Button({
  children,
  onClick,
  variant = "primary", // default value
  size = "md",
  disabled = false,
  className = "",
}: ButtonProps) {
  const base =
    "font-medium rounded-xl transition-colors duration-200 inline-flex items-center justify-center";
  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-50",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
