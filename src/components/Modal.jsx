import { motion } from "framer-motion";

export default function Modal({ message }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-sm rounded-3xl border border-white/70 bg-white/90 p-6 text-center text-ink shadow-glow"
      >
        <p className="text-base font-semibold">{message}</p>
        <p className="mt-2 text-sm text-ink/60">Automatic reroute to the cute option.</p>
      </motion.div>
    </div>
  );
}
