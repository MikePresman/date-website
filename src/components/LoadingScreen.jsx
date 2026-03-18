import { motion } from "framer-motion";

export default function LoadingScreen({ message }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-base font-semibold text-ink/80">{message}</p>
      <div className="h-2 w-48 overflow-hidden rounded-full bg-white/70">
        <motion.div
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-peach via-lilac to-sky"
          initial={{ x: "-60%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
