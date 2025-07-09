import type { TrashType } from "../logic/garbageUtils";

export type TrashItem = {
  id: string;
  name: string;
  type: TrashType;
  memo?: string;
  addedAt: string;
};