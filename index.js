let terms = []

const numberWords = document.getElementById("words");
const form = document.getElementById("searchForm");
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");


fetch("terms.json").then(response => response.json()).then(data =>{
    terms = data;
    displayResults(terms);
    numberWords.textContent = `Around ${terms.length} terminologies have already added.`
}).catch(error =>{
    throw error;
});


form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page reload

  const query = searchInput.value.toLowerCase().trim();

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a word</p>";
    return;
  }

  const filtered = terms.filter(term =>
    term.english.toLowerCase().includes(query) ||
    term.creole.toLowerCase().includes(query) ||
    term.spanish.toLowerCase().includes(query)
  );

  displayResults(filtered);
});

function displayResults(data) {
  if (data.length === 0) {
    resultsDiv.innerHTML = "<p>No results found</p>";
    return;
  }

  data.forEach(term => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>English: ${term.english}</h3>
      <p>Creole: ${term.creole}</p>
      <p>Spanish: ${term.spanish}</p>
      <span>${term.category}</span>
    `;

    resultsDiv.appendChild(card);
  });
}

// Search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filtered = terms.filter(term =>
    term.english.toLowerCase().includes(query) ||
    term.creole.toLowerCase().includes(query) ||
    term.spanish.toLowerCase().includes(query) ||
    term.category.toLowerCase().includes(query)
  );

  displayResults(filtered);
});

// Filter buttons
function filterCategory(category) {
  if (category === "All") {
    displayResults(terms);
  } else {
    const filtered = terms.filter(term => term.category === category);
    displayResults(filtered);
  }
}

// Load all initially
displayResults(terms);