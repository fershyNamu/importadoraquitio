const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

const nextButton = document.getElementById("nextSlide");
const prevButton = document.getElementById("prevSlide");

const menuButton = document.getElementById("menuButton");
const navMenu = document.querySelector(".nav-menu");

let currentSlide = 0;
let autoSlide;

/* MOSTRAR SLIDE */

function showSlide(index) {

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });


    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
}

/* SIGUIENTE */

function nextSlide() {

    let next = currentSlide + 1;

    if (next >= slides.length) {
        next = 0;
    }

    showSlide(next);
}

/* ANTERIOR */

function previousSlide() {

    let previous = currentSlide - 1;

    if (previous < 0) {
        previous = slides.length - 1;
    }

    showSlide(previous);
}

/* BOTONES (solo existen en el hero de home.html) */

if (nextButton && prevButton) {

    nextButton.addEventListener("click", () => {

        nextSlide();

        restartAutoSlide();

    });


    prevButton.addEventListener("click", () => {

        previousSlide();

        restartAutoSlide();

    });

}


/* DOTS */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

        restartAutoSlide();

    });

});

/* MENÚ MÓVIL */

if (menuButton && navMenu) {

    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });

}

/* AUTO SLIDER */

function startAutoSlide() {

    autoSlide = setInterval(() => {

        nextSlide();

    }, 5000);

}

function restartAutoSlide() {

    clearInterval(autoSlide);

    startAutoSlide();

}

startAutoSlide();