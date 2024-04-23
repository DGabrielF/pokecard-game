import { CardArea } from "../../components/card_area/card_area.js";
import { PageMenu } from "../../components/page_menu/page_menu.js";
import { createSearchArea } from "../../components/search/search.js";
import { state } from "../../services/state.js";
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
  cardArea.style.height = `calc(100vh - 44px - 40px - 44px)`;
  pokedexPage.appendChild(cardArea);

  const pageMenu = new PageMenu(localState.pagesMenu.toShow);
  pokedexPage.appendChild(pageMenu.create());
  
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const maxChildrens = localState.card.limit;
      setElementWidth(entry);

      localState.grid.columns = cardAreaObj.getColumnsNumber(localState.cardArea.width, state.settings.card.options[state.settings.card.optionSelected].width);

      const style = window.getComputedStyle(entry.target);
      if (style) {
        setElementMaxWidth(entry);

        localState.grid.rows = cardAreaObj.getRowsNumber(localState.cardArea.maxHeight, state.settings.card.options[state.settings.card.optionSelected].height);
      }

      localState.card.limit = cardAreaObj.getMaxChildrens(localState.grid.columns, localState.grid.rows);
      
      if (localState.card.limit !== maxChildrens) {
        cardAreaObj.setGridTemplateStyle(localState.grid.columns, localState.grid.rows)

        localState.page.total = cardAreaObj.setPagesNumber(localState.cardArray.memory, localState.card.limit);

        updateAllContent(cardAreaObj, pageMenu);
      }
    }
  });
  resizeObserver.observe(cardArea)
}

function updateAllContent(cardAreaObj, pageMenu) {
  localState.cardArray.toShow = cardAreaObj.getItemsToShow(localState.page.current, localState.card.limit, localState.cardArray.memory);

  cardAreaObj.update(localState.cardArray.toShow, localState.cardArray.toShow.length);

  localState.pagesMenu.button.limit = pageMenu.setPagesMenuButtons(localState.cardArea.width, localState.pagesMenu.button.width, localState.pagesMenu.gap.row);

  localState.pagesMenu.toShow = pageMenu.setRangeOfButtons(localState.page.total, localState.pagesMenu.button.limit, localState.page.current);

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
  nextPageButton.disabled = (localState.page.current <= 1)
  if (localState.page.current < localState.page.total) {
    nextPageButton.addEventListener("click", () => {
      localState.page.current = localState.page.current + 1 <= localState.page.total ? localState.page.current + 1 : localState.page.total;
      updateAllContent(cardAreaObj, pageMenu)
    })
  }
}

function setElementWidth(element) {
  localState.cardArea.width = element.contentRect.width;
}

function setElementMaxWidth(element) {
  localState.cardArea.maxHeight = element.contentRect.height;
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