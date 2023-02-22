const express = require("express");
const fs = require("fs");
const { traceDeprecation } = require("process");
const app = express();

app.use(express.static("public"));

//odczytaj dane z data.txt
const dane = fs.readFileSync("./data.txt", "utf8");

//Podziel dane na linie
const linie = dane.split("\n");

//Wyrażanie regularne do wyodrebnienia danych z linii
const wyrazenie =
  /^(.*) - (https?:\/\/[\S]+) - E-mail: ([\w.-]+@[\w.-]+\.[\w.-]+)/;

//Tablica na dane firm;

const firmy = [];

linie.forEach((linia) => {
  //Sprawdz dopasowanie do wyrazanie regularnego
  const dopasowanie = linia.match(wyrazenie);

  if (dopasowanie) {
    const firma = {
      nameCompany: dopasowanie[1],
      www: dopasowanie[2],
      email: dopasowanie[3],
    };
    firmy.push(firma);
  }
});

firmy.forEach((firma) => {
  console.log("nazwa firmy:", firma.nameCompany);
  console.log("adres www firmy:", firma.www);
  console.log("adres email:", firma.email);
  console.log("--------------------------");
});

//Konwertuj tablice firm na format JSON i wyswietl w konsoli

const jsonFirmy = JSON.stringify(firmy);

const tabela = document.getElementById("tabela");
const tbody = tabela.getElementsByTagName("tbody")[0];

firmy.forEach((firma) => {
  const tr = document.createElement("tr");
  const tdNazwa = document.createElement("td");
  const tdWww = document.createElement("td");
  const tdEmail = document.createElement("td");
  tdNazwa.textContent = firma.nameCompany;
  tdWww.innerHTML = `<a href="${firma.www}" target="_blank">${firma.www}</a>`;
  tdEmail.innerHTML = `<a href="mailto:${firma.email}">${firma.email}</a>`;
  tr.appendChild(tdNazwa);
  tr.appendChild(tdWww);
  tr.appendChild(tdEmail);
  tbody.appendChild(tr);
});

app.listen(3000, () => {
  console.log("Serwer dziala na porcie 3000");
});
