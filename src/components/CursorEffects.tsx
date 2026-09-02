import { useEffect, useRef } from "react";

// Cursor personalizado (solo escritorio): una flecha que acompana al raton sin retardo.
// Blanca en reposo; sobre botones y enlaces pasa a relleno crema con borde azul claro y
// crece un 5%. Puramente decorativo (no afecta al contenido ni al SEO). Respeta
// prefers-reduced-motion y no se activa en dispositivos tactiles.
const CursorEffects = () => {
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // No activar en tactil o si el usuario prefiere menos movimiento.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reduceMotion) return;

    const arrow = arrowRef.current;
    if (!arrow) return;

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
      arrow.style.opacity = "1";
    };

    const onLeave = () => {
      arrow.style.opacity = "0";
    };

    // El color se fija en el contenedor: fill y stroke se heredan hasta el path.
    const grow = () => {
      hovering = true;
      arrow.style.fill = "#FAF3E0";
      arrow.style.stroke = "#7dd3fc";
    };
    const shrink = () => {
      hovering = false;
      arrow.style.fill = "#FFFFFF";
      arrow.style.stroke = "#FFFFFF";
    };

    // Delegacion: reaccionar sobre elementos interactivos.
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

    // Posicion exacta sobre el raton, sin interpolacion. El 5% viaja en el mismo
    // transform: una transicion aqui haria que la posicion tambien se arrastrase.
    const animate = () => {
      arrow.style.transform =
        `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(${hovering ? 1.05 : 1})`;

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
    <div
      ref={arrowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 32.5,
        height: 32.5,
        pointerEvents: "none",
        opacity: 0,
        zIndex: 9999,
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
        transition: "opacity 0.2s ease, fill 0.15s ease, stroke 0.15s ease",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="32.5"
        height="32.5"
        strokeWidth="0.75"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M5 2.5 L5 19.5 L9.6 15.2 L12.6 21.8 L15.6 20.4 L12.7 14 L18.8 13.7 Z" />
      </svg>
    </div>
  );
};

export default CursorEffects;
