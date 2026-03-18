import OptionButton from "../components/OptionButton.jsx";

export default function OptionStep({ title, subtitle, options, onSelect }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
          {subtitle}
        </p>
        <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
          <span className="font-display">{title}</span>
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <OptionButton
            key={option.label}
            emoji={option.emoji}
            label={option.label}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
}
