interface HistoryEntry {
  iso: string;
  formatted: string;
}

interface HistoryListProps {
  history: HistoryEntry[];
}

export default function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-16 text-ink-muted font-body">
        <p className="text-5xl mb-4">📚</p>
        <p className="text-lg">No study sessions yet.</p>
        <p className="text-sm mt-1">Mark your first session from the dashboard!</p>
      </div>
    );
  }

  const today = new Date();
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <ul className="space-y-2">
      {history.map((entry, i) => {
        const isToday = entry.iso === todayIso;
        return (
          <li
            key={entry.iso}
            className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white border border-ash-dark animate-fade-up group hover:border-flame-300 transition-colors duration-200"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <span className="w-8 h-8 rounded-full bg-flame-50 border border-flame-200 flex items-center justify-center flex-shrink-0 text-sm">
              {isToday ? "🔥" : "✓"}
            </span>
            <span className="font-body text-ink font-medium">{entry.formatted}</span>
            {isToday && (
              <span className="ml-auto text-xs font-mono bg-flame-100 text-flame-700 px-2 py-0.5 rounded-full tracking-wide">
                TODAY
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
