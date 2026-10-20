export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`relative overflow-hidden rounded-full bg-brand-orange px-8 py-3 font-semibold text-white shadow-[0_0_20px_rgba(242,111,33,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(242,111,33,0.6)] disabled:opacity-50 ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}