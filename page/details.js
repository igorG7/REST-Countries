import changeTheme from "../darkmode.js";
import { loadTheme } from "../darkmode.js";

let recoveredCountry = JSON.parse(sessionStorage.getItem("countryInfos"));

const flag = document.querySelector("#country-flag");
flag.setAttribute("src", `${recoveredCountry.flags.svg}`);

const countryName = document.querySelector(".country-name");
countryName.innerHTML = recoveredCountry.name;

const nativeName = document.querySelector("#native-name");
nativeName.textContent = recoveredCountry.nativeName;

const population = document.querySelector("#population");
population.textContent = recoveredCountry.population.toLocaleString();

const region = document.querySelector("#region");
region.textContent = recoveredCountry.region;

const subRegion = document.querySelector("#sub-region");
subRegion.textContent = recoveredCountry.subregion;

const capital = document.querySelector("#capital");
capital.textContent = recoveredCountry.capital ?? "- -";

const topLevelDomain = document.querySelector("#top-lvl-domain");
topLevelDomain.textContent = recoveredCountry.topLevelDomain;

const currencies = document.querySelector("#currencies");
currencies.textContent = recoveredCountry.currencies?.[0].name ?? "- -";

const languages = document.querySelector("#languages");
let languagesObj = recoveredCountry.languages;
languagesObj.forEach((item) => {
  languages.textContent += `${item.name},  ` ?? "- -";
});

let bordersCode = recoveredCountry.borders ?? [];

async function requestApi(param) {
  try {
    const response = await fetch(
      `https://api-rest-countries-tau.vercel.app/countries?alpha3Code=${param}`
    );
    const responseCountry = await response.json();
    return responseCountry[0].name;
  } catch {
    console.log("Not find");
  }
}

async function getNameBorderCountries() {
  let nameBordersCountries = await Promise.all(
    bordersCode.map(async (item) => {
      return await requestApi(item);
    })
  );

  return nameBordersCountries;
}

async function renderCards() {
  const borderCountriesList = document.querySelector("#border-list");

  const arrayNameCountries = await getNameBorderCountries();

  arrayNameCountries.map((item) => {
    borderCountriesList.innerHTML += `
    <div class="countries-front"><p>${item}</p></div>
  `;
  });

  reloadNewCountry();
}

renderCards();

function reloadNewCountry() {
  const borderCards = document.querySelectorAll(".countries-front");

  borderCards.forEach((item) => {
    item.addEventListener("click", async (e) => {
      let clickedCountry = e.currentTarget.querySelector("p").textContent;

      let newCountry = await resquestNameCountryClicked(clickedCountry);

      sessionStorage.setItem("countryInfos", JSON.stringify(newCountry));
      location.reload();
    });
  });
}

async function resquestNameCountryClicked(params) {
  try {
    const response = await fetch(
      `https://api-rest-countries-tau.vercel.app/countries?name=${params}`
    );

    const responseCountry = await response.json();
    return responseCountry[0];
  } catch {
    console.log("Not find");
  }
}

const backButton = document.querySelector("#back-button");

backButton.addEventListener("click", () => {
  window.location.href = "../index.html";
});

const themeButton = document.querySelector("#theme-button");

themeButton.addEventListener("click", changeTheme);

loadTheme();
