import { TopMenu } from "./components/top_menu/top_menu.js";
import { state } from "./scripts/state.js"

export function pageHub(pageSlug) {
  if (state.pages.current)
  state.pages.previous.push(state.pages.current)
  state.pages.current = pageSlug;
  const switchPage = state.pages.list.find(page => page.name == state.pages.current)
  if (switchPage) {
    switchPage.function()
  }
}

async function init() {
  const topMenu = new TopMenu(state).create()

  pageHub(state.pages.current)
}

init()