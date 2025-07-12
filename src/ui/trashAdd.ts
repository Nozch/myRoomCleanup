import { allTrashTypes } from "../logic/garbageUtils";
import type { TrashType } from "../logic/garbageUtils";
import { generateUUID } from "../utils/uuid";
import { saveTrashItem } from "../logic/trashStorage";
import type { TrashItem } from "../config/trashTypes";

function polulateTrashTypeSelect() {
  const select = document.getElementById("trash-type") as HTMLSelectElement;
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "-- ゴミの種類を選択 --";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  allTrashTypes.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    select.appendChild(option);
  });
}

export function setUpTrashUi() {
  polulateTrashTypeSelect();
  const form = document.getElementById("add-trash-form") as HTMLFormElement;
  const typeSelect = document.getElementById("trash-type") as HTMLSelectElement;
  const nameInput = document.getElementById("trash-name") as HTMLInputElement;
  const noteInput = document.getElementById("trash-note") as HTMLInputElement;

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const type = typeSelect.value as TrashType;
    const memo = noteInput.value.trim();

    if (!name || !type) {
      alert("ゴミの名前と種類は必須です");
      return;
    }

    const item: TrashItem = {
      id: generateUUID(),
      name,
      type,
      memo: memo || undefined,
      addedAt: new Date().toISOString(),
    };

    saveTrashItem(item);
    alert("保存しました");

    nameInput.value = "";
    typeSelect.selectedIndex = 0;
    noteInput.value = "";
  });
}
