import { NextResponse } from "next/server";
import {
  readData,
  writeData,
  todayString,
  computeStreak,
} from "@/lib/streakLogic";

export async function POST() {
  const data = readData();
  const today = todayString();

  // Prevent duplicate entries for the same day
  if (data.dates.includes(today)) {
    return NextResponse.json(
      { success: false, message: "You have already marked today." },
      { status: 409 }
    );
  }

  // Add today and keep dates sorted ascending
  data.dates.push(today);
  data.dates.sort();
  writeData(data);

  const streak = computeStreak(data.dates);

  return NextResponse.json({
    success: true,
    message: "Great work! Study session recorded. 🔥",
    streak,
    totalDays: data.dates.length,
  });
}
