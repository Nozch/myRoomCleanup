import { getGarbageTypesFor } from "../logic/garbageUtils";

export function renderCalendarDetail(date: Date) {
  const container = document.getElementById("calendar-detail");
  if (!container) return;

  const types = getGarbageTypesFor(date);

  container.innerHTML = `
    <h3>${date.toLocaleDateString("ja-JP")}</h3>
    <ul>
      ${types.map(type => `<li>${type}</li>`).join("")}
    </ul>
    `
}