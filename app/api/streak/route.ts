import { NextResponse } from "next/server";
import { readData, computeStreak, formatDate } from "@/lib/streakLogic";

export async function GET() {
  const data = readData();
  const sorted = [...data.dates].sort();
  const streak = computeStreak(sorted);
  const totalDays = sorted.length;
  const lastStudied =
    sorted.length > 0 ? formatDate(sorted[sorted.length - 1]) : null;

  return NextResponse.json({ streak, totalDays, lastStudied });
}
