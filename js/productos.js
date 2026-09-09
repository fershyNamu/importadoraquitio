document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("prodSearch");
    const filterButtons = document.querySelectorAll(".prod-filter");
    const cards = document.querySelectorAll("#prodGrid .product-card");
    const emptyMessage = document.getElementById("prodEmpty");

    let activeFilter = "todos";

    function applyFilters() {
        const query = (searchInput.value || "").toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(card => {
            const category = card.dataset.category || "";
            const searchData = (card.dataset.search || "") + " " + card.querySelector("h3").textContent.toLowerCase();

            const matchesCategory = activeFilter === "todos" || category === activeFilter;
            const matchesSearch = query === "" || searchData.toLowerCase().includes(query);

            const visible = matchesCategory && matchesSearch;
            card.classList.toggle("hidden-card", !visible);

            if (visible) visibleCount++;
        });

        emptyMessage.classList.toggle("visible", visibleCount === 0);
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

});