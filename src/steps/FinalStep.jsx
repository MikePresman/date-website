import { motion } from "framer-motion";
import { downloadAdventureIcs } from "../utils/ics.js";

export default function FinalStep({ selections }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
          Date Confirmed
        </p>
        <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
          <span className="font-display">Date Confirmed</span> 🎉
        </h2>
        <p className="mt-2 text-sm font-semibold text-ink/70 sm:text-base">
          Your custom adventure is officially adorable.
        </p>
      </div>

      <div className="rounded-3xl border border-white/70 bg-white/80 p-4 text-left shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
          Saturday Adventure
        </p>
        <ul className="mt-3 flex flex-col gap-3 text-base font-semibold text-ink">
          {selections.map((item, index) => (
            <li key={item.label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-bubble text-xl">
                {item.emoji}
              </span>
              <span className="flex-1">{item.label}</span>
              <span className="text-ink/40">#{index + 1}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => downloadAdventureIcs({ selections })}
        className="sparkle w-full rounded-3xl bg-gradient-to-r from-rose via-peach to-lilac px-4 py-3 text-base font-semibold text-ink shadow-glow"
      >
        Add to Calendar 💌
      </motion.button>
    </div>
  );
}
