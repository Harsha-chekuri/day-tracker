'use client';

import { useEffect, useState } from 'react';
import { computeStreak, formatDate } from "@/lib/streakLogic";
import HistoryList from "@/components/HistoryList";
import Link from "next/link";

interface HistoryItem {
  iso: string;
  formatted: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const studyHistory = JSON.parse(localStorage.getItem('studyHistory') || '[]');
    const sorted = [...studyHistory].sort();
    const currentStreak = computeStreak(sorted);
    
    const formattedHistory = [...sorted]
      .reverse()
      .map((iso) => ({ iso, formatted: formatDate(iso) }));

    setHistory(formattedHistory);
    setStreak(currentStreak);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-up">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-ink-muted hover:text-flame-500 transition-colors mb-4"
        >
          ← Dashboard
        </Link>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight">
          Study <span className="text-flame-500">History</span>
        </h1>
        <p className="font-body text-ink-muted mt-3 text-lg">
          {history.length === 0
            ? "No sessions logged yet."
            : `${history.length} session${history.length === 1 ? "" : "s"} logged · ${streak} day streak`}
        </p>
      </div>

      {/* Summary bar */}
      {history.length > 0 && (
        <div
          className="flex flex-wrap gap-6 px-6 py-4 rounded-2xl bg-white border border-ash-dark animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-ink-muted">Total Days</p>
            <p className="font-display font-bold text-2xl text-ink">{history.length}</p>
          </div>
          <div className="w-px bg-ash-dark" />
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-ink-muted">Current Streak</p>
            <p className="font-display font-bold text-2xl text-flame-500">{streak} 🔥</p>
          </div>
          <div className="w-px bg-ash-dark" />
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-ink-muted">First Session</p>
            <p className="font-display font-bold text-2xl text-ink">
              {history.length > 0 ? history[history.length - 1].formatted : ''}
            </p>
          </div>
        </div>
      )}

      {/* History list */}
      <div className="animate-fade-up" style={{ animationDelay: "160ms" }}>
        <HistoryList history={history} />
      </div>
    </div>
  );
}
