import { Fade } from "../components/fade/fade.js";
import { deck } from "../pages/deck/deck.js";
import { pokedex } from "../pages/pokedex/pokedex.js";
import { settings } from "../pages/settings/settings.js";
import { shop } from "../pages/shop/shop.js";
import { signin } from "../pages/signin/signin.js";
import { signup } from "../pages/signup/signup.js";

export const state = {
  user: {
    uuid: "123amsdjhqku2y3123-1231245-sadsd",
    name: "Ash Katchum",
    coins: 10000,
    luck: 0,
    friends: [],
    cards: {
      all: [
        {id: 25, quantity: 1},
        {id: 1, quantity: 1},
        {id: 4, quantity: 1},
        {id: 7, quantity: 1},
        {id: 12, quantity: 1},
        {id: 11, quantity: 1},
        {id: 112, quantity: 1},
        {id: 23, quantity: 1},
        {id: 16, quantity: 1},
        {id: 86, quantity: 1},
        {id: 76, quantity: 1},
        {id: 66, quantity: 1},
        {id: 36, quantity: 1},
        {id: 56, quantity: 1},
        {id: 66, quantity: 1},
        {id: 176, quantity: 1},
        {id: 116, quantity: 1},
        {id: 168, quantity: 1},
        {id: 17, quantity: 1},
      ],
      hand: [
        {id: 25},
        {id: 1},
        {id: 4},
        {id: 7},
        {id: 12},
        {id: 16},
      ],      
    },
    stats:[
      {
        wins: 0,
        lose: 0,
        played: 0,
        obtainedCards: 0,
      }
    ]
  },
  pages: {
    current: "home",
    previous: [],
    list: [
      {
        name: "signin",
        function: signin,
      },
      {
        name: "signup",
        function: signup,
      },
      {
        name: "shop",
        function: shop,
      },
      {
        name: "deck",
        function: deck,
      },
      {
        name: "pokedex",
        function: pokedex,
      },
      {
        name: "settings",
        function: settings,
      }
    ]
  },
  menus: {
    current: null,
    list: [
      {
        isOpen: false,
        name: "game",
        options: [
          {
            name: "loja", 
            slug: "shop",
            logged: true
          },
          {
            name: "cartas",
            slug: "deck",
            logged: true
          },
          {
            name: "pokedex",
            slug: "pokedex",
            logged: false
          },
          {
            name: "duelar",
            slug: "find-duel",
            logged: true
          },
          {
            name: "classificação",
            slug: "ranking",
            logged: false
          }
        ]
      },
      {
        isOpen: false,
        name: "profile",
        options: [
          {
            name: "perfil", 
            slug: "profile",
            logged: true
          },
          {
            name: "conta",
            slug: "account",
            logged: true
          },
          {
            name: "amigos",
            slug: "friend",
            logged: true
          },{
            name: "configurações",
            slug: "settings",
            logged: true
          },
          {
            name: "sair",
            slug: "signout",
            logged: true
          },
          {
            name: "entrar",
            slug: "signin",
            logged: false
          },
          {
            name: "registrar",
            slug: "signup",
            logged: false
          }
        ]
      },
    ]
  },
  floatElements: {
    fade: {
      isOpen: false, 
      object: new Fade
    },
  },
  settings: {
    card: {
      name: "Tamanho das cartas",
      optionSelected: "small",
      options: {
        xSmall: {
          name: "muito pequenas",
          width: 69,
          height: 99,
          padding: 2,
          font: {
            size: 4,
            padding: 1
          },
          image: {
            width: 63,
            height: 63,
          },
          icons: {
            width: 6,
            height: 6,
          }
        },
        small: {
          name: "pequenas",
          width: 103,
          height: 145,
          padding: 3,
          font: {
            size: 6,
            padding: 1
          },
          image: {
            width: 93,
            height: 93,
          },
          icons: {
            width: 11,
            height: 11,
          },
        },
        medium: {
          name: "médias",
          width: 133,
          height: 191,
          padding: 4,
          font: {
            size: 9,
            padding: 2
          },
          image: {
            width: 123,
            height: 123,
          },
          icons: {
            width: 13,
            height: 13,
          },
        },
        large: {
          name: "grandes",
          width: 150,
          height: 220,
          padding: 5,
          font: {
            size: 10,
            padding: 2
          },
          image: {
            width: 140,
            height: 140,
          },
          icons: {
            width: 15,
            height: 15,
          }
        },
        xLarge: {
          name: "muito grandes",
          width: 170,
          height: 250,
          padding: 5,
          font: {
            size: 13,
            padding: 2
          },
          image: {
            width: 160,
            height: 160,
          },
          icons: {
            width: 17,
            height: 17,
          }
        },
      }
    },
    sound: {
      name: "Som",
      optionSelected: "off",
      options: {
        off: {
          name: "desligado",
          value: false
        },
        on: {
          name: "ligado",
          value: true
        }
      }
    }
  },
  localMemory: {
    loadedCards: [

    ]
  },
  test: {
    pokemons: [
      {
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
      },
      {
        id: 4,
        name: "charmander",
        "types": [
          {
            "slot": 1,
            "type": {
              "name": "fire",
              "url": "https://pokeapi.co/api/v2/type/12/"
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
    ]
  }
}