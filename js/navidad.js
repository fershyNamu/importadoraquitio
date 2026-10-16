(function () {
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

    function dibujar() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.strokeStyle = "rgba(110,150,215,0.55)"; // borde azulado para que se vea sobre fondo blanco
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
    dibujar();
})();