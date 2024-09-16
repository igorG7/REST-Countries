let recoveredCountry = JSON.parse(sessionStorage.getItem("countryInfos"));

console.log(recoveredCountry);

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
