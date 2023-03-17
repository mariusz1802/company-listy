const deleteBtn = document.querySelectorAll(".deleteBtn");
const checkBtn = document.querySelectorAll(".checkBtn");
const unCheckBtn = document.querySelectorAll(".unCheckBtn");
const sentButton = document.querySelector("#sentBtn");
const clearButton = document.querySelector("#clearBtn");
const companyEmail = document.querySelectorAll(".companyEmail");
const addEmailBtn = document.querySelectorAll("#addEmailBtn");
let mailList = document.querySelector(".mailList");

let mailArr = [];
let checkedArr = [];
let idArr = [];

$(document).on("click", ".deleteBtn", function (e) {
  var elementId = $(this).data("id");
  axios
    .delete("/delete", { params: { id: elementId } })
    .then(function (response) {
      console.log("Wszystko ok");
      // obsługa odpowiedzi serwera po usunięciu elementu
      window.location.href = "/";
    })
    .catch(function (error) {
      console.log(error);
    });

  let td = e.target.parentNode;
  let tr = td.parentNode;
  tr.parentNode.removeChild(tr);
});

sentButton.addEventListener("click", () => {
  axios
    .post("/updateData", { idArr })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

checkBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    let td = e.target.parentNode;
    const id = el.id;
    idArr.push(id);
    console.log("Tablica elementow id: ", idArr);

    let tr = td.parentNode;
    checkedArr.push(tr);
    const email = tr.childNodes[5].textContent;
    tr.classList.add("green");
    if (mailArr.indexOf(email) == -1) {
      mailArr.push(email);
      mailList.innerHTML = mailArr;
    } else {
      mailList.innerHTML = mailArr;
    }
  });
});

clearButton.addEventListener("click", () => {
  mailArr = [];
  mailList.innerText = "";
  checkedArr.map((el) => {
    el.classList.remove("green");
  });
});

sentButton.addEventListener("click", () => {
  mailArr = [];
  mailList.innerText = "";
  checkedArr.map((el) => {
    el.classList.remove("green");
    el.classList.add("orange");
  });
});

unCheckBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    let td = e.target.parentNode;
    let tr = td.parentNode;
    const IdToFind = el.id;
    console.log("ID to find: ", IdToFind);
    const outPut = idArr.findIndex((element) => element == IdToFind);
    console.log(outPut);

    if (outPut !== -1) {
      idArr.splice(IdToFind, 1);
      console.log("element z tablicy zostal usuniety");
    } else {
      console.log("Nie znaleziono takiego elemenu");
    }

    tr.classList.remove("green");
    const email = tr.childNodes[5].textContent;
    mailArr = mailArr.filter((el) => el !== email);
    mailList.innerHTML = mailArr;
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

addEmailBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    const td = e.target.parentNode;
    const inputValue = td.querySelector("#addEmailInput").value;
    if (!inputValue) {
      return;
    }

    td.textContent = inputValue;
  });
});
