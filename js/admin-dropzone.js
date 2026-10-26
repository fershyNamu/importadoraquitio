document.addEventListener("DOMContentLoaded", iniciarDropzones);

// Vuelve a revisar si aparecen inputs nuevos (ej: al agregar una fila de variante)
const observador = new MutationObserver(() => iniciarDropzones());
observador.observe(document.body, { childList: true, subtree: true });

function iniciarDropzones() {
    document.querySelectorAll('input[type="file"]').forEach(input => {
        if (input.dataset.dropzoneListo) return;
        input.dataset.dropzoneListo = "true";
        crearDropzone(input);
    });
}

function crearDropzone(input) {
    const zona = document.createElement("div");
    zona.className = "img-dropzone";
    zona.innerHTML = "<span>📷 Arrastra una imagen aquí o haz clic</span>";

    input.insertAdjacentElement("afterend", zona);
    input.style.display = "none";

    zona.addEventListener("click", () => input.click());

    ["dragenter", "dragover"].forEach(evento => {
        zona.addEventListener(evento, e => {
            e.preventDefault();
            e.stopPropagation();
            zona.classList.add("dragging");
        });
    });

    ["dragleave", "drop"].forEach(evento => {
        zona.addEventListener(evento, e => {
            e.preventDefault();
            e.stopPropagation();
            zona.classList.remove("dragging");
        });
    });

    zona.addEventListener("drop", e => {
        const archivos = e.dataTransfer.files;
        if (archivos.length) {
            input.files = archivos;
            input.dispatchEvent(new Event("change", { bubbles: true }));
            mostrarVistaPrevia(zona, archivos[0]);
        }
    });

    input.addEventListener("change", () => {
        if (input.files.length) mostrarVistaPrevia(zona, input.files[0]);
    });
}

function mostrarVistaPrevia(zona, archivo) {
    const lector = new FileReader();
    lector.onload = e => {
        zona.innerHTML = `<img src="${e.target.result}" class="dropzone-preview"><span>${archivo.name}</span>`;
    };
    lector.readAsDataURL(archivo);
}