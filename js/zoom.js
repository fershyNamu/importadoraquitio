document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("pdImageContainer");
    const image = document.getElementById("pdMainImage");
    const lens = document.getElementById("imgZoomLens");

    if (!imageContainer || !image || !lens) return;

    const zoomLevel = 2.5;

    lens.style.backgroundImage = `url('${image.src}')`;

    imageContainer.addEventListener("mousemove", (e) => {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
            lens.style.display = "none";
            return;
        }

        lens.style.display = "block";

        const lensSize = lens.offsetWidth;
        lens.style.left = (x - lensSize / 2) + "px";
        lens.style.top = (y - lensSize / 2) + "px";

        lens.style.backgroundSize = (rect.width * zoomLevel) + "px " + (rect.height * zoomLevel) + "px";
        lens.style.backgroundPosition = `-${x * zoomLevel - lensSize / 2}px -${y * zoomLevel - lensSize / 2}px`;
    });

    imageContainer.addEventListener("mouseleave", () => {
        lens.style.display = "none";
    });
});