import { hihgtlightSelectedDayForDate, renderCalendar } from "./ui/calendar";

import "./styles/base.css";
import "./styles/layout.css";
import "./styles/calendar.css";
import "./styles/trash-add.css";
import "./styles/trash-history.css";

import { renderTrashHistory } from "./ui/trashHistory.ts";
import { setUpTrashUi } from "./ui/trashAdd.ts";
import { setupWikiSearch } from "./ui/wikiSearch.ts";
import { allTrashTypes, getNextDisposalDate } from "./logic/garbageUtils";
import { renderCalendarDetail } from "./ui/calaendarDetail.ts";

document.addEventListener("DOMContentLoaded", () => {
  setupSidebarListeners();
  setUpTrashUi();
  setupWikiSearch();
});


const viewInitStatus = new Set<string>();

function showView(viewId: string) {

  const views = document.querySelectorAll(".view");
  views.forEach((view) => {
    (view as HTMLElement).style.display = "none";
  });

  const el = document.getElementById(viewId);
  if (el) el.style.display = "block";
  if (!viewInitStatus.has(viewId)) {
    if (viewId === "add-trash-view")  {
      setupInputBlinking();
      setupSelectBlinking();
    }
  }
  // カレンダーが表示されたら初期化
  if (viewId === "calendar-view") {
    renderCalendar();
    initCalendarDefaultSelection();
  }

  if (viewId === "trash-history-view") {
    renderTrashHistory();
  }
}

function setupSidebarListeners() {
  const viewkeys = ["calendar", "wiki", "add-trash", "trash-history"] as const 
  viewkeys.forEach((key) => {
    const selector = `[data-view="${key}"]`;
    const el = document.querySelector(selector);

    if (!el) {
      throw new Error(`サイドバーに${selector}が存在しません`);
    }

    el.addEventListener("click", () => {
      showView(`${key}-view`)
    })
  })
}
function getRequiredInput(name: string): HTMLInputElement {
  const el = document.querySelector(`input[name="${name}"]`);
  if (!el) throw new Error(`Input要素が見つかりません: ${name}`);
  return el as HTMLInputElement;
}

function getRequiredSelect(name: string): HTMLSelectElement {
  const el = document.querySelector(`select[name="${name}"]`);
  if (!el) throw new Error(`Select要素が見つかりません: ${name}`);
  return el as HTMLSelectElement;
}

function setupInputBlinking() {
  const trashName = getRequiredInput("trashName");
  const trashNote = getRequiredInput("trashNote");
  const labelTrashName = trashName.closest("label")?.querySelector(".field-label");
  const labelTrashNote = trashNote.closest("label")?.querySelector(".field-label");

  if (!labelTrashName || !labelTrashNote) {
    throw new Error("input要素に対応するlabel要素が見つかりません.")
  }

  trashName.addEventListener("focus", () => {
    labelTrashName.classList.add("blinking");
  });

  trashName.addEventListener("blur", () => {
    labelTrashName.classList.remove("blinking");
  });

  trashNote.addEventListener("focus", () => {
    labelTrashNote.classList.add("blinking");
  });

  trashNote.addEventListener("blur", () => {
    labelTrashNote.classList.remove("blinking");
  });
}

function setupSelectBlinking() {
  const select = getRequiredSelect("trashType");

  const label = select?.closest("label")?.querySelector(".field-label");

  if (!label) {
    throw new Error("select[name='trashType']に対応するlabel要素が見つかりません")
  }
  select.addEventListener("focus", () => {
    label.classList.add("blinking");
  });
  select.addEventListener("blur", () => {
    label.classList.remove("blinking");
  });
}

function initCalendarDefaultSelection() {
  const today = new Date();
  for (const type of allTrashTypes) {
    const next = getNextDisposalDate(type, today);
    if (next) {
      renderCalendarDetail(next);
      hihgtlightSelectedDayForDate;
      break;
    }
  }
}

