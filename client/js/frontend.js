const deleteBtn = document.querySelectorAll("#deleteBtn");
const checkBtn = document.querySelectorAll("#checkBtn");
const unCheckBtn = document.querySelectorAll("#unCheckBtn");

const mailList = document.querySelector(".mailList");
const companyEmail = document.querySelectorAll(".companyEmail");

let mailArr = [];

deleteBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    let td = e.target.parentNode;
    let tr = td.parentNode;
    tr.parentNode.removeChild(tr);
  });
});

checkBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    let td = e.target.parentNode;
    let tr = td.parentNode;
    const email = tr.childNodes[5].textContent;
    tr.classList.add("green");
    mailArr.push(email);
    mailList.innerHTML = mailArr;
  });
});

unCheckBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    let td = e.target.parentNode;
    let tr = td.parentNode;
    tr.classList.remove("green");
  });
});

const selectAndCopyBtn = document.querySelector("#selectBtn");

selectAndCopyBtn.addEventListener("click", triggerCopy);

function triggerCopy() {
  const storage = document.createElement("textarea");
  const element = document.querySelector(".mailList");
  storage.value = element.innerHTML;
  element.appendChild(storage);

  storage.select();
  storage.setSelectionRange(0, 99999);
  document.execCommand("copy");
  element.removeChild(storage);
  const copied = document.querySelector("#copiedInfo");

  copied.classList.add("show");

  setTimeout(() => {
    copied.classList.remove("show");
  }, 2000);
}
