import { DialogContainer } from "../../components/dialog_container/dialog_container.js"
import { Fade } from "../../components/fade/fade.js"
import { PasswordInput } from "../../components/password_input/password_input.js"
import { pageHub } from "../../main.js"

export function signup() {
  const body = document.querySelector("body")

  const inputsArray = addInputs()
  
  const buttonsArray = addButtons()

  const dialogContent = {
    "title": "Registre-se",
    "subtitle": "Cadastre-se agora e ganhe P$ 1200",
    "inputsArray": inputsArray,
    "buttonsArray": buttonsArray,
  }
  const dialogContainerObj = new DialogContainer(dialogContent)
  body.appendChild(dialogContainerObj.create());
  const fadeObj = new Fade()
  const fadeElement = fadeObj.select()
  fadeObj.show()
  fadeElement.addEventListener("click", () => {
    fadeObj.hide()
    dialogContainerObj.delete();
  })
  const btnClose = document.querySelector(".btn_close");
  btnClose.addEventListener("click", () => {
    fadeObj.hide()
    dialogContainerObj.delete();
  })

  function addInputs() {
    const inputsArray = []
    const inpUser = document.createElement("input")
    inpUser.type = "text"
    inpUser.placeholder = "Usuário"
    inputsArray.push(inpUser)

    const inpEmail = document.createElement("input")
    inpEmail.type = "email"
    inpEmail.placeholder = "E-mail"
    inputsArray.push(inpEmail)

    inputsArray.push(new PasswordInput().create())
    inputsArray.push(new PasswordInput(false, "confirme a senha").create())
    return inputsArray
  }

  function addButtons() {
    const buttonsArray = []
    const btnSignup = document.createElement("button")
    btnSignup.textContent = "registrar"
    buttonsArray.push(btnSignup)
    
    const btnSignin = document.createElement("button")
    btnSignin.textContent = "sou membro"
    btnSignin.addEventListener("click", () => {
      pageHub("signin")
    })
    buttonsArray.push(btnSignin)
    return buttonsArray
  }
}