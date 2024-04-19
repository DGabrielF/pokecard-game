export const ViewService = {
  injectChilds: function (parent, childrensArray, maxChildrens) {
    for (let child = 0; child < maxChildrens; child++) {
      if (child < childrensArray.length) {
        parent.appendChild(childrensArray[child]);
      }
    }
  },
  cleanSectionToNewPage: function () {
    const body = document.querySelector("body");
    const section = body.querySelector("section");
    if (section) {
      section.remove()
    }
  },
  cleanElementToUpdate: function (parentElement) {
    if (parentElement) {
      parentElement.innerHTML = "";
    }
  }
}