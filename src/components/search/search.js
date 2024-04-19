export function createSearcArea() {
  const searchArea = document.createElement("div");
  searchArea.classList.add("search_area");

  const span = document.createElement("span");
  span.textContent = "buscar";
  searchArea.appendChild(span);

  const icon = document.createElement("img");
  icon.src = "src/assets/icons/search.svg";
  icon.alt = "magnifying glass"
  searchArea.appendChild(icon);

  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("search_input")
  input.placeholder="nome ou id do pokemon"
  searchArea.appendChild(input);

  return searchArea
}