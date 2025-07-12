import { trashColorMap } from "../config/colorMap";
import { getGarbageTypesFor, type TrashType } from "../logic/garbageUtils";
import { renderCalendarDetail } from "./calaendarDetail.ts";

function getNext14Days(): { label: string; date: Date }[] {
  const result = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const label = `${date.getMonth() + 1}/${date.getDate()}`;
    result.push({ label, date });
  }

  return result;
}

export function renderCalendar() {
  console.log("render calendar called");
  const calendarGrid = document.getElementById("calendar-grid");
  if (!calendarGrid) return;

  // 前の内容をクリアする(発動のたびに14日追加しないように)
  calendarGrid.innerHTML = "";

  const days = getNext14Days();
  console.log("next 14 days", days);
  for (const day of days) {
    console.log("day", day.label, day.date);
    const dayEl = document.createElement("div");
    dayEl.className = "calendar-day";

    const labelEl = document.createElement("div");
    labelEl.className = "date-label";
    labelEl.textContent = day.label;

    dayEl.appendChild(labelEl);

    const wrapper = document.createElement("div");
    wrapper.className = "trash-dots-wrapper";

    const types = getGarbageTypesFor(day.date);
    if (types.length > 0) {
      const dotContainer = document.createElement("div");
      dotContainer.className = "trash-dots";

      types.forEach((type: TrashType) => {
        const dot = document.createElement("span");
        dot.className = "trash-dot";
        dot.style.backgroundColor = trashColorMap[type] ?? "black";
        dotContainer.appendChild(dot);
      });
      wrapper.appendChild(dotContainer);
      dayEl.appendChild(wrapper);
    }

    calendarGrid.appendChild(dayEl);
  }

  setupCalendarSelectionHandlers();
}

export function hihgtlightSelectedDayForDate(targetDate: Date) {
  const allDays = document.querySelectorAll(".calendar-day");
  const dayList = getNext14Days();

  allDays.forEach((el, i) => {
    const d = dayList[i].date;
    if (d.toDateString() === targetDate.toDateString()) {
      el.classList.add("selected");
    } else {
      el.classList.remove("selected");
    }
  });
}

function setupCalendarSelectionHandlers() {
  const allDays = document.querySelectorAll(".calendar-day");
  const dates = getNext14Days();

  allDays.forEach((el, i) => {
    el.addEventListener("click", () => {
      allDays.forEach((e) => e.classList.remove("selected"));
      el.classList.add("selected");

      const date = dates[i].date;
      renderCalendarDetail(date);
    });
  });
}
