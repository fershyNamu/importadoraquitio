(function () {
    // true  = la nieve cae solo en el banner (hero) y cuando el filtro "Navidad" está activo
    // false = la nieve cae siempre, en toda la página
    const NIEVE_SOLO_EN_ZONAS = true;

    const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ----- Luces -----
    const luces = document.createElement("div");
    luces.className = "navidad-luces";
    for (let i = 0; i < 80; i++) luces.appendChild(document.createElement("span"));
    document.body.appendChild(luces);

    // ----- Nieve -----
    if (reducirMovimiento) return;

    const canvas = document.createElement("canvas");
    canvas.className = "navidad-nieve";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let w, h;
    function ajustar() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    ajustar();
    window.addEventListener("resize", ajustar);

    const cantidad = window.innerWidth < 750 ? 35 : 70;
    const copos = Array.from({ length: cantidad }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.5 + 1.5,
        vel: Math.random() * 0.8 + 0.5,
        fase: Math.random() * Math.PI * 2,
    }));

    let mostrar = false;
    let activo = false;
    let temporizador;

    function dibujar() {
        if (!activo) {
            ctx.clearRect(0, 0, w, h);
            return;
        }
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.strokeStyle = "rgba(110,150,215,0.55)";
        ctx.lineWidth = 1;

        copos.forEach(c => {
            c.y += c.vel;
            c.fase += 0.01;
            c.x += Math.sin(c.fase) * 0.4;
            if (c.y > h + 5) { c.y = -5; c.x = Math.random() * w; }

            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });
        requestAnimationFrame(dibujar);
    }

    function fijar(valor) {
        if (valor === mostrar) return;
        mostrar = valor;
        canvas.style.opacity = valor ? "1" : "0";
        if (valor) {
            clearTimeout(temporizador);
            if (!activo) {
                activo = true;
                requestAnimationFrame(dibujar);
            }
        } else {
            // espera a que termine el desvanecido y detiene la animación (ahorra batería)
            temporizador = setTimeout(() => { activo = false; }, 700);
        }
    }

    if (!NIEVE_SOLO_EN_ZONAS) {
        fijar(true);
        return;
    }

    // En la página de Inicio, la nieve cae siempre, de arriba a abajo
    const esPaginaInicio = document.body.dataset.nievePagina === "inicio";

    if (esPaginaInicio) {
        fijar(true);
        return;
    }

    // En las demás páginas: nieve mientras el hero esté visible, o si el filtro Navidad está activo
    const hero = document.querySelector(".hero");
    const filtros = document.getElementById("prodFilters");
    let heroVisible = false;

    function filtroNavidadActivo() {
        const boton = document.querySelector('.prod-filter[data-filter="navidad"]');
        return !!boton && boton.classList.contains("active");
    }

    function evaluar() {
        fijar(heroVisible || filtroNavidadActivo());
    }

    if (hero && "IntersectionObserver" in window) {
        new IntersectionObserver(entradas => {
            heroVisible = entradas[0].isIntersecting;
            evaluar();
        }, { threshold: 0.25 }).observe(hero);
    }

    if (hero && "IntersectionObserver" in window) {
        new IntersectionObserver(entradas => {
            heroVisible = entradas[0].isIntersecting;
            evaluar();
        }, { threshold: 0.25 }).observe(hero);
    }

    if (filtros) {
        new MutationObserver(evaluar).observe(filtros, {
            attributes: true,
            subtree: true,
            attributeFilter: ["class"],
        });
    }

    evaluar();
})();