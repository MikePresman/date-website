import { motion } from "framer-motion";
import { downloadAdventureIcs } from "../utils/ics.js";

export default function FinalStep({ selections }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-ink/60">
          Date Confirmed
        </p>
        <h2 className="mt-3 text-2xl font-extrabold text-ink">
          Date Confirmed 🎉
        </h2>
      </div>

      <div className="rounded-2xl border border-white/70 bg-white/80 p-4 text-left shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-ink/60">
          Saturday Adventure
        </p>
        <ul className="mt-3 flex flex-col gap-3 text-base font-semibold text-ink">
          {selections.map((item, index) => (
            <li key={item.label} className="flex items-center gap-3">
              <span className="text-xl">{item.emoji}</span>
              <span className="flex-1">{item.label}</span>
              <span className="text-ink/40">{index + 1}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => downloadAdventureIcs({ selections })}
        className="w-full rounded-2xl bg-ink px-4 py-3 text-base font-semibold text-white shadow-card"
      >
        Add to Calendar
      </motion.button>
    </div>
  );
}
