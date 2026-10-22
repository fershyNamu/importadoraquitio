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
        const subFiltersContainer = document.getElementById("prodSubFilters");
        let activeSubFilter = "todas";
        const searchData = (card.dataset.search || "") + " " + card.querySelector("h3").textContent.toLowerCase();
        const matchesCategory = activeFilter === "todos" || category === activeFilter;
        const subcategoria = card.dataset.subcategoria || "";
        const matchesSubcategory = activeSubFilter === "todas" || subcategoria === activeSubFilter;        const matchesSearch = query === "" || searchData.toLowerCase().includes(query);

        if (matchesCategory && matchesSubcategory && matchesSearch) {
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

function renderSubFilters(categoria) {
    subFiltersContainer.innerHTML = "";
    activeSubFilter = "todas";

    if (categoria === "todos") return;

    const subcategoriasEncontradas = new Set();
    cards.forEach(card => {
        if (card.dataset.category === categoria && card.dataset.subcategoria) {
            subcategoriasEncontradas.add(card.dataset.subcategoria);
        }
    });

    if (subcategoriasEncontradas.size === 0) return;

    function agregarChip(valor, texto) {
        const btn = document.createElement("button");
        btn.textContent = texto;
        btn.className = "sub-filter" + (valor === "todas" ? " active" : "");
        btn.addEventListener("click", () => {
            subFiltersContainer.querySelectorAll(".sub-filter").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeSubFilter = valor;
            currentPage = 1;
            applyFilters();
        });
        subFiltersContainer.appendChild(btn);
    }

    agregarChip("todas", "Todas");
    Array.from(subcategoriasEncontradas).sort().forEach(sub => {
        const textoBonito = sub.charAt(0).toUpperCase() + sub.slice(1);
        agregarChip(sub, textoBonito);
    });
}

function renderPagination(totalPages) {
    pagination.innerHTML = "";
    if (totalPages <= 1) return;

    function agregarBoton(numero) {
        const btn = document.createElement("button");
        btn.textContent = numero;
        btn.className = "page-btn" + (numero === currentPage ? " active" : "");
        btn.addEventListener("click", () => {
            currentPage = numero;
            applyFilters();
            document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
        });
        pagination.appendChild(btn);
    }

    function agregarPuntos() {
        const span = document.createElement("span");
        span.textContent = "...";
        span.className = "page-dots";
        pagination.appendChild(span);
    }

    const vecinas = 1; // cuántas páginas mostrar a cada lado de la actual
    const paginasAMostrar = [];

    for (let i = 1; i <= totalPages; i++) {
        const esPrimeraOUltima = i === 1 || i === totalPages;
        const esCercanaALaActual = i >= currentPage - vecinas && i <= currentPage + vecinas;
        if (esPrimeraOUltima || esCercanaALaActual) {
            paginasAMostrar.push(i);
        }
    }

    let anterior = 0;
    paginasAMostrar.forEach(numero => {
        if (anterior && numero - anterior > 1) {
            agregarPuntos();
        }
        agregarBoton(numero);
        anterior = numero;
    });
}


    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");
            activeFilter = button.dataset.filter;
            currentPage = 1;
            renderSubFilters(activeFilter);
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