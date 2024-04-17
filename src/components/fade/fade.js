export class Fade{
  constructor() {
    this.fade = this.select()
  }

  select() {
    return document.querySelector(".fade")?document.querySelector(".fade"):this.create()
  }

  update(isOpen) {
    if (isOpen) {
      this.show()
    } else {
      this.hide()
    }
  }
  show() {
    this.fade.classList.remove("hide")
  }

  hide() {
    this.fade.classList.add("hide")
  }

  create() {
    const body = document.querySelector("body");
  
    const fade = document.createElement("div");
    fade.classList.add("fade");
    fade.classList.add("hide");
  
    body.appendChild(fade)
  
    return fade
  }
}

