const countriesList = document.querySelector("#countries-list");
let data;

async function requestData() {
  try {
    const response = await fetch("data/data.json");
    data = await response.json();
    //   console.log(data);
    createCards(data);
    return data;
  } catch {
    console.log("Not found file");
  }
}

requestData();

function createCards(data) {
  let cardsHTML = "";

  data.forEach((card) => {
    cardsHTML += `
    <div class="country">
      <div class="flag">
        <img src=${card.flags.png} alt="Country Flag" />
      </div>

      <div class="country-infos">
        <h2 class="name-country">${card.name}</h2>
        <p><strong>Population:</strong> ${card.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${card.region}</p>
        <p><strong>Capital:</strong> ${card.capital}</p>
      </div>
    </div>
    `;
  });

  countriesList.innerHTML = cardsHTML;

  redirectDetails();
  getCountryObject();
}

function redirectDetails() {
  const countriesCards = document.querySelectorAll(".country");

  countriesCards.forEach((element) => {
    element.addEventListener("click", function () {
      window.location.href = "page/details.html";
    });
  });
}

function getCountryObject() {
  const countriesCards = document.querySelectorAll(".country");

  countriesCards.forEach((element) => {
    element.addEventListener("click", storeCountryObject);
  });
}

function storeCountryObject(event) {
  let selectedCountryName = event.currentTarget.querySelector("h2").textContent;
  let foundCountry = data.find((item) => item.name === selectedCountryName);
  sessionStorage.setItem("countryInfos", JSON.stringify(foundCountry));
  console.log(selectedCountryName, foundCountry);
}

const input = document.querySelector("#search");

input.addEventListener("input", debounce(eventInputSearch, 1000));

function eventInputSearch(event) {
  if (!data) return;

  countriesList.innerHTML = "";
  let valueSearch = event.target.value;
  let filtredCountries = data.filter(
    (item) => item.name.toLowerCase().indexOf(valueSearch.toLowerCase()) > -1
  );

  createCards(filtredCountries);
}

function debounce(func, delay) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const regionOptions = Array.from(document.querySelectorAll(".region-option"));

regionOptions.forEach((option) => {
  option.addEventListener("click", filterByRegion);
});

function filterByRegion(event) {
  let itemAttribute = event.target.getAttribute("data-region");

  if (!data) return;

  let filtredRegion = data.filter(
    (item) => item.region.toLowerCase() === itemAttribute.toLowerCase()
  );

  createCards(filtredRegion);
}
