import { PokeApi } from "../../services/api.js";
import { cardColors } from "./styling_card.js";

export class PokeCard{
  constructor(pokeId, settings) {
    this.id = (typeof pokeId === "number") ? pokeId : pokeId.id;
    this.settings = settings.card;
    this.selectedSet = "";
  }

  async create() {
    const pokeData = await PokeApi.getPokemon(this.id)
    this._getPokeAttributesFromData(pokeData);
    
    const card = document.createElement("div");
    card.id = this.id;
    card.classList.add("poke_card");
    this._addCardStyle(card);

    const name = this._addName();
    card.appendChild(name);

    const detailBox = document.createElement("div");
    detailBox.classList.add("details");

    const shapeAttributes = this._addShape();
    detailBox.appendChild(shapeAttributes)

    const typesList = this._addTypes();
    detailBox.appendChild(typesList);

    card.appendChild(detailBox)

    let bgString = this._setBgColor();
    if (bgString) {
      card.style.background = bgString;
    }

    const imageBox = this._addImage();
    card.appendChild(imageBox);

    const attributesBox = this._addAttributes();
    card.appendChild(attributesBox)

    return card
  }

  _addCardStyle(card) {
    this.selectedSet = this.settings.options[this.settings.optionSelected];
    card.style.minWidth = `${this.selectedSet.width}px`;
    card.style.width = `${this.selectedSet.width}px`;
    card.style.minHeight = `${this.selectedSet.height}px`;
    card.style.height = `${this.selectedSet.height}px`;
    card.style.padding = `${this.selectedSet.padding}px`;
  }

  _getPokeAttributesFromData(pokeData) {
    this.name = pokeData.name;
    this.types = pokeData.types;
    this.height = pokeData.height;
    this.weight = pokeData.weight;
    this.image = pokeData.sprites.other.dream_world.front_default ? pokeData.sprites.other.dream_world.front_default : pokeData.sprites.front_default;
    this.health = pokeData.stats.find((item) => item.stat.name === "hp").base_stat || 0;
    this.speed = pokeData.stats.find((item) => item.stat.name === "speed").base_stat || 0;
    this.attack = pokeData.stats.find((item) => item.stat.name === "attack").base_stat || 0;
    this.defense = pokeData.stats.find((item) => item.stat.name === "defense").base_stat || 0;
  }

  _addName() {
    const name = document.createElement("span");
    name.classList.add("name");
    name.style.fontSize = `${this.selectedSet.font.size + 2}px`
    name.style.height = `${this.selectedSet.font.size + 4}px`
    name.textContent = this.name;
    return name;
  }

  _addShape() {
    const attributesBox = document.createElement("div");
    attributesBox.classList.add("shape");
    attributesBox.style.height = `${this.selectedSet.font.padding + this.selectedSet.icons.height}px`
    const attributesList = ["height", "weight"];
    attributesList.forEach(attribute => {
      const div = document.createElement("div");
      div.style.padding = `${this.selectedSet.font.padding}px`;
      div.classList.add("attribute");
      
      const icon = document.createElement("img");
      icon.src = `src/assets/card/${attribute}.svg`;
      icon.style.width = `${this.selectedSet.icons.width}px`;
      icon.style.height = `${this.selectedSet.icons.height}px`;
      div.appendChild(icon);

      const span = document.createElement("span");
      span.style.fontSize = `${this.selectedSet.font.size}px`;
      span.textContent = this[attribute];
      div.appendChild(span);

      attributesBox.appendChild(div);
    });
    return attributesBox;
  }

  _addTypes() {
    const typesList = document.createElement("ul");
    typesList.classList.add("types");
    this.types.forEach(element => {
      const li = document.createElement("li");
      li.style.height = `${this.selectedSet.font.padding + this.selectedSet.icons.height}px`
      const icon = document.createElement("img");
      icon.src = `src/assets/poke-types/${element.type.name}.svg`;
      icon.alt = element.type.name;
      icon.style.width = `${this.selectedSet.icons.width}px`;
      icon.style.height = `${this.selectedSet.icons.height}px`;
      li.appendChild(icon);
      typesList.appendChild(li);
    });
    return typesList;
  }

  _setBgColor() {
    const bgColors = cardColors.background(this.types);
    let bgString;
    if (bgColors.length === 1) {
      bgString = `linear-gradient(45deg, ${bgColors[0]}ff, ${bgColors[0]}aa, ${bgColors[0]}ff)`;
    } else if (bgColors.length === 2) {
      bgString = `linear-gradient(45deg, ${bgColors[0]}ff, ${bgColors[0]}aa, ${bgColors[1]}aa, ${bgColors[0]}aa, ${bgColors[0]}ff)`;
    } else {
      bgString = `linear-gradient(45deg, ${bgColors[0]}ff, ${bgColors[0]}aa, ${bgColors[1]}aa, ${bgColors[2]}aa, ${bgColors[1]}aa, ${bgColors[0]}aa, ${bgColors[0]}ff)`;
    }
    return bgString;
  }

  _addImage() {
    const imageBox = document.createElement("div");
    imageBox.classList.add("image");

    const image = document.createElement("img");
    image.src = this.image;
    image.alt = this.name;
    image.style.minWidth = `${this.selectedSet.image.width}px`;
    image.style.width = `${this.selectedSet.image.width}px`;
    image.style.minHeight = `${this.selectedSet.image.height}px`;
    image.style.height = `${this.selectedSet.image.height}px`;
    imageBox.appendChild(image);
    return imageBox;
  }

  _addAttributes() {
    const attributesBox = document.createElement("div");
    attributesBox.classList.add("attributes");
    const attributesList = ["health", "speed", "attack", "defense"];
    attributesList.forEach(attribute => {
      const div = document.createElement("div");
      div.style.padding = `${this.selectedSet.font.padding}px`;
      div.classList.add("attribute");
      
      const icon = document.createElement("img");
      icon.src = `src/assets/card/${attribute}.svg`;
      icon.style.width = `${this.selectedSet.icons.width}px`;
      icon.style.height = `${this.selectedSet.icons.height}px`;
      div.appendChild(icon);

      const span = document.createElement("span");
      span.textContent = this[attribute];
      span.style.fontSize = `${this.selectedSet.font.size}px`;
      div.appendChild(span);

      attributesBox.appendChild(div);
    });
    return attributesBox;
  }
}