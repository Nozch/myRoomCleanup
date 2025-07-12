import { searchTrashTypeByName } from "../logic/wikiSearch";
import type { TrashType } from "../logic/garbageUtils";

export function setupWikiSearch() {
  const input = document.getElementById("wiki-search-input") as HTMLInputElement;
  const resultContainer = document.getElementById("wiki-search-results")!;

  input?.addEventListener("input", () => {
    const query = input.value.trim();
    resultContainer.innerHTML = "";

    if (!query) return;

    const candidates: TrashType[] = searchTrashTypeByName(query);

    if (candidates.length === 0) {
      resultContainer.textContent = "候補が見つかりません";
      return;
    }

    candidates.forEach((type) => {
      const div = document.createElement("div");
      div.textContent = `候補: ${type}`;
      resultContainer.appendChild(div);
    });
  });
}