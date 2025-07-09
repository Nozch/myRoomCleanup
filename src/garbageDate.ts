import { getNextDisposalDate } from "./logic/garbageUtils";

document.getElementById("trash-type")?.addEventListener("change", (e) => {
  const selectedType = (e.target as HTMLSelectElement).value;
  const infoEl = document.getElementById("next-disposal-info");

  if (!selectedType || !infoEl) return;

  const nextDate = getNextDisposalDate(selectedType);

  if (nextDate) {
    infoEl.textContent = `出せる日：${nextDate.toLocaleDateString("ja-JP", {
      weekday: "short",
      month: "2-digit",
      day: "2-digit",
    })}`;
  } else {
    infoEl.textContent = "出せる日：見つかりません";
  }
});
