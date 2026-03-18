import { motion } from "framer-motion";

export default function OptionButton({ children, onClick, className = "" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-left text-base font-semibold text-ink shadow-sm transition hover:shadow-md ${className}`}
    >
      {children}
    </motion.button>
  );
}
