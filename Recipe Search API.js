// Creates variable for the following
const formInput = document.querySelector("form");
const recipe = document.querySelector(".recipes");
const container = document.querySelector(".search");
let searchQuery = "";

// Putting the API key and ID from Edamam
const api_id = "2ed68843";
const api_key = "4c7f745ba4c781aba6ad274cba998021";

// Calls the API if something is entered in the input of the form
formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

// A function is created to generate the new HTML and have variables for how many recipes are shown on screen with the searchURL
async function fetchAPI() {
  const searchURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${api_id}&app_key=${api_key}&from=0&to=9`;
  const response = await fetch(searchURL);
  const data = await response.json();
  HTML_change(data.hits);
  console.log(data);
}

// A function to generate HTML with the data from the API database
function HTML_change(results) {
  let HTML_change_gen = "";
  results.map((result) => {
    HTML_change_gen += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet: ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Nutritional Data"
        }</p>
        <p class="item-data">Health: ${result.recipe.healthLabels}</p>
      </div>
    `;
  });
  recipe.innerHTML = HTML_change_gen;
}
