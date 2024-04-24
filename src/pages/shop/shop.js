import { DialogContainer } from "../../components/dialog_container/dialog_container.js";
import { Fade } from "../../components/fade/fade.js";
import { PokeCard } from "../../components/poke_card/poke_card.js";
import { createSearchArea } from "../../components/search/search.js";
import { PokeApi } from "../../services/api.js";
import { state } from "../../services/state.js";
import { ViewService } from "../../services/view.js";

const localState = {
  selectedOffer: "npc",
  offers: {
    npc:[
      {
        name: "Comum",
        quantity: 1,
        price: 200,
      },
      {
        name: "Safari",
        quantity: 3,
        price: 582,
      },
      {
        name: "Great",
        quantity: 6,
        price: 1128,
      },
      {
        name: "Ultra",
        quantity: 12,
        price: 2112,
      },
      {
        name: "Master",
        quantity: 20,
        price: 3200,
      },
    ],
    buy: [
      {
        pokeId: 1,
        pokeName: "bulbasaur",
        player: "Ash Katchum",
        price: 452,
        offerType: "vende",
        createdAt: new Date("2024-04-19"),
        expireIn: new Date("2024-05-19"),
      },
    ],
    sell: [
      {
        pokeId: 2,
        pokeName: "ivysaur",
        player: "Ash Katchum",
        price: 185,
        offerType: "compra",
        createdAt: new Date("2024-04-19"),
        expireIn: new Date("2024-05-19"),
        sellItAnyWay: true,
      },
    ],
    trade: [
      {
        offeredPokeList: [
          {
            pokeId: 1,
            pokeName: "bulbasaur",
            quantity: 5,
          }
        ],          
        pokeId: 3,
        pokeName: "venusaur",
        player: "Ash Katchum",
        offerType: "troca",
        createdAt: new Date("2024-04-19"),
        expireIn: new Date("2024-05-19")
      },
    ]
  },
  menu: {
    isOpen: true,
    buttons: [
      {
        name: "pacote",
        slug: "npc",
        function: showNpcOffer,
      },
      {
        name: "compre",
        slug: "buy",
        function: showBuyingAndSellingOffers,
      },
      {
        name: "venda",
        slug: "sell",
        function: showBuyingAndSellingOffers,
      },
      {
        name: "troque",
        slug: "trade",
        function: showTradeOffers,
      }
    ]
  }
}

export function shop() {
  const body = document.querySelector("body");

  ViewService.cleanSectionToNewPage();

  const shopPage = document.createElement("section");
  shopPage.id = "shop_page";
  shopPage.innerHTML
  body.appendChild(shopPage);

  const shopMenu = createShopMenu(shopPage);
  shopPage.appendChild(shopMenu);

  const shopArea = document.createElement("div");
  shopArea.classList.add("shop_area");

  const moneyArea = document.createElement("div");
  moneyArea.classList.add("money_area")
  const moneySpan = document.createElement("span");
  moneySpan.id = "money"
  moneySpan.textContent = `Você tem P$ ${state.user.coins}`
  moneyArea.appendChild(moneySpan)
  const oneCoin = document.createElement("img");
  oneCoin.src = "src/assets/icons/single-coin.svg"
  moneyArea.appendChild(oneCoin)
  const coin = document.createElement("img");
  coin.src = "src/assets/icons/stand-coin.svg"
  moneyArea.appendChild(coin)
  const twoCoins = document.createElement("img");
  twoCoins.src = "src/assets/icons/double-coins.svg"
  moneyArea.appendChild(twoCoins)
  shopArea.appendChild(moneyArea)

  const searchArea = createSearchArea();
  shopArea.appendChild(searchArea);

  const filterArea = document.createElement("div");
  filterArea.classList.add("offer_filters");
  const span = document.createElement("span");
  span.textContent = "Ordenar por ";
  filterArea.appendChild(span);
  shopArea.appendChild(filterArea);

  const offerList = document.createElement("ul");
  offerList.classList.add("offer_list");
  shopArea.appendChild(offerList)

  shopPage.appendChild(shopArea);

  ViewService.cleanElementToUpdate(offerList)
  createOfferItems();
}

function createOfferItems() {
  localState.offers[localState.selectedOffer].forEach(offer => {
    localState.menu.buttons.find(button => button.slug === localState.selectedOffer).function(offer);
  });
}

function createShopMenu() {
  const shopMenu = document.createElement("nav");
  shopMenu.classList.add("shop_menu");

  const buttonArea = document.createElement("div");
  buttonArea.classList.add("button_area");
  shopMenu.appendChild(buttonArea);
  
  const menuTitle = document.createElement("h2");
  menuTitle.textContent = "Mercado";
  buttonArea.appendChild(menuTitle);

  localState.menu.buttons.forEach(item => {
    const button = document.createElement("button");
    button.textContent = item.name;
    button.id = item.slug;
    button.disabled = (item.slug === localState.selectedOffer)
    button.addEventListener("click", () => {
      localState.selectedOffer = item.slug;
      updateShop()
    });
    buttonArea.appendChild(button);
  });

  const btnHideMenu = document.createElement("button");
  btnHideMenu.id = "hide_shop_menu";
  btnHideMenu.addEventListener("click", () => {
    toggleMenu()
  })
  const btnHideMenuImage = document.createElement("img");
  btnHideMenuImage.src = "src/assets/icons/caret-left.svg";
  btnHideMenu.appendChild(btnHideMenuImage);
  shopMenu.appendChild(btnHideMenu);

  return shopMenu
}

function toggleMenu() {
  const shopMenu = document.querySelector(".shop_menu")
  localState.menu.isOpen = !localState.menu.isOpen
  if (localState.menu.isOpen) {
    shopMenu.classList.remove("closed")
  } else {
    shopMenu.classList.add("closed")
  }
}

function updateShop() {
  const offerList = document.querySelector(".offer_list");
  ViewService.cleanElementToUpdate(offerList)

  createOfferItems();
  const menuButtons = document.querySelectorAll(".shop_menu>.button_area>button")
  menuButtons.forEach (button => {
    button.disabled = (button.id === localState.selectedOffer);
  });
}

function showNpcOffer(offer) {
  const offerList = document.querySelector(".offer_list");

  const listItem = document.createElement("li");
  listItem.classList.add("offer_item");

  const name = document.createElement("span");
  name.textContent = offer.name;
  listItem.appendChild(name);

  const quantity = document.createElement("span");
  quantity.textContent = `${offer.quantity} carta${offer.quantity > 1 ? "s" : ""}`;
  listItem.appendChild(quantity);

  const btnConfirm = createConfirmButton(offer)
  listItem.appendChild(btnConfirm);

  offerList.appendChild(listItem);
}

function showBuyingAndSellingOffers(offer) {
  const offerList = document.querySelector(".offer_list");

  const listItem = document.createElement("li");
  listItem.classList.add("offer_item");

  const player = document.createElement("span");
  player.textContent = offer.player;
  listItem.appendChild(player);
  
  const offerType = document.createElement("span");
  offerType.textContent = offer.offerType
  listItem.appendChild(offerType);

  const cardInfo = document.createElement("span");
  cardInfo.classList.add("card");

  const cardId = document.createElement("span");
  cardId.classList.add("card_id");
  cardId.textContent = `#${offer.pokeId} `;
  cardInfo.appendChild(cardId);

  const cardName = document.createElement("span");
  cardName.classList.add("card_name");
  cardName.textContent = offer.pokeName;
  cardInfo.appendChild(cardName);
  
  listItem.appendChild(cardInfo);
  
  const btnConfirm = createConfirmButton(offer);
  listItem.appendChild(btnConfirm);
  offerList.appendChild(listItem);
}

function createConfirmButton(offer) {
  const body = document.querySelector("body");
  const btnConfirm = document.createElement("button");
  btnConfirm.classList.add("confirm");
  btnConfirm.addEventListener("click", () => {
    const confirm = document.createElement("button");
    confirm.textContent = "sim";
    confirm.addEventListener("click", async () => {
      if (state.user.coins < offer.price) {
        console.log("Você não tem dinheiro suficiente")
        fadeObj.hide()
        dialogContainerObj.delete();
      } else {
        fadeObj.hide()
        dialogContainerObj.delete();
        
        const btnExit = document.createElement("button");
        btnExit.textContent = "sair"
        btnExit.disabled = true;
        btnExit.addEventListener("click", () => {
          fadeObj.hide()
          dialogContainerObj.delete();
        })

        const dialogPurchasedContent = {
          "title": "Parabéns",
          "subtitle": "Você conseguiu pegar as sequintes cartas:",
          "inputsArray": [],
          "buttonsArray": [btnExit],
        }

        const dialogPurchasedObj = new DialogContainer(dialogPurchasedContent);
        const dialogPurchased = dialogPurchasedObj.create()
        body.appendChild(dialogPurchased);

        const fadePurchasedObj = new Fade()
        const fadeElement = fadePurchasedObj.select()
        fadePurchasedObj.show()

        const btnClose = document.querySelector(".btn_close");
        btnClose.disabled = true;
        btnClose.addEventListener("click", () => {
          fadeObj.hide()
          dialogPurchasedObj.delete();
        })

        const purchasedCardsArea = document.createElement("div");
        purchasedCardsArea.classList.add("purchased_cards")
        dialogPurchased.insertBefore(purchasedCardsArea, dialogPurchased.querySelector(".button_area"))

        const purchasedCards = [];
        while (purchasedCards.length < offer.quantity) {
          const pokeId = Math.floor(Math.random()*1017)+1;
          const pokeData = await PokeApi.getPokemon(pokeId)
          const cardLuck = Math.random()*2;
          if (state.user.luck * cardLuck > pokeData.base_experience) {
            purchasedCards.push(pokeData)
            const card = new PokeCard(pokeData, state.settings).create()
            purchasedCardsArea.appendChild(card)
            state.user.luck = (state.user.luck - pokeData.base_experience) / 2 > 0 ? (state.user.luck - pokeData.base_experience) / 2 : 0
          } else {
            state.user.luck += (pokeData.base_experience - (state.user.luck * cardLuck)) / 10;
          }
        }
        state.user.coins -= offer.price;
        purchasedCards.forEach(card => {
          const foundCard = state.user.cards.find(poke => poke.id === card.id)
          if (foundCard) {
            foundCard.quantity += 1;
          } else {
            state.user.cards.push({id: card.id, quantity: 1})
          }
        })
        const moneySpan = document.querySelector("#money")
        moneySpan.textContent = `Você tem P$ ${state.user.coins}`
        btnExit.disabled = false;
        btnClose.disabled = false;
      }
    })

    const dialogContent = {
      "title": "COMPRA",
      "subtitle": `Você deseja comprar o pacote com ${offer.quantity} carta${offer.quantity>1?"s":""} por P$ ${offer.price}`,
      "inputsArray": [],
      "buttonsArray": [confirm],
    };

    const dialogContainerObj = new DialogContainer(dialogContent);
    body.appendChild(dialogContainerObj.create());
    const fadeObj = new Fade()
    const fadeElement = fadeObj.select()
    fadeObj.show()
    fadeElement.addEventListener("click", () => {
      fadeObj.hide()
      dialogContainerObj.delete();
    })
    const btnClose = document.querySelector(".btn_close");
    btnClose.addEventListener("click", () => {
      fadeObj.hide()
      dialogContainerObj.delete();
    })
  })

  const btnConfirmImage = document.createElement("img");
  btnConfirmImage.src = "src/assets/icons/money-offer.svg";
  btnConfirmImage.alt = "offer";
  btnConfirm.appendChild(btnConfirmImage);

  const price = document.createElement("span");
  price.classList.add("price");
  price.textContent = offer.price;
  btnConfirm.appendChild(price);
  return btnConfirm;
}

function showTradeOffers(offer) {
  const offerList = document.querySelector(".offer_list");

  const listItem = document.createElement("li");
  listItem.classList.add("offer_item");

  const player = document.createElement("span");
  player.textContent = offer.player;
  listItem.appendChild(player);
  
  const offerType = document.createElement("span");
  offerType.textContent = offer.offerType
  listItem.appendChild(offerType);
  
  const quantity = document.createElement("span");
  let quantityValue = 0
  offer.offeredPokeList.forEach(poke => {
    quantityValue += poke.quantity;
  })
  quantity.textContent = `${quantityValue} carta${quantityValue > 1 ? "s" : ""}`;
  listItem.appendChild(quantity);
  
  const span = document.createElement("span");
  span.textContent = "por"
  listItem.appendChild(span);

  const cardInfo = document.createElement("span");
  cardInfo.classList.add("card");

  const cardId = document.createElement("span");
  cardId.classList.add("card_id");
  cardId.textContent = `#${offer.pokeId} `;
  cardInfo.appendChild(cardId);

  const cardName = document.createElement("span");
  cardName.classList.add("card_name");
  cardName.textContent = offer.pokeName;
  cardInfo.appendChild(cardName);
  
  listItem.appendChild(cardInfo);
  
  const btnDetails = document.createElement("button");
  btnDetails.textContent = "detalhes"
  listItem.appendChild(btnDetails);

  offerList.appendChild(listItem);
}