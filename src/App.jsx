import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Confetti from "./components/Confetti.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Modal from "./components/Modal.jsx";
import FinalStep from "./steps/FinalStep.jsx";
import IntroStep from "./steps/IntroStep.jsx";
import OptionStep from "./steps/OptionStep.jsx";

const stepData = [
  {
    title: "Pick our first stop",
    subtitle: "Step 1",
    options: [
      { label: "Grab Starbucks", emoji: "☕" },
      { label: "Go to the Aquarium", emoji: "🐠" },
      { label: "Walk through Trinity Bellwoods", emoji: "🌳" },
    ],
  },
  {
    title: "Next adventure",
    subtitle: "Step 2",
    options: [
      { label: "Explore Ossington bars", emoji: "🍸" },
      { label: "Grab tacos", emoji: "🌮" },
      { label: "Get sushi", emoji: "🍣" },
    ],
  },
  {
    title: "Final activity",
    subtitle: "Step 3",
    options: [
      { label: "Snakes & Lattes", emoji: "🎲" },
      { label: "Random adventure", emoji: "🎒" },
      { label: "Surprise me", emoji: "✨" },
    ],
  },
];

const loadingMessages = [
  "Analyzing optimal Toronto date path...",
  "Checking taco availability...",
  "Evaluating fun levels...",
  "Calibrating adventure vibes...",
  "Locating cutest coffee spots...",
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function App() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [showModal, setShowModal] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSteps = stepData.length;

  const currentSelections = useMemo(() => selections.filter(Boolean), [selections]);

  const startLoadingTo = (nextStep) => {
    const message = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setLoadingMessage(message);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
    }, 1100);
  };

  const handleYes = () => startLoadingTo(1);

  const handleOptionSelect = (option) => {
    setSelections((prev) => {
      const updated = [...prev];
      updated[step - 1] = option;
      return updated;
    });

    const nextStep = step + 1;
    if (nextStep <= totalSteps + 1) {
      startLoadingTo(nextStep);
    }
  };

  const handleNoHover = () => {
    const x = Math.floor(Math.random() * 120) - 60;
    const y = Math.floor(Math.random() * 20) - 10;
    setNoPos({ x, y });
  };

  const handleNoClick = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setStep(0);
      setSelections([]);
      setNoPos({ x: 0, y: 0 });
    }, 1400);
  };

  useEffect(() => {
    if (step === totalSteps + 1) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2600);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [step, totalSteps]);

  return (
    <div className="min-h-screen px-4 py-10">
      {showConfetti && <Confetti />}

      <div className="mx-auto flex max-w-md flex-col items-center">
        <motion.div
          layout
          className="w-full rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-card backdrop-blur"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="py-12"
              >
                <LoadingScreen message={loadingMessage} />
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                {step === 0 && (
                  <IntroStep
                    onYes={handleYes}
                    onNoClick={handleNoClick}
                    onNoHover={handleNoHover}
                    noPos={noPos}
                  />
                )}

                {step >= 1 && step <= totalSteps && (
                  <OptionStep
                    title={stepData[step - 1].title}
                    subtitle={stepData[step - 1].subtitle}
                    options={stepData[step - 1].options}
                    onSelect={handleOptionSelect}
                  />
                )}

                {step === totalSteps + 1 && (
                  <FinalStep selections={currentSelections} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
          Toronto Saturday Edition
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <Modal
            message="⚠️ Unexpected input detected. The 'No' button appears to be malfunctioning."
          />
        )}
      </AnimatePresence>
    </div>
  );
}
