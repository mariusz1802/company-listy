const checkBtn = document.querySelectorAll(".checkBtn");
const unCheckBtn = document.querySelectorAll(".unCheckBtn");
const sentButton = document.querySelector("#sentBtn");
const clearButton = document.querySelector("#clearBtn");
const addEmailBtn = document.querySelectorAll(".addEmailBtn");
const deleteBtn = document.querySelectorAll(".deleteBtn");
const copyEmailsBtn = document.querySelector("#copyEmails");
const InputEmail = document.querySelectorAll("#addEmailInput");
import {
  unCheckField,
  deleteFieldFn,
  sentData,
  checkElementFn,
  clearFrame,
  triggerCopy,
  addEmail,
  addEmailAfterEnter,
  showUpBtnOnScroll,
} from "./frontendControllers.mjs";

checkBtn.forEach(checkElementFn);
unCheckBtn.forEach(unCheckField);
deleteBtn.forEach(deleteFieldFn);

copyEmailsBtn.addEventListener("click", triggerCopy);
sentButton.addEventListener("click", sentData);
clearButton.addEventListener("click", clearFrame);

addEmailBtn.forEach(addEmail);
InputEmail.forEach(addEmailAfterEnter);

window.addEventListener("scroll", showUpBtnOnScroll);
