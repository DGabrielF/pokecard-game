import { ViewService } from "../../services/view.js";

export class CardArea{
  constructor(elementsArray) {
    this.elementsArray = elementsArray;
    this.cardArea = document.createElement("div");
    this.cardLimit = 1;
  }

  create() {
    this.cardArea.classList.add("card_area");
    ViewService.injectChilds(this.cardArea, this.elementsArray, this.elementsArray.length)
   
    return this.cardArea
  }

  update(newArray, length) {
    this.cardArea.innerHTML = "";
    ViewService.injectChilds(this.cardArea, newArray, length)
  }

  getColumnsNumber(cardAreaWidth, cardSizeSelectedWidth) {
    return Math.floor(cardAreaWidth / cardSizeSelectedWidth)
  }

  getRowsNumber(cardAreaHeight, cardSizeSelectedHeight) {
    return Math.floor(cardAreaHeight / cardSizeSelectedHeight)
  }

  getMaxChildrens(columns, rows) {
    return columns * rows;
  }

  setGridTemplateStyle(columns, rows){
    this.cardArea.style.gridTemplateColumns = `repeat(${columns}, auto)`
    this.cardArea.style.gridTemplateRowns = `repeat(${rows}, auto)`
  }

  getItemsToShow(currentPage, childrenLimit, arrayOfChildrens) {
    const firstElement = childrenLimit * (currentPage - 1)
    const lastElement = childrenLimit * currentPage
    return arrayOfChildrens.slice(firstElement, lastElement);
  }

  setPagesNumber(completeArray, arrayLimit) {
    const reminder = completeArray.length % arrayLimit;
    const whole = Math.floor(completeArray.length / arrayLimit)
    return reminder == 0 ? whole : whole + 1;
  }
}