import { useEffect, useRef } from "react";

// Cursor personalizado (solo escritorio): una flecha que acompana al raton sin retardo.
// Puntero blanco en reposo; sobre botones y enlaces cambia a un dardo crema con borde
// azul claro que mide 37,4 px. Puramente decorativo (no afecta al contenido ni al SEO).
// Respeta prefers-reduced-motion y no se activa en dispositivos tactiles.

// Geometria. Las dos formas comparten la punta en (5, 2.5) dentro de un viewBox de 24
// unidades: es el punto que debe coincidir con el raton, porque el navegador dispara el
// hover en esa coordenada y no en el centro del dibujo. Al compartirla, cambiar de forma
// no desplaza el cursor.
const TAM = 26;
const VIEWBOX = 24;
const PUNTA_X = (5 * TAM) / VIEWBOX;
const PUNTA_Y = (2.5 * TAM) / VIEWBOX;
// 26 x 1.4375 = 37,4 px: el dardo conserva su tamano aunque el puntero en reposo sea
// mas pequeno.
const ESCALA_OVER = 1.4375;
const FORMA_REPOSO =
  "M5 2.5 L5 19.5 L9.6 15.2 L12.6 21.8 L15.6 20.4 L12.7 14 L18.8 13.7 Z";
const FORMA_OVER = "M5 2.5 L13 19.5 L13.5 12 L22 10.5 Z";

const CursorEffects = () => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // No activar en tactil o si el usuario prefiere menos movimiento.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reduceMotion) return;

    const arrow = arrowRef.current;
    const path = pathRef.current;
    if (!arrow || !path) return;

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

    // El color se fija en el contenedor: fill y stroke se heredan hasta el path. La forma
    // se cambia sustituyendo el trazado; entre trazados distintos no hay interpolacion
    // posible, asi que el cambio de silueta es instantaneo y solo el color se funde.
    const grow = () => {
      hovering = true;
      arrow.style.fill = "#FAF3E0";
      arrow.style.stroke = "#7dd3fc";
      path.setAttribute("d", FORMA_OVER);
    };
    const shrink = () => {
      hovering = false;
      arrow.style.fill = "#FFFFFF";
      arrow.style.stroke = "#FFFFFF";
      path.setAttribute("d", FORMA_REPOSO);
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

    // La punta cae exactamente sobre el raton, sin interpolacion. El escalado viaja en el
    // mismo transform: una transicion aqui arrastraria tambien la posicion.
    const animate = () => {
      arrow.style.transform =
        `translate(${mouseX - PUNTA_X}px, ${mouseY - PUNTA_Y}px) scale(${hovering ? ESCALA_OVER : 1})`;

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
        width: TAM,
        height: TAM,
        pointerEvents: "none",
        opacity: 0,
        zIndex: 9999,
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
        transformOrigin: `${PUNTA_X}px ${PUNTA_Y}px`,
        transition: "opacity 0.2s ease, fill 0.15s ease, stroke 0.15s ease",
      }}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        width={TAM}
        height={TAM}
        strokeWidth="0.75"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path ref={pathRef} d={FORMA_REPOSO} />
      </svg>
    </div>
  );
};

export default CursorEffects;
