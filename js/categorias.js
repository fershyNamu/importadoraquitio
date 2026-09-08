/*
   BUSCADOR DE CATEGORÍAS
 */

const catSearch = document.getElementById("catSearch");
const catCards = document.querySelectorAll(".cat-card");
const catEmpty = document.getElementById("catEmpty");

if (catSearch) {

    catSearch.addEventListener("input", () => {

        const query = catSearch.value.trim().toLowerCase();
        let visibleCount = 0;

        catCards.forEach((card) => {

            const text = card.dataset.search || "";
            const matches = text.includes(query);

            card.classList.toggle("hidden-card", !matches);

            if (matches) {
                visibleCount++;
            }

        });

        catEmpty.classList.toggle("visible", visibleCount === 0);

    });

}