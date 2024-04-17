export class DialogContainer {
  constructor({title="", subtitle=null, inputsArray=[], buttonsArray=[], footerContent=[]}) {
    this.title = title;
    this.subtitle = subtitle;
    this.inputsArray = inputsArray;
    this.buttonsArray = buttonsArray;
    this.footerContent = footerContent;
  }

  create() {
    const isDialogContainerOpen = document.querySelector(".dialog_container");
    if (isDialogContainerOpen) {
      this.delete()
    }

    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("dialog_container");
    dialogContainer.classList.add("absolute_center");

    const btnClose = document.createElement("button");
    btnClose.classList.add("btn_close");
    btnClose.addEventListener("click", () => this.delete())
    btnClose.textContent = "X";
    dialogContainer.appendChild(btnClose)
 
    if (this.title){
      const title = document.createElement("h1");
      title.classList.add("title");
      title.textContent = this.title
      dialogContainer.appendChild(title);
    }
  
    if (this.subtitle) {
      const subtitle = document.createElement("h2");
      subtitle.classList.add("subtitle");
      subtitle.textContent = this.subtitle
      dialogContainer.appendChild(subtitle);
    }
  
    if (this.inputsArray.length > 0) {
      const inputArea = document.createElement("div");
      inputArea.classList.add("input_area");
      this._injectElements(inputArea, this.inputsArray);
      dialogContainer.appendChild(inputArea);
    }
  
    if (this.buttonsArray.length>0) {
      const buttonArea = document.createElement("div");
      buttonArea.classList.add("button_area");
      this._injectElements(buttonArea, this.buttonsArray);
      dialogContainer.appendChild(buttonArea);
    }
  
    if (this.footerContent.length>0) {
      const footerArea = document.createElement("div");
      footerArea.classList.add("footer_area");
      this._injectElements(buttonArea, this.footerContent);
      dialogContainer.appendChild(footerArea);
    }

    return dialogContainer
  }

  delete() {
    const dialogContainer = document.querySelector(".dialog_container");
    if (dialogContainer) {
      dialogContainer.remove();
    }
  }

  _injectElements(parent, childrens) {
    childrens.forEach(element => {
      parent.appendChild(element)
    })
  }
}