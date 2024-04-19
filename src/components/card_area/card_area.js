import { ViewService } from "../../services/view.js";

export class CardArea{
  constructor(elementsArray) {
    this.elementsArray = elementsArray;
    this.cardArea = document.createElement("div");
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
}