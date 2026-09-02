import { useEffect, useRef } from "react";

// Efectos de cursor (solo escritorio): anillo que acompana al raton sin retardo y crece
// sobre botones/enlaces, mas un punto central y un foco de luz ambiental. Puramente
// decorativo (no afecta al contenido ni al SEO). Respeta prefers-reduced-motion y no
// se activa en dispositivos tactiles.
const CursorEffects = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
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
    const arrow = arrowRef.current;
    const spot = spotRef.current;
    if (!ring || !dot || !spot || !arrow) return;

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
      // El anillo solo existe en reposo: sobre un enlace se apaga.
      ring.style.opacity = hovering ? "0" : "1";
      spot.style.opacity = "1";
      // Segun el modo, se ve el punto o la flecha.
      dot.style.opacity = hovering ? "0" : "1";
      arrow.style.opacity = hovering ? "1" : "0";
    };

    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      arrow.style.opacity = "0";
      spot.style.opacity = "0";
    };

    const grow = () => {
      hovering = true;
      // Modo flecha: solo la flecha, sin anillo ni punto.
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      arrow.style.opacity = "1";
    };
    const shrink = () => {
      hovering = false;
      // Modo normal: anillo y punto, sin flecha.
      ring.style.opacity = "1";
      dot.style.opacity = "1";
      arrow.style.opacity = "0";
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
      arrow.style.transform = posicion;
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
            "radial-gradient(circle, rgba(250,243,224,0.10) 0%, rgba(250,243,224,0.04) 40%, transparent 70%)",
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
          border: "2px solid #FAF3E0",
          borderRadius: "50%",
          pointerEvents: "none",
          opacity: 0,
          zIndex: 9999,
          transition: "opacity 0.2s ease",
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
          backgroundColor: "#FAF3E0",
          borderRadius: "50%",
          pointerEvents: "none",
          opacity: 0,
          zIndex: 9999,
          transition: "background-color 0.25s ease",
        }}
      />
      <div
        ref={arrowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 26,
          height: 26,
          pointerEvents: "none",
          opacity: 0,
          zIndex: 9999,
          transition: "opacity 0.2s ease",
        }}
      >
        {/* Flecha de contorno: interior transparente, solo se ven los trazos. */}
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="none"
          stroke="#FAF3E0"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M5 2.5 L5 19.5 L9.6 15.2 L12.6 21.8 L15.6 20.4 L12.7 14 L18.8 13.7 Z" />
        </svg>
      </div>
    </>
  );
};

export default CursorEffects;
