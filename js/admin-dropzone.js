document.addEventListener("DOMContentLoaded", iniciarDropzones);

// Revisa si aparecen inputs nuevos (por ejemplo, al agregar una fila de variante)
new MutationObserver(iniciarDropzones).observe(document.body, { childList: true, subtree: true });

function iniciarDropzones() {
    document.querySelectorAll('input[type="file"]').forEach(input => {
        const siguiente = input.nextElementSibling;
        if (siguiente && siguiente.classList.contains("img-dropzone")) return;

        const zona = document.createElement("div");
        zona.className = "img-dropzone";
        zona.innerHTML = "<span>📷 Arrastra una imagen aquí o haz clic</span>";
        input.insertAdjacentElement("afterend", zona);
        input.style.display = "none";
    });
}

function zonaDe(e) {
    return e.target.closest ? e.target.closest(".img-dropzone") : null;
}

// Clic en la caja: abre el explorador de archivos
document.addEventListener("click", e => {
    const zona = zonaDe(e);
    if (zona && zona.previousElementSibling) zona.previousElementSibling.click();
});

// Resaltar la caja mientras arrastras un archivo encima
["dragenter", "dragover"].forEach(evento => {
    document.addEventListener(evento, e => {
        const zona = zonaDe(e);
        if (!zona) return;
        e.preventDefault();
        zona.classList.add("dragging");
    });
});

document.addEventListener("dragleave", e => {
    const zona = zonaDe(e);
    if (zona) zona.classList.remove("dragging");
});

// Soltar el archivo en la caja
document.addEventListener("drop", e => {
    const zona = zonaDe(e);
    if (!zona) return;
    e.preventDefault();
    zona.classList.remove("dragging");

    const input = zona.previousElementSibling;
    const archivos = e.dataTransfer.files;
    if (input && archivos.length) {
        input.files = archivos;
        input.dispatchEvent(new Event("change", { bubbles: true }));
    }
});

// Cuando hay un archivo elegido (por clic o por arrastre): vista previa
document.addEventListener("change", e => {
    const input = e.target;
    if (!input.matches || !input.matches('input[type="file"]')) return;

    const zona = input.nextElementSibling;
    if (!zona || !zona.classList.contains("img-dropzone") || !input.files.length) return;

    const archivo = input.files[0];
    const lector = new FileReader();
    lector.onload = ev => {
        zona.innerHTML = `<img src="${ev.target.result}" class="dropzone-preview"><span>${archivo.name}</span>`;
    };
    lector.readAsDataURL(archivo);
});