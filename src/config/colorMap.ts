import type { TrashType } from "../logic/garbageUtils";

export const trashColorMap: Record<TrashType, string> = {
  "可燃ごみ": "orangered",
  "古紙": "saddlebrown",
  "ペットボトル": "mediumseagreen",
  "びん": "royalblue",
  "かん": "gray",
  "プラ": "mediumorchid",
};
