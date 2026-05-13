let terms = [];
const numberWords = document.getElementById("words");
fetch("terms.json")
  .then((response) => response.json())
  .then((data) => {
    terms = data;
    numberWords.textContent = `Around ${terms.length} have already been added.`;
    terms = terms.map(normalizeEntry);
    console.log(terms);
    displayResults(terms);
  })
  .catch((error) => {
    throw error;
  });

const form = document.getElementById("searchForm");
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

function normalizeEntry(item) {
  return {
    word: item.term || item.english || "",
    definition: item.definition || "",
    creole: item.haitian_creole || item.creole || "",
    category: item.category || "Unknown",
  };
}

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page reload

  const query = searchInput.value.toLowerCase().trim();

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a word</p>";
    return;
  }

  const filtered = terms.filter(
    (term) =>
      term.word.toLowerCase().includes(query) ||
      term.creole?.toLowerCase().includes(query) ||
      term.haitian_creole?.toLowerCase().includes(query) ||
      term.category?.toLowerCase().includes(query) ||
      term.definition?.toLowerCase().includes(query),
  );

  displayResults(filtered);
});

function displayResults(data) {
  resultsDiv.innerHTML = "";

  if (data.length === 0) {
    resultsDiv.innerHTML = "<p>No results found</p>";
    return;
  }

  data.forEach((term) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>English: ${term.word}</h3>
      <p>Creole: ${term.creole || term.haitian_creole}</p>
      <p>Category: ${term?.category || "No category"}</p>
      <p>Definition: ${term?.definition || "No definition available"}</p>
    `;

    resultsDiv.appendChild(card);
  });
}

// Search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filtered = terms.filter(
    (term) =>
      term.word.toLowerCase().includes(query) ||
      term.creole?.toLowerCase().includes(query) ||
      term.haitian_creole?.toLowerCase().includes(query) ||
      term.category?.toLowerCase().includes(query) ||
      term.definition?.toLowerCase().includes(query),
  );

  displayResults(filtered);
});

// Filter buttons
function filterCategory(category) {
  if (category === "All") {
    displayResults(terms);
  } else {
    const filtered = terms.filter((term) => term.category === category);
    displayResults(filtered);
  }
}

// Load all initially
displayResults(terms);
