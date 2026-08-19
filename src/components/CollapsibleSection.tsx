import { useState } from "react";

type CollapsibleSectionProps = {
  title: string;
  children: React.ReactNode;
};

// Seccion colapsable: titulo estilo SectionTitle con flecha a la derecha del nombre.
// El contenido permanece SIEMPRE en el DOM (grid-rows) para no perder SEO; solo se
// oculta visualmente al estar cerrada. Empieza cerrada.
const CollapsibleSection = ({ title, children }: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="w-screen relative left-1/2 -translate-x-1/2 border-t border-yellow-400" />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-center gap-3 py-4 cursor-pointer bg-transparent border-0"
      >
        <h2 className="text-4xl font-bold text-yellow-400 text-center">
          {title}
        </h2>

        <svg
          viewBox="0 0 24 24"
          className={`w-7 h-7 text-yellow-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
