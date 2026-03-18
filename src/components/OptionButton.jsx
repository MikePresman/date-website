import { motion } from "framer-motion";

export default function OptionButton({ emoji, label, onClick, className = "" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group w-full rounded-3xl border border-white/70 bg-white/80 px-4 py-3 text-left shadow-sm transition hover:shadow-glow ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-bubble text-xl shadow-sm transition group-hover:scale-105">
          {emoji}
        </span>
        <span className="text-sm font-semibold text-ink sm:text-base">{label}</span>
        <span className="ml-auto text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
          pick
        </span>
      </div>
    </motion.button>
  );
}
