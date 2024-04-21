import { ViewService } from "../../services/view.js";

export class HandCards{
  constructor () {
    this.handCards = document.createElement("div");
  }

  create(cards, cardsHeight) {
    const onHandCardsArea = document.createElement("div");
    onHandCardsArea.classList.add("on_hand_area");
  
    const title = document.createElement("h3");
    title.textContent = "Suas cartas"
    onHandCardsArea.appendChild(title);
  
    this.handCards.classList.add("hand_cards");
    this.handCards.style.height = `${cardsHeight + 10}px`

    if (cards.length > 0) {
      ViewService.injectChilds(this.handCards, cards, cards.length)
    } else {
      const span = document.createElement("span");
      span.textContent = "Você ainda não selecionou cartas para duelar";
      this.handCards.appendChild(span);
    }
    
    onHandCardsArea.appendChild(this.handCards);
    
    // console.log(array)
    return onHandCardsArea
  }
  
  update(cards) {
    this.handCards.innerHTML = ""
    if (cards.length > 0) {
      ViewService.injectChilds(this.handCards, cards, cards.length)
    } else {
      this._emptyHandMessage();
    }
  }

  _emptyHandMessage() {
    const span = document.createElement("span");
    span.textContent = "Você ainda não selecionou cartas para duelar";
    this.handCards.appendChild(span);
  }
}