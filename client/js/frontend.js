const deleteBtn = document.querySelectorAll("#deleteBtn");
const checkBtn = document.querySelectorAll("#checkBtn");
const unCheckBtn = document.querySelectorAll("#unCheckBtn");

const mailList = document.querySelector(".mailList");
const companyEmail = document.querySelectorAll(".companyEmail");

let mailArr = [];

deleteBtn.forEach((el, index) => {
  el.addEventListener("click", (e) => {
    let td = e.target.parentNode;
    let tr = td.parentNode;
    tr.parentNode.removeChild(tr);
    const id = index;
    fetch(`/api/companies/:${id}`, {method : 'DELETE'}).then(response => {
      if (!response.ok) {
        throw new Error('Network repsonse was not ok');
      }
      location.reload();
    })
    .catch(error => {
      console.error('Error', error)
    })
  });
});

checkBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    let td = e.target.parentNode;
    let tr = td.parentNode;
    const email = tr.childNodes[5].textContent;
    tr.classList.add("green");
      if(mailArr.indexOf(email)==-1){
        mailArr.push(email);
        mailList.innerHTML = mailArr;
      }else {
        mailList.innerHTML = mailArr;
      }
  });
});

unCheckBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    let td = e.target.parentNode;
    let tr = td.parentNode;
    tr.classList.remove("green");
    const email = tr.childNodes[5].textContent;
     mailArr =  mailArr.filter(el => el !== email);
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
