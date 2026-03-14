
export interface StudyData {
  dates: string[]; // ISO date strings "YYYY-MM-DD"
}

/** Returns today's date in "YYYY-MM-DD" local‑time format */
export function todayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/** Formats "YYYY-MM-DD" → "14 March 2026" */
export function formatDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    return "Invalid Date";
  }
  const [y, m, d] = iso.split("-").map(Number);
    if (isNaN(y) || isNaN(m) || isNaN(d)) {
    return "Invalid Date";
  }
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Compute current streak from a sorted (ascending) list of unique dates */
export function computeStreak(sortedDates: string[]): number {
  if (sortedDates.length === 0) return 0;

  const today = todayString();
  const yesterday = offsetDate(today, -1);

  // The streak must include today or yesterday to be active
  const last = sortedDates[sortedDates.length - 1];
  if (last !== today && last !== yesterday) return 0;

  let streak = 1;
  for (let i = sortedDates.length - 1; i > 0; i--) {
    const expected = offsetDate(sortedDates[i], -1);
    if (sortedDates[i - 1] === expected) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/** Offset an ISO date string by `days` days */
function offsetDate(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d + days);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}
