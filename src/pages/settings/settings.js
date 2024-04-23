import { DialogContainer } from "../../components/dialog_container/dialog_container.js";
import { Fade } from "../../components/fade/fade.js";
import { state } from "../../services/state.js";

const localState = {}

export function settings() {
  const body = document.querySelector("body");

  const inputsArray = addInputs();

  const buttonsArray = addButtons();

  const dialogContent = {
    "title": "CONFIGURAÇÕES",
    "subtitle": "Ajuste as opções para ter uma melhor experiência",
    "inputsArray": inputsArray,
    "buttonsArray": buttonsArray,
  };
  const dialogContainerObj = new DialogContainer(dialogContent);
  body.appendChild(dialogContainerObj.create());

  const fadeObj = new Fade();
  const fadeElement = fadeObj.select();
  fadeObj.show();
  fadeElement.addEventListener("click", () => {
    fadeObj.hide();
    dialogContainerObj.delete();
  })
  const btnClose = document.querySelector(".btn_close");
  btnClose.addEventListener("click", () => {
    fadeObj.hide();
    dialogContainerObj.delete();
  });

  function addInputs() {
    const inputsArray = []

    for (let setting in state.settings) {
      const optionDiv = createOptionMenuSettings(state.settings, setting);
      inputsArray.push(optionDiv);
    }


    return inputsArray;
  };

  function addButtons() {
    const buttonsArray = [];
    const btnConfirm = document.createElement("button");
    btnConfirm.textContent = "confirmar";
    btnConfirm.addEventListener("click", () => {
      for (let setting in localState) {
        state.settings[setting].optionSelected = localState[setting].optionSelected        
      }
      // Mensagem de sucesso
      fadeObj.hide();
      dialogContainerObj.delete();
    })
    buttonsArray.push(btnConfirm);
    return buttonsArray;
  };
};

function createOptionMenuSettings(settings, setting) {
  const optionDiv = document.createElement("div");
  optionDiv.classList.add("option_area");

  const optionSpan = document.createElement("span");
  optionSpan.textContent = settings[setting].name;
  optionDiv.appendChild(optionSpan);

  const inpDropdown = document.createElement("div");
  inpDropdown.classList.add("option_dropdown");

  const selectedOption = document.createElement("span");
  selectedOption.classList.add("selected_option");
  selectedOption.textContent = settings[setting].options[settings[setting].optionSelected].name;
  selectedOption.addEventListener("click", () => {
    const optionsList = selectedOption.parentElement.querySelector(".options");
    if (optionsList.classList.contains("hide")) {
      optionsList.classList.remove("hide");
    } else {
      optionsList.classList.add("hide");
    };
  });
  inpDropdown.appendChild(selectedOption);

  const inpOptionsList = document.createElement("div");
  inpOptionsList.classList.add("options");
  inpOptionsList.classList.add("hide");
  for (let key in settings[setting].options) {
    const option = document.createElement("button");
    option.textContent = settings[setting].options[key].name;
    option.addEventListener("click", () => {
      const optionsList = option.parentElement;
      optionsList.classList.add("hide");
      localState[setting] = {}
      localState[setting].optionSelected = key
      const optionSpan = optionsList.parentElement.querySelector(".selected_option");
      optionSpan.textContent = settings[setting].options[key].name
    })
    inpOptionsList.appendChild(option);
  }
  inpDropdown.appendChild(inpOptionsList);

  optionDiv.appendChild(inpDropdown);
  return optionDiv;
}
