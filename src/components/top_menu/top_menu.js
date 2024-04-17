import { pageHub } from "../../main.js";
import { state } from "../../scripts/state.js";

export class TopMenu{
  constructor() {
    this.user = state.user.uuid?state.user:null;
    this.gameMenuList = state.menus.list.find(menu => menu.name === "game").options;
    this.profileMenuList = state.menus.list.find(menu => menu.name === "profile").options;
  }

  create() {
    const body = document.querySelector("body");

    const fadeElement = state.floatElements.fade.object.select();
    fadeElement.addEventListener("click", () => {
      this._menuHub("fade");
      state.floatElements.fade.object.hide();
    })
   
    const topMenu = document.createElement("header");
    body.appendChild(topMenu);
    
    const gameMenuToggle = this._createGameMenu();
    topMenu.appendChild(gameMenuToggle);
    
    const profileMenuToggle = this._createProfileMenu();
    topMenu.appendChild(profileMenuToggle)

    return topMenu
  }

  _createGameMenu() {
    const gameMenuToggle = document.createElement("div");
    gameMenuToggle.classList.add("toggle_menu")
    gameMenuToggle.classList.add("game")
    
    const gameMenuToggleText = document.createElement("span");
    gameMenuToggleText.textContent = "MENU";
    gameMenuToggleText.addEventListener("click", () => this._menuHub("game"))
    gameMenuToggle.appendChild(gameMenuToggleText);
    
    const gameMenuToggleIcon = document.createElement("img");
    gameMenuToggleIcon.src = "src/assets/icons/list-menu.svg";
    gameMenuToggleIcon.addEventListener("click", () => this._menuHub("game"))
    gameMenuToggle.appendChild(gameMenuToggleIcon);

    const gameMenuList = document.createElement("nav");
    gameMenuList.classList.add("game_menu_items")
    gameMenuList.classList.add("hide")
    this.gameMenuList.forEach(item => {
      if ((!this.user && !item.logged) || this.user) {
        const button = document.createElement("button");
        button.textContent = item.name;
        gameMenuList.appendChild(button);
      }
    });
    gameMenuList.classList.add("menu");
    gameMenuToggle.appendChild(gameMenuList);

    return gameMenuToggle;
  }

  _createProfileMenu() {
    const profileMenuToggle = document.createElement("div");
    profileMenuToggle.classList.add("toggle_menu")
    profileMenuToggle.classList.add("profile")
    
    const profileMenuToggleText = document.createElement("p");
    profileMenuToggleText.textContent = this.user ? this.user.name : "Faça o login";
    profileMenuToggleText.addEventListener("click", () => this._menuHub("profile"))
    profileMenuToggle.appendChild(profileMenuToggleText);
    
    const profileMenuToggleIcon = document.createElement("img");
    profileMenuToggleIcon.src = "src/assets/icons/profile-menu.svg";
    profileMenuToggleIcon.addEventListener("click", () => this._menuHub("profile"))
    profileMenuToggle.appendChild(profileMenuToggleIcon);

    const profileMenuList = document.createElement("nav");
    profileMenuList.classList.add("profile_menu_items");
    profileMenuList.classList.add("hide");
    this.profileMenuList.forEach(item => {
      if ((!this.user && !item.logged) || (this.user && item.logged)) {
        const button = document.createElement("button");
        button.textContent = item.name;
        button.addEventListener("click", () => {
          this._menuHub()
          pageHub(item.slug);
        })
        profileMenuList.appendChild(button);
      }

    });
    profileMenuList.classList.add("menu");
    profileMenuToggle.appendChild(profileMenuList);
    return profileMenuToggle;
  }

  _menuHub(clickedMenu) {
    this.updateMenuState(clickedMenu);
    const menusArray = document.querySelectorAll(".toggle_menu nav")
    menusArray.forEach(menu => {
      if (menu.classList.contains(`${clickedMenu}_menu_items`)){
        menu.classList.contains("hide")?menu.classList.remove("hide"):menu.classList.add("hide")    
      } else {
        if (!menu.classList.contains("hide")){
          menu.classList.add("hide")   
        }
      }
    })
  }

  updateMenuState(clickedMenu) {
    const selectedMenu = state.menus.list.find(menu => menu.name == clickedMenu);
    const openedMenu = state.menus.list.find(menu => menu.isOpen);
    state.menus.list.map(menu => {
      menu.isOpen = false
    })
    if (selectedMenu) {
      selectedMenu.isOpen = (selectedMenu !== openedMenu);
      state.floatElements.fade.isOpen = (selectedMenu !== openedMenu)
      state.floatElements.fade.object.update(state.floatElements.fade.isOpen)
    }
  }

  update() {
    const header = document.querySelector("header");
    header.remove();
    this.create()
  }
}