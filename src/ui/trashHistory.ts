import { getTrashItems } from "../logic/trashStorage";
import type { TrashItem } from "../config/trashTypes";

function createTrashCard(item: TrashItem): HTMLElement {
  const div = document.createElement("div");
  div.className = "trash-card";

  const formattedDate = new Date(item.addedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  div.innerHTML = `
    <strong>${item.name}</strong> (${item.type}) <br />
    登録日: ${formattedDate}
  `;
  return div;
}

export function renderTrashHistory() {
  const container = document.getElementById("trash-history-view");
  if (!container) return;

  container.innerHTML = "";
  const items = getTrashItems();
  if (items.length === 0) {
    container.textContent = "保存されたゴミはありません";
    return;
  }

  items
    .sort(
      (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    )
    .forEach((item) => {
      container.appendChild(createTrashCard(item));
    });
}
