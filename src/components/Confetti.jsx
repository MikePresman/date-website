import { motion } from "framer-motion";
import { useMemo } from "react";

const colors = ["#FADCE1", "#DFF6ED", "#DDEBFF", "#EADFFB", "#FFE3D1"];

export default function Confetti() {
  const pieces = useMemo(() =>
    Array.from({ length: 30 }).map((_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      size: 6 + Math.random() * 6,
      color: colors[index % colors.length],
      duration: 2.2 + Math.random() * 0.8,
    })), []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute top-0 rounded-full"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}
