import { useEffect, useRef } from "react";

// Efectos de cursor (solo escritorio): anillo que acompana al raton sin retardo y crece
// sobre botones/enlaces, mas un punto central y un foco de luz ambiental. Puramente
// decorativo (no afecta al contenido ni al SEO). Respeta prefers-reduced-motion y no
// se activa en dispositivos tactiles.
const CursorEffects = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // No activar en tactil o si el usuario prefiere menos movimiento.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reduceMotion) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const cross = crossRef.current;
    const spot = spotRef.current;
    if (!ring || !dot || !spot || !cross) return;

    document.body.classList.add("cursor-fx-active");
    // Oculta el cursor nativo (incluido sobre enlaces/botones) mientras los efectos
    // estan activos, mediante una regla global inyectada.
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-cursor-fx", "");
    styleEl.textContent =
      ".cursor-fx-active, .cursor-fx-active * { cursor: none !important; }";
    document.head.appendChild(styleEl);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ring.style.opacity = "1";
      spot.style.opacity = "1";
      // Segun el modo, se ve el punto o la cruz.
      dot.style.opacity = hovering ? "0" : "1";
      cross.style.opacity = hovering ? "1" : "0";
    };

    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      cross.style.opacity = "0";
      spot.style.opacity = "0";
    };

    const grow = () => {
      hovering = true;
      ring.style.width = "45px";
      ring.style.height = "45px";
      ring.style.backgroundColor = "rgba(34,197,94,0.15)";
      ring.style.borderColor = "#22c55e";
      // Modo mira: ocultar el punto y mostrar la cruz.
      dot.style.opacity = "0";
      cross.style.opacity = "1";
    };
    const shrink = () => {
      hovering = false;
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.backgroundColor = "transparent";
      ring.style.borderColor = "#facc15";
      // Modo normal: mostrar el punto y ocultar la cruz.
      dot.style.opacity = "1";
      cross.style.opacity = "0";
    };

    // Delegacion: crecer sobre elementos interactivos.
    const isInteractive = (el: Element | null) =>
      !!el &&
      !!el.closest(
        'a, button, [role="button"], input, textarea, select, summary, label'
      );

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) grow();
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) shrink();
    };

    // Los cuatro elementos se posicionan exactamente sobre el raton, sin interpolacion.
    // La escritura se mantiene dentro de requestAnimationFrame para no tocar el DOM mas
    // veces de las que el navegador pinta.
    const animate = () => {
      const posicion = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      ring.style.transform = posicion;
      dot.style.transform = posicion;
      cross.style.transform = posicion;
      spot.style.transform = posicion;

      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("cursor-fx-active");
      styleEl.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={spotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(250,204,21,0.10) 0%, rgba(250,204,21,0.04) 40%, transparent 70%)",
          pointerEvents: "none",
          opacity: 0,
          zIndex: 9998,
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          border: "2px solid #facc15",
          borderRadius: "50%",
          pointerEvents: "none",
          opacity: 0,
          zIndex: 9999,
          transition:
            "width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          backgroundColor: "#facc15",
          borderRadius: "50%",
          pointerEvents: "none",
          opacity: 0,
          zIndex: 9999,
          transition: "background-color 0.25s ease",
        }}
      />
      <div
        ref={crossRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 63,
          height: 63,
          pointerEvents: "none",
          opacity: 0,
          zIndex: 9999,
          transition: "opacity 0.2s ease",
        }}
      >
        {/* Linea horizontal */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: 2,
            backgroundColor: "#22c55e",
            transform: "translateY(-50%)",
          }}
        />
        {/* Linea vertical */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            height: "100%",
            width: 2,
            backgroundColor: "#22c55e",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </>
  );
};

export default CursorEffects;
