document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("search-bar");
  const searchResults = document.getElementById("search-results");

  // Asegúrate de que el DOM cargó correctamente
  if (!searchBar || !searchResults) {
    console.error("No se encontraron elementos de búsqueda en el DOM.");
    return;
  }

  let searchIndex = [];

  // Cargar el índice de búsqueda desde el archivo JSON
  fetch("/search-index.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el índice de búsqueda");
      }
      return response.json();
    })
    .then((data) => {
      searchIndex = data;
      console.log("Índice de búsqueda cargado:", searchIndex);
    })
    .catch((error) => {
      console.error("Error al cargar el índice de búsqueda:", error);
    });

  // Realizar la búsqueda
  function performSearch(query) {
    searchResults.innerHTML = ""; // Limpiar resultados previos
    if (!query) return; // Si no hay consulta, no mostrar nada

    const results = searchIndex.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
      const contentMatch = item.content.toLowerCase().includes(query.toLowerCase());
      return titleMatch || contentMatch;
    });

    if (results.length > 0) {
      results.forEach((item) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<a href="${item.url}" class="text-decoration-none">${item.title}</a>`;
        searchResults.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.className = "list-group-item text-muted";
      li.textContent = "No se encontraron resultados.";
      searchResults.appendChild(li);
    }
  }

  // Escuchar el evento 'input' para buscar en tiempo real
  searchBar.addEventListener("input", function () {
    const query = searchBar.value.trim();
    performSearch(query);
  });
});
