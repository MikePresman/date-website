import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdapbank";

export default function FinalStep({ selections, stepData }) {
  const [submitState, setSubmitState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const answers = useMemo(
    () =>
      stepData.map((step, index) => ({
        id: step.id || `q${index + 1}`,
        question: step.title,
        answer: selections[step.id]?.label ?? "",
        emoji: selections[step.id]?.emoji ?? "",
      })),
    [selections, stepData]
  );

  const globalSurprise = Boolean(selections.global_surprise);
  const isComplete = globalSurprise || answers.every((item) => item.answer);

  const handleSubmit = async () => {
    if (!isComplete || submitState === "submitting") {
      return;
    }

    try {
      setSubmitState("submitting");
      setErrorMessage("");

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...answers.reduce((acc, item, index) => {
            acc[`${item.id || `question_${index + 1}`}`] = item.answer || "";
            return acc;
          }, {}),
          global_surprise: selections.global_surprise?.label || "",
          summary: answers
            .map((item, index) => `${index + 1}. ${item.question}: ${item.emoji} ${item.answer}`)
            .join("\n"),
          _subject: "Mia x Mike <> Date Night submission",
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Failed to submit");
      }

      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
          Ready To Send
        </p>
        <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
          <span className="font-display">Submit Date Night Choices</span> 💌
        </h2>
        <p className="mt-2 text-sm font-semibold text-ink/70 sm:text-base">
          {globalSurprise
            ? "Global surprise selected for the entire menu."
            : "Send appetizer, dinner, dessert, and game picks to Mike."}
        </p>
      </div>

      <div className="rounded-3xl border border-white/70 bg-white/80 p-4 text-left shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Choices</p>
        {globalSurprise && (
          <div className="mt-3 rounded-2xl bg-bubble px-3 py-3 text-sm font-semibold text-ink">
            🎁 Mike can suprise me for everything :)
          </div>
        )}
        <ul className="mt-3 flex flex-col gap-3 text-base font-semibold text-ink">
          {answers.map((item, index) => (
            <li key={item.question} className="flex items-start gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-bubble text-xl">
                {item.emoji || "❔"}
              </span>
              <div className="flex flex-1 flex-col">
                <span className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
                  {item.question}
                </span>
                <span>{item.answer || "Not selected"}</span>
              </div>
              <span className="pt-4 text-ink/40">#{index + 1}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={!isComplete || submitState === "submitting" || submitState === "success"}
        className="sparkle w-full rounded-3xl bg-gradient-to-r from-rose via-peach to-lilac px-4 py-3 text-base font-semibold text-ink shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitState === "submitting" && "Submitting..."}
        {submitState === "success" && "Submitted ✓"}
        {(submitState === "idle" || submitState === "error") && "Submit to Mike"}
      </motion.button>

      {submitState === "success" && (
        <p className="text-center text-sm font-semibold text-ink/70">
          Submitted successfully ✓
        </p>
      )}

      {submitState === "error" && (
        <p className="text-center text-sm font-semibold text-red-700">{errorMessage}</p>
      )}
    </div>
  );
}
