import { CardArea } from "../../components/card_area/card_area.js";
import { HandCards } from "../../components/on_hand/on_hand.js";
import { PageMenu } from "../../components/page_menu/page_menu.js";
import { PokeCard } from "../../components/poke_card/poke_card.js";
import { createSearchArea } from "../../components/search/search.js";
import { PokeApi } from "../../services/api.js";
import { state } from "../../services/state.js";
import { ViewService } from "../../services/view.js";

const localState = {
  cardArray: {
    memory: [],
    toShow: [],
    hand: []
  },
  cardArea: {
    width: 1,
    maxHeight: 1
  },
  card: {
    width: 0,
    height: 240,
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
  },
  instances: {
    cardArea: "",
    pageMenu: "",
    handCards: "",
  }
}

export async function deck() {
  const body = document.querySelector("body");
  
  ViewService.cleanSectionToNewPage();
  
  await setHandCards();
  await setAreaCards();

  const deckPage = document.createElement("section");
  deckPage.id = "deck_page";
  body.appendChild(deckPage);

  const searchArea =  createSearchArea();
  deckPage.appendChild(searchArea);
  
  localState.instances.cardArea = new CardArea(localState.cardArray.toShow.slice(0, localState.card.limit));
  const cardArea = localState.instances.cardArea.create();
  cardArea.style.height = `calc(100% - ${state.settings.card.options[state.settings.card.optionSelected].height}px - 44px - 40px - 32px - 5px - 12px - 10px)`;
  deckPage.appendChild(cardArea);
  
  localState.instances.pageMenu = new PageMenu(localState.pagesMenu.toShow);
  deckPage.appendChild(localState.instances.pageMenu.create());
  
  localState.instances.handCards = new HandCards();
  const onHandCardsArea = localState.instances.handCards.create(localState.cardArray.hand, state);
  deckPage.appendChild(onHandCardsArea);
  
  const resizeObserver = new ResizeObserver(async entries => {
    for (let entry of entries) {
      const maxChildrens = localState.card.limit;
      setElementWidth(entry);
      
      localState.grid.columns = localState.instances.cardArea.getColumnsNumber(localState.cardArea.width, state.settings.card.options[state.settings.card.optionSelected].width);
      
      const style = window.getComputedStyle(entry.target);
      if (style) {
        setElementMaxWidth(entry);
        
        localState.grid.rows = localState.instances.cardArea.getRowsNumber(localState.cardArea.maxHeight, state.settings.card.options[state.settings.card.optionSelected].height);
      }
      
      localState.card.limit = localState.instances.cardArea.getMaxChildrens(localState.grid.columns, localState.grid.rows);
      
      if (localState.card.limit !== maxChildrens) {
        localState.instances.cardArea.setGridTemplateStyle(localState.grid.columns, localState.grid.rows)
        
        localState.page.total = localState.instances.cardArea.setPagesNumber(localState.cardArray.toShow, localState.card.limit);
        
        await setHandCards();
        await setAreaCards();
        updateAllContent();
      }
    }
  });
  resizeObserver.observe(cardArea)
}

async function setHandCards() {
  for (const card of state.user.cards.hand) {
    const storedCard = localState.cardArray.memory.find(item => Number(item.id) === Number(card.id));
    if (storedCard) {
      const onHandCard = localState.cardArray.hand.find(item => Number(item.id) === Number(storedCard.id))
      if (!onHandCard) {
        localState.cardArray.hand.push(storedCard);
      }
    } else {
      const pokeCardObj = new PokeCard(card.id, state.settings);
      const pokeCard = await pokeCardObj.create();
      pokeCard.addEventListener("dblclick", () => {
        handleCardToHand(card);
      });
      const onHandCard = localState.cardArray.hand.find(item => Number(item.id) === Number(pokeCard.id))
      if (!onHandCard) {
        localState.cardArray.hand.push(pokeCard);
      }
      localState.cardArray.memory.push(pokeCard);
    }
  }
}

async function setAreaCards() {
  const auxArray = []
  for (const card of state.user.cards.all) {
    if (!localState.cardArray.hand.some(item => Number(item.id) === card.id)) {
      auxArray.push(card)
    }
  }
  for (const card of auxArray) {
    const storedCard = localState.cardArray.memory.find(item => Number(item.id) === Number(card.id));
    if (storedCard) {
      const onHandCard = localState.cardArray.toShow.find(item => Number(item.id) === Number(storedCard.id))
      if (!onHandCard) {
        localState.cardArray.toShow.push(storedCard);
      }
    } else {
      const pokeCardObj = new PokeCard(card.id, state.settings);
      const pokeCard = await pokeCardObj.create();
      pokeCard.addEventListener("dblclick", () => {
        handleCardToHand(card);
      });
      const toShowCard = localState.cardArray.toShow.find(item => Number(item.id) === Number(pokeCard.id))
      if (!toShowCard) {
        localState.cardArray.toShow.push(pokeCard);
      }
      localState.cardArray.memory.push(pokeCard);
    }
  }
}

function handleCardToHand(pokeId) {
  const isInHand = localState.cardArray.hand.some(card => Number(card.id) === pokeId.id);
  if (isInHand) {
    const index = localState.cardArray.hand.findIndex(card => Number(card.id) === pokeId.id);
    console.log(index)
    if (index !== -1) {
      const selectedCard = localState.cardArray.hand.splice(index, 1)[0]
      localState.cardArray.toShow.push(selectedCard);
    }
  } else {
    if (localState.cardArray.hand.length < 6) {
      const index = localState.cardArray.toShow.findIndex(card => Number(card.id) === pokeId.id);
      console.log(index)
      if (index !== -1) {
        const selectedCard = localState.cardArray.toShow.splice(index, 1)[0];
        localState.cardArray.hand.push(selectedCard);
      }
    }
  }
  localState.instances.cardArea.update(localState.instances.cardArea.getItemsToShow(localState.page.current, localState.card.limit, localState.cardArray.toShow), localState.card.limit);
  localState.instances.handCards.update(localState.cardArray.hand);
}

async function updateAllContent() {
  localState.instances.cardArea.update(localState.instances.cardArea.getItemsToShow(localState.page.current, localState.card.limit, localState.cardArray.toShow), localState.card.limit);

  localState.pagesMenu.button.limit = localState.instances.pageMenu.setPagesMenuButtons(localState.cardArea.width, localState.pagesMenu.button.width, localState.pagesMenu.gap.row);

  localState.pagesMenu.toShow = localState.instances.pageMenu.setRangeOfButtons(localState.page.total, localState.pagesMenu.button.limit, localState.page.current);

  localState.instances.pageMenu.update(localState.pagesMenu.toShow, localState.page.current);

  const previousPageButton = document.querySelector(".previous_page_menu_button");
  previousPageButton.disabled = (localState.page.current <= 1)
  if (localState.page.current > 1) {
    previousPageButton.addEventListener("click", () => {
      localState.page.current = localState.page.current - 1 >= 1 ? localState.page.current - 1 : 1;
      updateAllContent()
    })
  }
  addEventListenerToPageMenuButtons(localState.instances.cardArea, );
  const nextPageButton = document.querySelector(".next_page_menu_button");
  nextPageButton.disabled = (localState.page.current <= 1)
  if (localState.page.current < localState.page.total) {
    nextPageButton.addEventListener("click", () => {
      localState.page.current = localState.page.current + 1 <= localState.page.total ? localState.page.current + 1 : localState.page.total;
      updateAllContent()
    })
  }
}

function setElementWidth(element) {
  localState.cardArea.width = element.contentRect.width;
}

function setElementMaxWidth(element) {
  localState.cardArea.maxHeight = element.contentRect.height;
}

function addEventListenerToPageMenuButtons(pageMenu) {
  const pageButtons = document.querySelectorAll(".page_menu_button");
  pageButtons.forEach(button => {
    button.addEventListener("click", () => {
      localState.page.current = button.id;
      updateAllContent(localState.instances.cardArea, pageMenu)
    });
  });
}