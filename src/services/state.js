import { Fade } from "../components/fade/fade.js";
import { deck } from "../pages/deck/deck.js";
import { pokedex } from "../pages/pokedex/pokedex.js";
import { signin } from "../pages/signin/signin.js";
import { signup } from "../pages/signup/signup.js";

export const state = {
  user: {
    uuid: "123amsdjhqku2y3123-1231245-sadsd",
    name: "Ash Katchum",
    coins: 0,
    friends: [],
    cards: [],
    hand: [],
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
        name: "pokedex",
        function: pokedex,
      },
      {
        name: "deck",
        function: deck,
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
      sizeSelected: "xLarge",
      sizes: {
        xSmall: {
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
    }
  },
  localMemory: []
}