export class PageMenu{
  constructor(buttonsToShow, currentPage) {
    this.buttonsToShow = buttonsToShow,
    this.currentPage = currentPage
    this.pageMenu = document.createElement("div");
  }

  create() {
    this.pageMenu.classList.add("page_menu");

    
    this.updateElements(this.buttonsToShow);

    return this.pageMenu
  }

  updateElements(array) {
    const previous = document.createElement("img");
    previous.src = "src/assets/icons/caret-left.svg";
    previous.classList.add("previous_page_menu_button")
    this.pageMenu.appendChild(previous);
    
    array.forEach(page => {
      const button = document.createElement("button");
      button.classList.add("page_menu_button")
      button.id = page;
      button.disabled = (button.id == this.currentPage)
      button.textContent = page;
      this.pageMenu.appendChild(button);
    });
    
    const next = document.createElement("img");
    next.src = "src/assets/icons/caret-right.svg";
    next.classList.add("next_page_menu_button")
    this.pageMenu.appendChild(next);
  }

  update(newArray, currentPage) {
    this.pageMenu.innerHTML = "";
    this.currentPage = currentPage
    this.updateElements(newArray);
  }
}