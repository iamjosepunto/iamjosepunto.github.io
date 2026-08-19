import { useAccordion } from "./AccordionContext";

type CollapsibleSectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

// Seccion colapsable conectada al acordeon global (solo una abierta a la vez).
// El contenido permanece SIEMPRE en el DOM (grid-rows) para no perder SEO; solo se
// oculta visualmente al estar cerrada.
const CollapsibleSection = ({ id, title, children }: CollapsibleSectionProps) => {
  const { openId, toggle } = useAccordion();
  const isOpen = openId === id;

  // Separa el emoji inicial del resto del titulo para alinear los nombres en columna.
  const firstSpace = title.indexOf(" ");
  const emoji = firstSpace === -1 ? "" : title.slice(0, firstSpace);
  const name = firstSpace === -1 ? title : title.slice(firstSpace + 1);

  return (
    <div>
      <div className="w-screen relative left-1/2 -translate-x-1/2 border-t border-yellow-400" />

      <button
        type="button"
        onClick={() => toggle(id)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-start gap-3 py-1 cursor-pointer bg-transparent border-0"
      >
        <span className="w-10 shrink-0 text-3xl text-center">{emoji}</span>

        <h2 className="text-4xl font-bold text-yellow-400 leading-none">
          {name}
        </h2>

        <svg
          viewBox="0 0 24 24"
          className={`w-7 h-7 text-yellow-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
        data-collapsible-content
        className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
