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
  setupWikiSearch();
});

function showView(viewId: string) {
  const views = document.querySelectorAll(".view");
  views.forEach((view) => {
    if ((view as HTMLElement).id === viewId) {
      (view as HTMLElement).style.display = "block";
    } else {
      (view as HTMLElement).style.display = "none";
    }
  });

  // カレンダーが表示されたら初期化
  if (viewId === "calendar-view") {
    renderCalendar();
  }

  if (viewId === "trash-history-view") {
    renderTrashHistory();
  }
}

function setupSidebarListeners() {
  const calendarBtn = document.querySelector('[data-view="calendar"]');
  const wikiBtn = document.querySelector('[data-view="wiki"]');
  const addTrashBtn = document.querySelector('[data-view="add-trash"]');
  const trashHistoryBtn = document.querySelector('[data-view="trash-history"');

  calendarBtn?.addEventListener("click", () => {
    showView("calendar-view");
  });

  wikiBtn?.addEventListener("click", () => {
    showView("wiki-view");
  });

  addTrashBtn?.addEventListener("click", () => {
    showView("add-trash-view");
  });

  trashHistoryBtn?.addEventListener("click", () => {
    showView("trash-history-view");
  });
}

function setupInputBlinking() {
  const inputTrashName = document.querySelector<HTMLInputElement>(
    'input[name="trashName"]'
  );
  const labelTrashName = inputTrashName
    ?.closest("label")
    ?.querySelector(".field-label");

  inputTrashName?.addEventListener("focus", () => {
    labelTrashName?.classList.add("blinking");
  });

  inputTrashName?.addEventListener("blur", () => {
    labelTrashName?.classList.remove("blinking");
  });

  const inputTrashNote = document.querySelector<HTMLInputElement>(
    'input[name="trashNote"'
  );
  const labelTrashNote = inputTrashNote
    ?.closest("label")
    ?.querySelector(".field-label");

  inputTrashNote?.addEventListener("focus", () => {
    labelTrashNote?.classList.add("blinking");
  });

  inputTrashNote?.addEventListener("blur", () => {
    labelTrashNote?.classList.remove("blinking");
  });
}

function setupSelectBlinking() {
  const select = document.querySelector<HTMLSelectElement>(
    'select[name="trashType"]'
  );
  const selectLabel = select?.closest("label")?.querySelector(".field-label");

  select?.addEventListener("focus", () => {
    selectLabel?.classList.add("blinking");
  });
  select?.addEventListener("blur", () => {
    selectLabel?.classList.remove("blinking");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setUpTrashUi();
});

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
setupSidebarListeners();
setupInputBlinking();
setupSelectBlinking();
initCalendarDefaultSelection();
