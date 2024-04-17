import { Fade } from "../components/fade/fade.js";
import { signin } from "../pages/signin/signin.js";
import { signup } from "../pages/signup/signup.js";

export const state = {
  user: {
    uuid: null,
    name: null,
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
  localMemory: []
}