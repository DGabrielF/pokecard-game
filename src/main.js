import { PokeCard } from "./components/poke_card/poke_card.js";
import { TopMenu } from "./components/top_menu/top_menu.js";
import { pokedex } from "./pages/pokedex/pokedex.js";
import { shop } from "./pages/shop/shop.js";
import { state } from "./services/state.js"

export function pageHub(pageSlug) {
  if (state.pages.current)
  state.pages.previous.push(state.pages.current)
  state.pages.current = pageSlug;
  const switchPage = state.pages.list.find(page => page.name == state.pages.current)
  if (switchPage) {
    switchPage.function()
  }
}

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
async function init() {
  const topMenu = new TopMenu(state).create()
  pageHub(state.pages.current)
  shop()
}

init()