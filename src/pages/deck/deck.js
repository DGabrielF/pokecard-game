import { CardArea } from "../../components/card_area/card_area.js";
import { HandCards } from "../../components/on_hand/on_hand.js";
import { PageMenu } from "../../components/page_menu/page_menu.js";
import { PokeCard } from "../../components/poke_card/poke_card.js";
import { createSearchArea } from "../../components/search/search.js";
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
  }
}



export function deck() {
  const body = document.querySelector("body");

  // loading settings
  

  ViewService.cleanSectionToNewPage()

  const deckPage = document.createElement("section");
  deckPage.id = "deck_page";
  body.appendChild(deckPage);

  const searchArea =  createSearchArea()
  deckPage.appendChild(searchArea)
  const bulbasaur = {
    id: 1,
    name: "bulbasaur",
    "types": [
      {
        "slot": 1,
        "type": {
          "name": "grass",
          "url": "https://pokeapi.co/api/v2/type/12/"
        }
      },
      {
        "slot": 2,
        "type": {
          "name": "poison",
          "url": "https://pokeapi.co/api/v2/type/4/"
        }
      }
    ],
    sprites: {
      other: {
        dream_world:{
          front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
        }
      },
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
    },
    stats: [
      {
        "base_stat": 45,
        "effort": 0,
        "stat": {
          "name": "hp",
          "url": "https://pokeapi.co/api/v2/stat/1/"
        }
      },
      {
        "base_stat": 49,
        "effort": 0,
        "stat": {
          "name": "attack",
          "url": "https://pokeapi.co/api/v2/stat/2/"
        }
      },
      {
        "base_stat": 49,
        "effort": 0,
        "stat": {
          "name": "defense",
          "url": "https://pokeapi.co/api/v2/stat/3/"
        }
      },
      {
        "base_stat": 65,
        "effort": 1,
        "stat": {
          "name": "special-attack",
          "url": "https://pokeapi.co/api/v2/stat/4/"
        }
      },
      {
        "base_stat": 65,
        "effort": 0,
        "stat": {
          "name": "special-defense",
          "url": "https://pokeapi.co/api/v2/stat/5/"
        }
      },
      {
        "base_stat": 45,
        "effort": 0,
        "stat": {
          "name": "speed",
          "url": "https://pokeapi.co/api/v2/stat/6/"
        }
      }
    ],
    "height": 7,
    "weight": 69,
  }
  for (let i = 0; i < 1; i++) {
    const pokemon = new PokeCard(bulbasaur, state.settings)
    const pokemonCard = pokemon.create()
    pokemonCard.addEventListener("dblclick", () => {
      const isInHand = localState.cardArray.hand.some(card => card.id === pokemonCard.id)
      if (!isInHand) {
        const index = localState.cardArray.toShow.findIndex(objeto => objeto.id === pokemonCard.id);
        if (index !== -1) {
          const selectedCard = localState.cardArray.toShow.splice(index, 1)[0];
          localState.cardArray.hand.push(selectedCard);
        }
      } else {
        const index = localState.cardArray.hand.findIndex(objeto => objeto.id === pokemonCard.id);
        if (index !== -1) {
          const selectedCard = localState.cardArray.hand.splice(index, 1)[0];
          localState.cardArray.toShow.push(selectedCard);
        }
      }
      cardAreaObj.update(localState.cardArray.toShow, localState.cardArray.toShow.length);
      handCardsObj.update(localState.cardArray.hand)
    })
    localState.cardArray.memory.push(pokemonCard);
  }

  const cardAreaObj = new CardArea(localState.cardArray.toShow);
  const cardArea = cardAreaObj.create();
  cardArea.style.height = `calc(100% - 44px - 40px - 32px - ${state.settings.card.sizes[state.settings.card.sizeSelected].height}px - 5px - 12px)`
  deckPage.appendChild(cardArea);

  const pageMenu = new PageMenu(localState.pagesMenu.toShow);
  deckPage.appendChild(pageMenu.create());

  const handCardsObj = new HandCards()
  const onHandCardsArea = handCardsObj.create(localState.cardArray.hand, state)
  
  deckPage.appendChild(onHandCardsArea)
  
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const maxChildrens = localState.card.limit;
      setElementWidth(entry);

      localState.grid.columns = cardAreaObj.getColumnsNumber(localState.cardArea.width, state.settings.card.sizes[state.settings.card.sizeSelected].width);

      const style = window.getComputedStyle(entry.target);
      if (style) {
        setElementMaxWidth(entry);

        localState.grid.rows = cardAreaObj.getRowsNumber(localState.cardArea.maxHeight, state.settings.card.sizes[state.settings.card.sizeSelected].height);
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