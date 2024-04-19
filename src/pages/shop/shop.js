import { createSearchArea } from "../../components/search/search.js";
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
        sellItAnyWay: true,
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
        expireIn: new Date("2024-05-19")
      },
    ],
    trade: [
      {
        offeredPokeList: [
          {
            offeredPokeId: 1,
            offeredPokeName: "bulbasaur",
            quantity: 5,
          }
        ],          
        desiredPokeId: 3,
        desiredPokeName: "venusaur",
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
  
  const menuTitle = document.createElement("h2");
  menuTitle.textContent = "Mercado";
  shopMenu.appendChild(menuTitle);

  localState.menu.buttons.forEach(item => {
    const button = document.createElement("button");
    button.textContent = item.name;
    button.id = item.slug;
    button.disabled = (item.slug === localState.selectedOffer)
    button.addEventListener("click", () => {
      localState.selectedOffer = item.slug;
      updateShop()
    });
    shopMenu.appendChild(button);
  });

  const btnHideMenu = document.createElement("button");
  btnHideMenu.id = "hide_shop_menu";
  const btnHideMenuImage = document.createElement("img");
  btnHideMenuImage.src = "src/assets/icons/caret-left.svg";
  btnHideMenu.appendChild(btnHideMenuImage);
  shopMenu.appendChild(btnHideMenu);

  return shopMenu
}

function updateShop() {
  const offerList = document.querySelector(".offer_list");
  ViewService.cleanElementToUpdate(offerList)

  createOfferItems();
  const menuButtons = document.querySelectorAll(".shop_menu>button")
  menuButtons.forEach (button => {
    button.disabled = (button.id === localState.selectedOffer);
  })

}

function showNpcOffer(offer) {
  const offerList = document.querySelector(".offer_list")

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
  const btnConfirm = document.createElement("button");
  btnConfirm.classList.add("confirm");

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
