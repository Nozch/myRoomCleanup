import { getTrashItems } from "./trashStorage";

export function renderTrashHistory() {
  const container = document.getElementById("trash-history-view");
  if (!container) return;

  container.innerHTML = "";

  const items = getTrashItems();
  if (items.length === 0)  {
    container.textContent = "保存されたゴミはありません";
    return;
  }

  items
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt)) // 新しい順
    .forEach((item) => {
      const card = document.createElement("div");
      card.className = "trash-card";
      card.innerHTML = `
      <strong>${item.name}</strong> (${item.type}) <br />
      登録日: ${new Date(item.addedAt).toLocaleDateString("ja-JP"), {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }}}
      `;
      container.appendChild(card);
    })
}