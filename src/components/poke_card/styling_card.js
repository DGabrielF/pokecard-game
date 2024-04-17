export const cardColors = {};

const typeColors = {
  bug: {
    background: "#808000"
  },
  dark: {
    background: "#705848"
  },
  dragon: {
    background: "#7038f8"
  },
  electric: {
    background: "#f8d030"
  },
  fairy: {
    background: "#ee82ee"
  },
  fighting: {
    background: "#903028"
  },
  fire: {
    background: "#f05030"
  },
  flying: {
    background: "#a890f0"
  },
  ghost: {
    background: "#705898"
  },
  grass: {
    background: "#78c850"
  },
  ground: {
    background: "#e0c068"
  },
  ice: {
    background: "#98d8d8"
  },
  normal: {
    background: "#a8a878"
  },
  poison: {
    background: "#a040a0"
  },
  psychic: {
    background: "#f85888"
  },
  rock: {
    background: "#b8a038"
  },
  steel: {
    background: "#b8b8d0"
  },
  water: {
    background: "#6890f0"
  },
}

cardColors.background = (types) => {
  const colors = [];
  for (const objeto of types) {
    colors.push(typeColors[objeto.type.name].background)
  }
  return colors
}