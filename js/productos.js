document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("prodSearch");
    const filterButtons = document.querySelectorAll(".prod-filter");
    const cards = document.querySelectorAll("#prodGrid .product-card");
    const emptyMessage = document.getElementById("prodEmpty");

    let activeFilter = "todos";

    // Si venimos desde categorias.html con ?categoria=cocina, por ejemplo,
    // preseleccionamos ese filtro apenas carga la página.
    function applyFilterFromURL() {
        const params = new URLSearchParams(window.location.search);
        const categoria = params.get("categoria");

        if (!categoria) return;

        const targetButton = document.querySelector(`.prod-filter[data-filter="${categoria}"]`);

        if (targetButton) {
            filterButtons.forEach(b => b.classList.remove("active"));
            targetButton.classList.add("active");
            activeFilter = categoria;
        }
    }

const PRODUCTS_PER_PAGE = 12;
let currentPage = 1;
const pagination = document.getElementById("prodPagination");

currentPage = 1;

function applyFilters() {
    const query = (searchInput.value || "").toLowerCase().trim();
    const matchingCards = [];

    cards.forEach(card => {
        const category = card.dataset.category || "";
        const searchData = (card.dataset.search || "") + " " + card.querySelector("h3").textContent.toLowerCase();

        const matchesCategory = activeFilter === "todos" || category === activeFilter;
        const matchesSearch = query === "" || searchData.toLowerCase().includes(query);

        if (matchesCategory && matchesSearch) {
            matchingCards.push(card);
        } else {
            card.classList.add("hidden-card");
        }
    });

    emptyMessage.classList.toggle("visible", matchingCards.length === 0);

    const totalPages = Math.max(1, Math.ceil(matchingCards.length / PRODUCTS_PER_PAGE));
    if (currentPage > totalPages) currentPage = 1;

    matchingCards.forEach((card, index) => {
        const page = Math.floor(index / PRODUCTS_PER_PAGE) + 1;
        card.classList.toggle("hidden-card", page !== currentPage);
    });

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    pagination.innerHTML = "";
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = "page-btn" + (i === currentPage ? " active" : "");
        btn.addEventListener("click", () => {
            currentPage = i;
            applyFilters();
            document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
        });
        pagination.appendChild(btn);
    }
}

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");
            activeFilter = button.dataset.filter;
            applyFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    // Al cargar: aplicar filtro de la URL (si existe) y mostrar resultados
    applyFilterFromURL();
    applyFilters();

});