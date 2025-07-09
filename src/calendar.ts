function getNext14Days(): { label: string, date: string }[] {
  const result = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // const weekdays = ["日", "月", "火", "水", "木", "金", "土"]
    // const label = `${date.getMonth() + 1}/${date.getDate()} (${weekdays[date.getDay()]})`;
    const label = `${date.getMonth() + 1}/${date.getDate()}`
    const iso = date.toISOString().split('T')[0]; // 例: 2025-06-30
    result.push({ label, date: iso });
  }

  return result;
}

export function renderCalendar() {
  console.log("render calendar called")
  const calendarGrid = document.getElementById("calendar-grid");
  if (!calendarGrid) return;

  // 前の内容をクリアする(発動のたびに14日追加しないように) 
  calendarGrid.innerHTML = '';

  const days = getNext14Days();
  for (const day of days) {
    const dayEl = document.createElement("div");
    dayEl.className = "calendar-day";

    const labelEl = document.createElement("div");
    labelEl.className = "date-label";
    labelEl.textContent = day.label;

    dayEl.appendChild(labelEl);

    // 仮に偶数日だけゴミ出しマークを出す
    if (parseInt(day.date.split("-")[2]) % 2 === 0) {
      const dot = document.createElement("div");
      dot.className = "trash-dot";
      dayEl.appendChild(dot);
    }

    calendarGrid.appendChild(dayEl);
  }
}


