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
        <h2>${card.name}</h2>
        <p><strong>Population:</strong> ${card.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${card.region}</p>
        <p><strong>Capital:</strong> ${card.capital}</p>
      </div>
    </div>
    `;
  });

  countriesList.innerHTML = cardsHTML;
}

const input = document.querySelector("#search");

input.addEventListener("input", debounce(eventInputSearch, 1000));

function eventInputSearch(event) {
  if (!data) return;

  countriesList.innerHTML = "";
  let countries = data;
  let valueSearch = event.target.value;
  let filtredCountries = countries.filter(
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
