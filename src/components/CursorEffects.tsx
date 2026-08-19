import { useEffect, useRef } from "react";

// Efectos de cursor (solo escritorio): anillo magnetico que sigue al raton con retardo
// suave y crece sobre botones/enlaces, mas un punto central exacto y un foco de luz
// ambiental. Puramente decorativo (no afecta al contenido ni al SEO). Respeta
// prefers-reduced-motion y no se activa en dispositivos tactiles.
const CursorEffects = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
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
    const spot = spotRef.current;
    if (!ring || !dot || !spot) return;

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
    let ringX = mouseX;
    let ringY = mouseY;
    let spotX = mouseX;
    let spotY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ring.style.opacity = "1";
      dot.style.opacity = "1";
      spot.style.opacity = "1";
    };

    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      spot.style.opacity = "0";
    };

    const grow = () => {
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.backgroundColor = "rgba(250,204,21,0.15)";
    };
    const shrink = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.backgroundColor = "transparent";
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

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      spotX += (mouseX - spotX) * 0.12;
      spotY += (mouseY - spotY) * 0.12;
      spot.style.transform = `translate(${spotX}px, ${spotY}px) translate(-50%, -50%)`;

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
            "width 0.25s ease, height 0.25s ease, background-color 0.25s ease",
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
        }}
      />
    </>
  );
};

export default CursorEffects;
