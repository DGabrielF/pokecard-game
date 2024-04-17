import { cardColors } from "./styling_card.js";

export class PokeCard{
  constructor(poke) {
    this.id = poke.id;
    this.name = poke.name;
    this.types = poke.types;
    this.height = poke.height;
    this.weight = poke.weight;
    this.image = poke.sprites.other.dream_world.front_default ? poke.sprites.other.dream_world.front_default : poke.sprites.front_default;
    this.health = poke.stats.find((item) => item.stat.name === "hp").base_stat || 0;
    this.speed = poke.stats.find((item) => item.stat.name === "speed").base_stat || 0;
    this.attack = poke.stats.find((item) => item.stat.name === "attack").base_stat || 0;
    this.defense = poke.stats.find((item) => item.stat.name === "defense").base_stat || 0;
  }

  create() {
    const card = document.createElement("div");
    card.classList.add("poke_card");
    card.id = this.id;

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

  _addName() {
    const name = document.createElement("span");
    name.classList.add("name");
    name.textContent = this.name;
    return name;
  }

  _addShape() {
    const attributesBox = document.createElement("div");
    attributesBox.classList.add("shape");
    const attributesList = ["height", "weight"];
    attributesList.forEach(attribute => {
      const div = document.createElement("div");
      div.classList.add("attribute");
      
      const icon = document.createElement("img");
      icon.src = `src/assets/card/${attribute}.svg`;
      div.appendChild(icon);

      const span = document.createElement("span");
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
      const image = document.createElement("img");
      image.src = `src/assets/poke-types/${element.type.name}.svg`;
      image.alt = element.type.name;
      li.appendChild(image);
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
    imageBox.appendChild(image);
    return imageBox;
  }

  _addAttributes() {
    const attributesBox = document.createElement("div");
    attributesBox.classList.add("attributes");
    const attributesList = ["health", "speed", "attack", "defense"];
    attributesList.forEach(attribute => {
      const div = document.createElement("div");
      div.classList.add("attribute");
      
      const icon = document.createElement("img");
      icon.src = `src/assets/card/${attribute}.svg`;
      div.appendChild(icon);

      const span = document.createElement("span");
      span.textContent = this[attribute];
      div.appendChild(span);

      attributesBox.appendChild(div);
    });
    return attributesBox;
  }
}