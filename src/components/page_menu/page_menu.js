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
    const previousButton = document.createElement("button");
    previousButton.classList.add("previous_page_menu_button")
    const previous = document.createElement("img");
    previous.src = "src/assets/icons/caret-left.svg";
    previousButton.appendChild(previous)
    this.pageMenu.appendChild(previousButton);
    
    array.forEach(page => {
      const button = document.createElement("button");
      button.classList.add("page_menu_button")
      button.id = page;
      button.disabled = (button.id == this.currentPage)
      button.textContent = page;
      this.pageMenu.appendChild(button);
    });
    
    const nextButton = document.createElement("button");
    nextButton.classList.add("next_page_menu_button")
    const next = document.createElement("img");
    next.src = "src/assets/icons/caret-right.svg";
    nextButton.appendChild(next);
    this.pageMenu.appendChild(nextButton);
  }

  update(newArray, currentPage) {
    this.pageMenu.innerHTML = "";
    this.currentPage = currentPage
    this.updateElements(newArray);
  }

  setPagesMenuButtons(areaWidth, buttonWidth, gapBetweenButtons) {
    const previouAndNextButtons = 2 * buttonWidth + gapBetweenButtons;
    const buttonWidthWithGap = buttonWidth + gapBetweenButtons
  
    const buttonsNumber = (areaWidth - previouAndNextButtons ) / (buttonWidthWithGap);
  
    return Math.floor(buttonsNumber)
  }

  setRangeOfButtons(totalOfButtons, limitOfButtons, currentButton) {
    const toShow = [];
    if (totalOfButtons < limitOfButtons){
      for (let i = 1; i <= totalOfButtons; i++) {
        toShow.push(i)
      }
    } else {
      const buttonRange = Math.floor(limitOfButtons/2)
  
      const topLimit = currentButton + buttonRange
      const bottomLimit = currentButton - buttonRange
  
      let initial = (bottomLimit < 1)? 1 : (topLimit > totalOfButtons) ? totalOfButtons: topLimit;
      let increment = (bottomLimit < 1) ? 1 : -1;
  
      while (toShow.length < limitOfButtons) {
        if (initial > 0 && initial <= totalOfButtons) {
          toShow.push(initial)
          initial += increment
        }
      }
      toShow.sort((a, b) => a - b)
    }
    return toShow
  }
}