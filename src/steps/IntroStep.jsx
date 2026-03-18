import { motion } from "framer-motion";

export default function IntroStep({ onYes, onNoClick, onNoHover, noPos }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-ink/50">
          Important Question
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
          <span className="font-display">Spend the day with Mike</span>
        </h1>
        <p className="mt-2 text-sm font-semibold text-ink/70 sm:text-base">
          Saturday edition, curated with extra sparkle.
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-ink/60 sm:text-sm">
          <span className="rounded-full bg-bubble px-3 py-1 text-ink/70">💖 100% yes vibes</span>
          <span className="rounded-full bg-bubble px-3 py-1 text-ink/70">✨ cute + cozy</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.03, rotate: -0.5 }}
          whileTap={{ scale: 0.98 }}
          onClick={onYes}
          className="sparkle w-full rounded-3xl bg-gradient-to-r from-rose via-peach to-lilac px-4 py-3 text-base font-semibold text-ink shadow-glow"
        >
          Yes, let's do it 💌
        </motion.button>

        <div className="relative h-14">
          <motion.button
            style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
            onMouseEnter={onNoHover}
            onTouchStart={onNoHover}
            onClick={onNoClick}
            whileTap={{ scale: 0.96 }}
            whileHover={{ rotate: 1.5 }}
            className="absolute left-0 top-0 rounded-3xl border border-ink/20 bg-white/80 px-6 py-3 text-base font-semibold text-ink shadow-sm"
          >
            Maybe later
          </motion.button>
        </div>
      </div>
    </div>
  );
}
