import { garbageRules } from "../config/garbageRules";

export type GarbageRules = typeof garbageRules;
export type TrashType = GarbageRules[keyof GarbageRules][number];
export const allTrashTypes: TrashType[] = Array.from(
  new Set(
    Object.values(garbageRules).flat()
  )
)
export function getWeekdayName(date: Date): keyof typeof garbageRules {
  const days = ["日", "月", "火", "水", "木", "金", "土"] as const;
  return days[date.getDay()];
}

export function getGarbageTypesFor(date: Date):  TrashType[] {
  const weekday = getWeekdayName(date);

  if (!(weekday in garbageRules))  {
    throw new Error(`不正な曜日キー: ${weekday}`);
  }
  return [...garbageRules[weekday]];
}


export function getTodayGarbage(): string[] {
  return getGarbageTypesFor(new Date());
}

export function getNextDisposalDate(garbageType: TrashType, fromDate = new Date()): Date | null {
  for (let i = 0; i < 14; i++) {
    const date = new Date(fromDate);
    date.setDate(fromDate.getDate() + i);

    const types = getGarbageTypesFor(date);
    if (types.includes(garbageType)) return date;

  }
  return null; // 該当なし（14日後までみる)
}
