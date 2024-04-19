import { CardArea } from "../../components/card_area/card_area.js";
import { PageMenu } from "../../components/page_menu/page_menu.js";
import { createSearchArea } from "../../components/search/search.js";
import { ViewService } from "../../services/view.js";

const localState = {
  cardArray: {
    memory: [],
    toShow: [],
  },
  cardArea: {
    width: 1,
    maxHeight: 1
  },
  card: {
    width: 193,
    height: 260,
    limit: 1,
  },
  grid: {
    columns: 1,
    rows: 1,
  },
  page: {
    current: 1,
    range: 1,
    total: 1,
  },
  pagesMenu:{
    toShow: [],
    button:{
      width: 28,
      height: 28,
      limit: 1,
    },
    gap: {
      row: 5,
      column: 5,
    }
  }
}

export function pokedex() {
  const body = document.querySelector("body");

  ViewService.cleanSectionToNewPage()

  const pokedexPage = document.createElement("section");
  pokedexPage.id = "pokedex_page";
  body.appendChild(pokedexPage);

  const searchArea =  createSearchArea()
  pokedexPage.appendChild(searchArea)

  for (let i = 0; i < 20; i++) {
    const div = document.createElement("div");
    div.classList.add("poke_card");
    div.textContent = i;
    localState.cardArray.memory.push(div);
  }

  const cardAreaObj = new CardArea(localState.cardArray.toShow);
  const cardArea = cardAreaObj.create();
  pokedexPage.appendChild(cardArea);

  const pageMenu = new PageMenu(localState.pagesMenu.toShow);
  pokedexPage.appendChild(pageMenu.create());
  
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const maxChildrens = localState.card.limit;
      setElementWidth(entry);
      updateColumnsNumber();
      const style = window.getComputedStyle(entry.target);
      if (style) {
        setElementMaxWidth(entry);
        updateRowsNumber();
      }
      updateMaxChildrens();
      
      if (localState.card.limit !== maxChildrens) {
        setGridTemplateStyle(entry);
        setPagesNumber();

        updateAllContent(cardAreaObj, pageMenu);
      }
    }
  });
  resizeObserver.observe(cardArea)
}

function updateAllContent(cardAreaObj, pageMenu) {
  setItemsToShow();
  cardAreaObj.update(localState.cardArray.toShow, localState.cardArray.toShow.length);

  setPagesMenuButtons();
  setRangeOfButtons();
  pageMenu.update(localState.pagesMenu.toShow, localState.page.current);
  const previousPageButton = document.querySelector(".previous_page_menu_button");
  previousPageButton.disabled = (localState.page.current <= 1)
  if (localState.page.current > 1) {
    previousPageButton.addEventListener("click", () => {
      localState.page.current = localState.page.current - 1 >= 1 ? localState.page.current - 1 : 1;
      updateAllContent(cardAreaObj, pageMenu)
    })
  }
  addEventListenerToPageMenuButtons(cardAreaObj, pageMenu);
  const nextPageButton = document.querySelector(".next_page_menu_button");
  nextPageButton.disabled = (localState.page.current >= localState.page.total)
  if (localState.page.current < localState.page.total) {
    nextPageButton.addEventListener("click", () => {
      localState.page.current = localState.page.current + 1 <= localState.page.total ? localState.page.current + 1 : localState.page.total;
      updateAllContent(cardAreaObj, pageMenu)
    })
  }
}

function setItemsToShow() {
  const firstElement = localState.card.limit * (localState.page.current - 1)
  const lastElement = localState.card.limit * localState.page.current
  localState.cardArray.toShow = localState.cardArray.memory.slice(firstElement, lastElement);
}

function setElementWidth(element) {
  localState.cardArea.width = element.contentRect.width;
}

function updateColumnsNumber() {
  localState.grid.columns = Math.floor(localState.cardArea.width/localState.card.width)
}

function setElementMaxWidth(element) {
  const style = window.getComputedStyle(element.target)
  if (style) {
    if (style.getPropertyValue('max-height').match(/\d+/g)) {
      localState.cardArea.maxHeight = style.getPropertyValue('max-height').match(/\d+/g).map(Number)[0];
    }
  }
}

function setGridTemplateStyle(element) {
  element.target.style.gridTemplateColumns = `repeat(${localState.grid.columns}, auto)`;
  element.target.style.gridTemplateRowns = `repeat(${localState.grid.rows}, auto)`;
}

function updateRowsNumber() {
  localState.grid.rows = Math.floor(localState.cardArea.maxHeight/localState.card.height)
}

function updateMaxChildrens() {
  localState.card.limit = localState.grid.columns * localState.grid.rows;
}

function setPagesNumber() {
  const reminder = localState.cardArray.memory.length % localState.card.limit;
  const whole = Math.floor(localState.cardArray.memory.length / localState.card.limit)
  localState.page.total = reminder == 0 ? whole : whole + 1;
}

function setPagesMenuButtons() {
  const widthOfPreviousAndNextButtonsWithGap = 2 * localState.pagesMenu.button.width + localState.pagesMenu.gap.row;
  const buttonWidthWithGap = localState.pagesMenu.button.width + localState.pagesMenu.gap.row

  const buttonsNumber = (localState.cardArea.width - widthOfPreviousAndNextButtonsWithGap ) / (buttonWidthWithGap);

  localState.pagesMenu.button.limit = Math.floor(buttonsNumber)
}

function setRangeOfButtons() {
  localState.pagesMenu.toShow = [];
  if (localState.page.total < localState.pagesMenu.button.limit){
    for (let i = 1; i <= localState.page.total; i++) {
      localState.pagesMenu.toShow.push(i)
    }
  } else {
    const buttonRange = Math.floor(localState.pagesMenu.button.limit/2)

    const topLimit = localState.page.current + buttonRange
    const bottomLimit = localState.page.current - buttonRange

    let initial = (bottomLimit < 1)? 1 : (topLimit > localState.page.total) ? localState.page.total: topLimit;
    let increment = (bottomLimit < 1) ? 1 : -1;

    while (localState.pagesMenu.toShow.length < localState.pagesMenu.button.limit) {
      if (initial > 0 && initial <= localState.page.total) {
        localState.pagesMenu.toShow.push(initial)
        initial += increment
      }
    }
    localState.pagesMenu.toShow.sort((a, b) => a - b)
  }
}

function addEventListenerToPageMenuButtons(cardAreaObj, pageMenu) {
  const pageButtons = document.querySelectorAll(".page_menu_button");
  pageButtons.forEach(button => {
    button.addEventListener("click", () => {
      localState.page.current = button.id;
      updateAllContent(cardAreaObj, pageMenu)
    });
  });
}