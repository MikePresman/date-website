import { motion } from "framer-motion";
import { useMemo } from "react";

const emojis = ["💖", "✨", "🎀", "🌸", "💫", "🫧"];

export default function Confetti() {
  const pieces = useMemo(() =>
    Array.from({ length: 30 }).map((_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      size: 16 + Math.random() * 10,
      emoji: emojis[index % emojis.length],
      duration: 2.2 + Math.random() * 0.8,
    })), []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute top-0"
          style={{
            left: `${piece.left}%`,
            fontSize: piece.size,
          }}
          initial={{ y: -20, opacity: 0, rotate: -10 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 12 }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
        >
          {piece.emoji}
        </motion.span>
      ))}
    </div>
  );
}
