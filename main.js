const countriesList = document.querySelector("#countries-list");

async function requestData() {
  try {
    const response = await fetch("data/data.json");
    const data = await response.json();
    console.log(data);
    createCards(data);
  } catch {
    console.log("Not found file");
  }
}

requestData();

function createCards(data) {
  data.forEach((card) => {
    countriesList.innerHTML += `
    <div class="country">
      <div class="flag">
        <img src=${card.flags.png} alt="Country Flag" />
      </div>

      <div class="country-infos">
        <h2>${card.name}</h2>
        <p><strong>Population:</strong> ${card.population}</p>
        <p><strong>Region:</strong> ${card.region}</p>
        <p><strong>Capital:</strong> ${card.capital}</p>
      </div>
    </div>
    `;
  });
}
