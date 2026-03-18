import { motion } from "framer-motion";

export default function IntroStep({ onYes, onNoClick, onNoHover, noPos }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-ink/60">
          Important Question
        </p>
        <h1 className="mt-3 text-2xl font-extrabold text-ink">
          Spend the day with Mike on Saturday?
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onYes}
          className="w-full rounded-2xl bg-ink px-4 py-3 text-base font-semibold text-white shadow-card"
        >
          Yes
        </motion.button>

        <div className="relative h-14">
          <motion.button
            style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
            onMouseEnter={onNoHover}
            onTouchStart={onNoHover}
            onClick={onNoClick}
            whileTap={{ scale: 0.96 }}
            className="absolute left-0 top-0 rounded-2xl border border-ink/20 bg-white px-6 py-3 text-base font-semibold text-ink shadow-sm"
          >
            No
          </motion.button>
        </div>
      </div>
    </div>
  );
}
