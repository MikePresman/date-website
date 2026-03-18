import { motion } from "framer-motion";

const doodles = [
  { emoji: "💖", top: "6%", left: "8%", size: "text-2xl", delay: 0.2 },
  { emoji: "✨", top: "14%", right: "10%", size: "text-xl", delay: 0.6 },
  { emoji: "🎀", top: "78%", left: "6%", size: "text-2xl", delay: 0.4 },
  { emoji: "🌸", top: "82%", right: "8%", size: "text-2xl", delay: 0.8 },
  { emoji: "💫", top: "42%", left: "2%", size: "text-xl", delay: 1.1 },
  { emoji: "🫧", top: "48%", right: "3%", size: "text-2xl", delay: 1.3 },
];

export default function FloatingDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {doodles.map((doodle) => (
        <motion.span
          key={`${doodle.emoji}-${doodle.top}-${doodle.left || doodle.right}`}
          className={`absolute ${doodle.size} drop-shadow-sm`}
          style={{
            top: doodle.top,
            left: doodle.left,
            right: doodle.right,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: [0, 1, 1, 0.9],
            y: [0, -6, 0],
          }}
          transition={{
            duration: 4,
            delay: doodle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {doodle.emoji}
        </motion.span>
      ))}
    </div>
  );
}
