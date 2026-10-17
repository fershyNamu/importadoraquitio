document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".variante-btn");
    const precioEl = document.getElementById("pdPrecio");
    const codigoEl = document.getElementById("pdCodigo");
    const imagenEl = document.getElementById("pdMainImage");

    if (!botones.length) return;

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            botones.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            if (precioEl) {
                precioEl.textContent = "$" + parseFloat(btn.dataset.precio).toFixed(2);
            }
            if (codigoEl) {
                codigoEl.textContent = btn.dataset.codigo;
            }
            if (imagenEl && btn.dataset.imagen) {
                imagenEl.src = btn.dataset.imagen;
            }

            // Actualiza la medida seleccionada
                        const medidaEl = document.getElementById("pdMedidaActual");
            if (medidaEl) {
                medidaEl.textContent = btn.dataset.medida;
            }
        });
    });

    // Activa la primera variante al cargar la página
    if (botones[0]) botones[0].click();
});