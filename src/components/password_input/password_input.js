export class PasswordInput{
  constructor(show=false, placeholder="senha"){
    this.show = show;
    this.type = "password";
    this.buttonImage = "mostrar";
    this.placeholder = placeholder
  }

  create() {
    const passwordInputDiv = document.createElement("div");
    passwordInputDiv.classList.add("password_input")

    this.type = this.show?"text":"password";
    this.buttonImage = this.show?"src/assets/icons/eye-closed.svg":"src/assets/icons/eye-opened.svg"

    const input = document.createElement("input");
    input.type = this.type;
    input.placeholder = this.placeholder;
    passwordInputDiv.appendChild(input)
    
    const btnShow = document.createElement("button");
    btnShow.addEventListener("click", () => {
      this._toggleType();
      this._update(input, btnImage)
    })
    const btnImage = document.createElement("img");
    btnImage.src = this.buttonImage
    btnShow.appendChild(btnImage)

    passwordInputDiv.appendChild(btnShow)

    return passwordInputDiv
  }

  _toggleType() {
    this.show = !this.show;
    this.type = this.show?"text":"password";
    this.buttonImage = this.show?"src/assets/icons/eye-closed.svg":"src/assets/icons/eye-opened.svg"
  }

  _update(input, buttonImage) {
    input.type = this.type;
    buttonImage.src = this.buttonImage;
  }
}