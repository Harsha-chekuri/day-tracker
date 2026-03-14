"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { todayString } from "@/lib/streakLogic";

export default function StudyButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const lastStudied = localStorage.getItem("lastStudied");
    if (lastStudied) {
      const today = todayString();
      if (lastStudied === today) {
        setStatus("already");
        setMessage("You've already studied today. Great job!");
      }
    }
  }, []);

  const handleClick = async () => {
    if (status === "loading") return;
    setStatus("loading");

    try {
      const today = todayString();
      const lastStudied = localStorage.getItem("lastStudied");

      if (lastStudied === today) {
        setStatus("already");
        setMessage("You've already studied today. Great job!");
      } else {
        localStorage.setItem("lastStudied", today);
        const history = JSON.parse(localStorage.getItem("studyHistory") || "[]");
        
        // Ensure we don't add a duplicate for the same day
        if (!history.includes(today)) {
          history.push(today);
        }

        localStorage.setItem("studyHistory", JSON.stringify(history));
		    window.dispatchEvent(new Event("storage"));
        setStatus("success");
        setMessage("Study session logged successfully!");
        // Refresh server components after a short celebration
        setTimeout(() => router.refresh(), 1200);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const isIdle = status === "idle" || status === "error";

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleClick}
        disabled={status === "loading" || status === "success" || status === "already"}
        className={`relative group rounded-2xl px-10 py-5 font-display font-bold text-xl transition-all duration-300 select-none
          ${
            status === "success"
              ? "bg-green-500 text-white cursor-default scale-95"
              : status === "already"
              ? "bg-ash-dark text-ink-muted cursor-default"
              : status === "loading"
              ? "bg-flame-400 text-white cursor-wait"
              : "bg-ink text-white hover:bg-flame-500 active:scale-95 animate-pulse-ring"
          }
        `}
      >
        <span className="relative z-10 flex items-center gap-3">
          {status === "loading" && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          )}
          {status === "success" && "✓ Logged!"}
          {status === "already" && "✓ Already logged today"}
          {status === "loading" && "Logging…"}
          {isIdle && (
            <>
              <span className="text-2xl">🔥</span>
              I Studied Today
            </>
          )}
        </span>
      </button>

      {message && (
        <p
          className={`text-sm font-body animate-fade-up px-4 py-2 rounded-xl ${
            status === "success"
              ? "text-green-700 bg-green-50 border border-green-200"
              : status === "already"
              ? "text-amber-700 bg-amber-50 border border-amber-200"
              : "text-red-700 bg-red-50 border border-red-200"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}