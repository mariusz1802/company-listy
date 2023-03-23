const toTopBtn = document.querySelector("#toTop");
let mailList = document.querySelector(".mailList");

let mailArr = [];
let idArr = [];
let checkedArr = [];

export const unCheckField = (el) => {
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
};

export const deleteFieldFn = (el) => {
  el.addEventListener("click", (e) => {
    console.log("clicked");
    let elementId = el.querySelector("[data-id]");
    axios
      .delete("/delete", { params: { id: elementId } })
      .then(function () {
        window.location.href = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
    let td = e.target.parentNode;
    let tr = td.parentNode;
    tr.parentNode.removeChild(tr);
  });
};

export const checkElementFn = (el) => {
  el.addEventListener("click", (e) => {
    let td = e.target.parentNode;
    const id = el.id;
    idArr.push(id);
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
};

export const sentData = () => {
  axios
    .post("/updateData", { idArr })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  mailArr = [];
  mailList.innerText = "";
  checkedArr.map((el) => {
    el.classList.remove("green");
    el.classList.add("orange");
  });
};

export const clearFrame = () => {
  mailArr = [];
  mailList.innerText = "";
  checkedArr.map((el) => {
    el.classList.remove("green");
  });
};

export const triggerCopy = () => {
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
};

export const addEmail = (el) => {
  el.addEventListener("click", (e) => {
    const elId = el.id;
    const td = e.target.parentNode;
    const inputValue = td.querySelector("#addEmailInput").value;
    axios
      .post("/updateEmail", { elId, inputValue })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (!inputValue) {
      return;
    }
    td.textContent = inputValue;
  });
};

export const addEmailAfterEnter = (el) => {
  el.addEventListener("keydown", (e) => {
    const td = e.target.parentNode;
    const inputValue = td.querySelector("#addEmailInput").value;
    if (e.key === "Enter") {
      td.textContent = inputValue;
    }
  });
};

export const showUpBtnOnScroll = () => {
  if (window.pageYOffset > 200) {
    toTopBtn.style.display = "block";
  } else {
    toTopBtn.style.display = "none";
  }
};
