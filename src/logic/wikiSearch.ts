import { getTrashItems } from "./trashStorage";
import type { TrashType } from "./garbageUtils";

export function searchTrashTypeByName(query: string): TrashType[] {
  const items = getTrashItems();

  const matches = items.filter((item) => 
  item.name.includes(query)
  );

  const types = matches.map((item) => item.type);
  return Array.from(new Set(types));
}