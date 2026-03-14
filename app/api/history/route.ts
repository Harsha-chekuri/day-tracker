import { NextResponse } from "next/server";
import { readData, formatDate } from "@/lib/streakLogic";

export async function GET() {
  const data = readData();
  // Newest first
  const history = [...data.dates]
    .sort()
    .reverse()
    .map((iso) => ({ iso, formatted: formatDate(iso) }));

  return NextResponse.json({ history });
}
