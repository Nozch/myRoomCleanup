import type { TrashItem } from "./trashTypes";

const STORAGE_KEY = "trashItems";

export function getTrashItems(): TrashItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as TrashItem[];
  } catch {
    console.warn("🛑 trashItems の読み込みに失敗しました");
    return [];
  }
}

export function saveTrashItem(item: TrashItem): void {
  const current = getTrashItems();
  const updated = [...current, item];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearTrashItems(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function deleteTrashItem(id: string): void {
  const current = getTrashItems();
  const updated = current.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
