export const ViewService = {
  injectChilds: function (parent, childrensArray, maxChildrens) {
    for (let child = 0; child < maxChildrens; child++) {
      if (child < childrensArray.length) {
        parent.appendChild(childrensArray[child]);
      }
    }
  }
}