import OptionButton from "../components/OptionButton.jsx";

export default function OptionStep({ title, subtitle, options, onSelect }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-ink/60">
          {subtitle}
        </p>
        <h2 className="mt-3 text-2xl font-extrabold text-ink">{title}</h2>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <OptionButton key={option.label} onClick={() => onSelect(option)}>
            <span className="mr-2">{option.emoji}</span>
            {option.label}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}
