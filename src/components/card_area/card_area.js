export class CardArea{
  constructor(elementsArray) {
    this.elementsArray = elementsArray;
    this.childWidth = 193;
    this.childHeight = 260;
    this.maxChildrens = 2
  }

  create() {
    const cardArea = document.createElement("div");
    cardArea.classList.add("card_area");

    for (let child = 0; child < this.maxChildrens; child++) {
      cardArea.appendChild(this.elementsArray[child])
    }
    
    this.resizeObserver.observe(cardArea);
    return cardArea
  }

  resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const currentWidth = entry.contentRect.width;
      const columnsNumber = Math.floor(currentWidth/this.childWidth)
      entry.target.style.gridTemplateColumns = `repeat(${columnsNumber}, auto)`;
      const style = window.getComputedStyle(entry.target);
      if (style) {
        let currentHeight = style.getPropertyValue('max-height').match(/\d+/g).map(Number)[0]
        if (currentHeight) {
          currentHeight
        }
        const rowsNumber = Math.floor(currentHeight/this.childHeight)
        entry.target.style.gridTemplateRowns = `repeat(${rowsNumber}, auto)`;
        this.maxChildrens = columnsNumber * rowsNumber;
        const cardArea = document.querySelector(".card_area");
        cardArea.innerHTML = ""
        for (let child = 0; child < this.maxChildrens; child++) {
          if (child<this.elementsArray.length) {
            cardArea.appendChild(this.elementsArray[child])
          }
        }
      }
    }
  });
}