export const ViewService = {}

ViewService.injectChilds = (parent, childrensArray, maxChildrens) => {
  for (let child = 0; child < maxChildrens; child++) {
    if (child < childrensArray.length) {
      parent.appendChild(childrensArray[child]);
    }
  }
}

ViewService.cleanSectionToNewPage = () => {
  const body = document.querySelector("body");
  const section = body.querySelector("section");
  if (section) {
    section.remove()
  }
}

ViewService.cleanElementToUpdate = (parentElement) => {
  if (parentElement) {
    parentElement.innerHTML = "";
  }
}