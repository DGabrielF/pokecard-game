import { DialogContainer } from "../../components/dialog_container/dialog_container.js"
import { Fade } from "../../components/fade/fade.js"
import { PasswordInput } from "../../components/password_input/password_input.js"
import { pageHub } from "../../main.js"

export function signup() {
  const body = document.querySelector("body")

  const inputsArray = addInputs()
  
  const buttonsArray = addButtons()

  const dialog_content = {
    "title": "Registre-se",
    "subtitle": "Cadastre-se agora e ganhe P$ 1200",
    "inputsArray": inputsArray,
    "buttonsArray": buttonsArray,
  }
  const dialogContainerObj = new DialogContainer(dialog_content)
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
    const inp_user = document.createElement("input")
    inp_user.type = "text"
    inp_user.placeholder = "Usuário"
    inputsArray.push(inp_user)

    const inp_email = document.createElement("input")
    inp_email.type = "email"
    inp_email.placeholder = "E-mail"
    inputsArray.push(inp_email)

    inputsArray.push(new PasswordInput().create())
    inputsArray.push(new PasswordInput(false, "confirme a senha").create())
    return inputsArray
  }

  function addButtons() {
    const buttonsArray = []
    const btn_signup = document.createElement("button")
    btn_signup.textContent = "registrar"
    buttonsArray.push(btn_signup)
    
    const btn_signin = document.createElement("button")
    btn_signin.textContent = "sou membro"
    btn_signin.addEventListener("click", () => {
      pageHub("signin")
    })
    buttonsArray.push(btn_signin)
    return buttonsArray
  }
}