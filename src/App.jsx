import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Confetti from "./components/Confetti.jsx";
import FloatingDoodles from "./components/FloatingDoodles.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Modal from "./components/Modal.jsx";
import FinalStep from "./steps/FinalStep.jsx";
import IntroStep from "./steps/IntroStep.jsx";
import OptionStep from "./steps/OptionStep.jsx";

const surpriseOption = { label: "Mike can suprise me for this choice :)", emoji: "✨" };
const globalSurpriseOption = { label: "Mike can suprise me for everything :)", emoji: "🎁" };

const withSurpriseChoices = (options) => [...options, surpriseOption, globalSurpriseOption];

const baseStepData = [
  {
    id: "appetizer",
    title: "Appetizers",
    subtitle: "Appetizer",
    options: withSurpriseChoices([
      { label: "Mini Charcuterie Board", emoji: "🧀" },
      { label: "Avocado Toast with Mango Slices", emoji: "🥑" },
    ]),
  },
  {
    id: "main_course_base",
    title: "Main Course (a): pick one",
    subtitle: "Main A",
    options: withSurpriseChoices([
      { label: "Pasta", emoji: "🍝" },
      { label: "Rice", emoji: "🍚" },
      { label: "Mashed Potatoes", emoji: "🥔" },
    ]),
  },
  {
    id: "main_course_protein",
    title: "Main Course (b): pick one",
    subtitle: "Main B",
    options: withSurpriseChoices([
      { label: "Lemon Chicken", emoji: "🍋" },
      { label: "Steak", emoji: "🥩" },
      { label: "Lamb", emoji: "🍖" },
    ]),
  },
  {
    id: "main_course_salad",
    title: "Main Course (c): pick one",
    subtitle: "Main C",
    options: withSurpriseChoices([
      { label: "Garden salad", emoji: "🥗" },
      { label: "Ceasar salad", emoji: "🥬" },
      { label: "Quinoa salad", emoji: "🌿" },
    ]),
  },
  {
    id: "sweet_treat",
    title: "Sweet Treat (d): pick one",
    subtitle: "Dessert",
    options: withSurpriseChoices([
      { label: "Cake", emoji: "🍰" },
      { label: "Cupcake", emoji: "🧁" },
      { label: "Cheesecake", emoji: "🍰" },
      { label: "Ice cream", emoji: "🍨" },
    ]),
  },
  {
    id: "game",
    title: "What game should we play after?",
    subtitle: "After Dinner",
    options: withSurpriseChoices([
      { label: "Card game dating", emoji: "🃏" },
      { label: "Puzzle", emoji: "🧩" },
      { label: "Paint by numbers", emoji: "🎨" },
    ]),
  },
];

const donenessStep = {
  id: "protein_doneness",
  title: "How would you like it cooked?",
  subtitle: "Doneness",
  options: withSurpriseChoices([
    { label: "Medium", emoji: "🔥" },
    { label: "Medium-well", emoji: "🔥" },
    { label: "Medium-rare", emoji: "🔥" },
    { label: "Well", emoji: "🔥" },
    { label: "Rare", emoji: "🔥" },
    { label: "Raw", emoji: "🔥" },
  ]),
};

const loadingMessages = [
  "Picking the tastiest options...",
  "Calibrating Date Night energy...",
  "Saving the best plan...",
  "Preparing your custom evening...",
  "Double-checking cozy vibes...",
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function App() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [showModal, setShowModal] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  const stepData = useMemo(() => {
    const proteinChoice = selections.main_course_protein?.label;
    const shouldAskDoneness = proteinChoice === "Steak" || proteinChoice === "Lamb";

    if (!shouldAskDoneness) {
      return baseStepData;
    }

    const proteinIndex = baseStepData.findIndex((item) => item.id === "main_course_protein");
    return [
      ...baseStepData.slice(0, proteinIndex + 1),
      donenessStep,
      ...baseStepData.slice(proteinIndex + 1),
    ];
  }, [selections]);

  const totalSteps = stepData.length;

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
    if (option.label === globalSurpriseOption.label) {
      setSelections({ global_surprise: globalSurpriseOption });
      startLoadingTo(totalSteps + 1);
      return;
    }

    const currentStep = stepData[step - 1];

    setSelections((prev) => {
      const updated = {
        ...prev,
        [currentStep.id]: option,
      };

      if (
        currentStep.id === "main_course_protein" &&
        option.label !== "Steak" &&
        option.label !== "Lamb"
      ) {
        delete updated.protein_doneness;
      }

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
      setSelections({});
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
    <div
      className="relative min-h-screen px-4 py-8 sm:py-12"
      style={{
        paddingBottom: "calc(2rem + env(safe-area-inset-bottom))",
      }}
    >
      {showConfetti && <Confetti />}
      <FloatingDoodles />

      <div className="mx-auto flex w-full max-w-md flex-col items-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
          <span className="rounded-full bg-white/70 px-4 py-2 shadow-sm">Mike x Mia Date Night</span>
        </div>

        <motion.div
          layout
          className="relative w-full overflow-hidden rounded-[36px] border border-white/70 bg-white/75 p-5 shadow-card backdrop-blur sm:p-7"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-peach/70 via-lilac/60 to-sky/70 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-10 h-32 w-32 rounded-full bg-gradient-to-tr from-rose/70 via-peach/60 to-blush/70 blur-2xl" />
          <div className="absolute left-6 top-6 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink/50 shadow-sm">
            {step === 0 ? "Invite" : step <= totalSteps ? stepData[step - 1].subtitle : "Submit"}
          </div>

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
                className="pt-6"
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
                  <FinalStep selections={selections} stepData={stepData} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
          Mobile First · Ready to Share
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
