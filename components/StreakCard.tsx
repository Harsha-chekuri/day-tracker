"use client";

interface StreakCardProps {
  label: string;
  value: string | number;
  unit?: string;
  accent?: boolean;
  delay?: number;
}

export default function StreakCard({
  label,
  value,
  unit,
  accent = false,
  delay = 0,
}: StreakCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 animate-fade-up ${
        accent
          ? "bg-flame-500 text-white"
          : "bg-white border border-ash-dark text-ink"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {accent && (
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, #fff 0%, transparent 60%)",
          }}
        />
      )}
      <p
        className={`text-xs font-mono tracking-widest uppercase mb-3 ${
          accent ? "text-flame-100" : "text-ink-muted"
        }`}
      >
        {label}
      </p>
      <div className="flex items-end gap-1">
        <span className={`font-display font-bold leading-none ${accent ? "text-6xl" : "text-5xl"}`}>
          {value}
        </span>
        {unit && (
          <span className={`font-body mb-1 ${accent ? "text-flame-100 text-lg" : "text-ink-muted text-base"}`}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
