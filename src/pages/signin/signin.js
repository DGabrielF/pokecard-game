import { DialogContainer } from "../../components/dialog_container/dialog_container.js"
import { Fade } from "../../components/fade/fade.js";
import { PasswordInput } from "../../components/password_input/password_input.js"
import { pageHub } from "../../main.js";

export function signin() {
  const body = document.querySelector("body");

  const inputsArray = addInputs();
  
  const buttonsArray = addButtons();

  const dialogContent = {
    "title": "ENTRAR",
    "subtitle": "Venha ser o maior mestre pokemon!",
    "inputsArray": inputsArray,
    "buttonsArray": buttonsArray,
  }
  const dialogContainerObj = new DialogContainer(dialogContent);
  body.appendChild(dialogContainerObj.create());
  const fadeObj = new Fade();
  const fadeElement = fadeObj.select();
  fadeObj.show();
  fadeElement.addEventListener("click", () => {
    fadeObj.hide();
    dialogContainerObj.delete();
  });
  const btnClose = document.querySelector(".btn_close");
  btnClose.addEventListener("click", () => {
    fadeObj.hide()
    dialogContainerObj.delete();
  });

  function addInputs() {
    const inputsArray = [];
    const inpUser = document.createElement("input");
    inpUser.type = "text";
    inpUser.placeholder = "Usuário";
    inputsArray.push(inpUser);

    inputsArray.push(new PasswordInput().create());
    return inputsArray;
  };

  function addButtons() {
    const buttonsArray = [];
    const btnSignin = document.createElement("button");
    btnSignin.textContent = "entrar";
    buttonsArray.push(btnSignin);

    const btnSignup = document.createElement("button");
    btnSignup.textContent = "registrar";
    btnSignup.addEventListener("click", () => {
      pageHub("signup");
    });
    buttonsArray.push(btnSignup);
    return buttonsArray;
  };
};