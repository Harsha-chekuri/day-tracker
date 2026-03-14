'use client';

import { useEffect, useState } from 'react';
import { computeStreak, formatDate } from "@/lib/streakLogic";
import StreakCard from "@/components/StreakCard";
import StudyButton from "@/components/StudyButton";

export default function DashboardPage() {
  const [streak, setStreak] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [lastStudied, setLastStudied] = useState<string | null>(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("studyHistory") || "[]");
    const sorted = [...history].sort();
    const currentStreak = computeStreak(sorted);
    const totalSessions = sorted.length;
    const lastSession =
      sorted.length > 0 ? formatDate(sorted[sorted.length - 1]) : null;

    setStreak(currentStreak);
    setTotalDays(totalSessions);
    setLastStudied(lastSession);
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="animate-fade-up">
        <p className="text-xs font-mono tracking-widest uppercase text-flame-500 mb-2">
          Welcome back
        </p>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight">
          Keep the flame{" "}
          <span className="text-flame-500">burning.</span>
        </h1>
        <p className="font-body text-ink-muted mt-3 text-lg">
          Every day counts. Mark today&apos;s session and extend your streak.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StreakCard
          label="Current Streak"
          value={streak}
          unit={streak === 1 ? "day" : "days"}
          accent
          delay={0}
        />
        <StreakCard
          label="Total Study Days"
          value={totalDays}
          unit={totalDays === 1 ? "session" : "sessions"}
          delay={80}
        />
        <StreakCard
          label="Last Studied"
          value={lastStudied ?? "—"}
          delay={160}
        />
      </div>

      {/* Divider */}
      <div className="border-t border-ash-dark" />

      {/* Study Button Section */}
      <div className="flex flex-col items-center gap-2 py-4">
        <p className="font-body text-ink-muted text-sm mb-2">
          Ready to log today&apos;s session?
        </p>
        <StudyButton />
      </div>

      {/* Streak Rules Info */}
      <div className="rounded-2xl bg-white border border-ash-dark p-6 animate-fade-up" style={{ animationDelay: "240ms" }}>
        <h2 className="font-display font-bold text-ink text-lg mb-4">
          How streaks work
        </h2>
        <ul className="space-y-3">
          {[
            ["🔥", "Study today to keep your streak alive."],
            ["📅", "Miss a day and your streak resets to 1."],
            ["✅", "You can only mark one session per day."],
            ["📚", "Every session is saved to your history forever."],
          ].map(([icon, text]) => (
            <li key={text} className="flex items-start gap-3 font-body text-sm text-ink-muted">
              <span className="text-base mt-0.5">{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
