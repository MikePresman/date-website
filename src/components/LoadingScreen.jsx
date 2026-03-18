import { motion } from "framer-motion";

export default function LoadingScreen({ message }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-sm font-semibold text-ink/80 sm:text-base">
        {message} <span className="ml-1">💫</span>
      </p>
      <div className="h-2.5 w-48 overflow-hidden rounded-full bg-white/70">
        <motion.div
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-rose via-peach to-sky"
          initial={{ x: "-70%" }}
          animate={{ x: "130%" }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
