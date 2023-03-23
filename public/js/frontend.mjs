const checkBtn = document.querySelectorAll(".checkBtn");
const unCheckBtn = document.querySelectorAll(".unCheckBtn");
const sentButton = document.querySelector("#sentBtn");
const clearButton = document.querySelector("#clearBtn");
const addEmailBtn = document.querySelectorAll(".addEmailBtn");
const deleteBtn = document.querySelectorAll(".deleteBtn");
const copyEmailsBtn = document.querySelector("#copyEmailsBtn");
const InputEmail = document.querySelectorAll("#addEmailInput");
const editBtn = document.querySelectorAll(".editBtn");

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
  editEmail,
} from "./frontendControllers.mjs";
editBtn.forEach(editEmail);
checkBtn.forEach(checkElementFn);
unCheckBtn.forEach(unCheckField);
deleteBtn.forEach(deleteFieldFn);

copyEmailsBtn.addEventListener("click", triggerCopy);
sentButton.addEventListener("click", sentData);
clearButton.addEventListener("click", clearFrame);

addEmailBtn.forEach(addEmail);
InputEmail.forEach(addEmailAfterEnter);

window.addEventListener("scroll", showUpBtnOnScroll);
