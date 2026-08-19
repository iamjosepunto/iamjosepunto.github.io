import { createContext, useContext, useState } from "react";

type AccordionContextType = {
  openId: string | null;
  toggle: (id: string) => void;
  open: (id: string) => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

// Proveedor del acordeon: mantiene que id de seccion esta abierto (solo uno a la vez).
export const AccordionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

  const open = (id: string) => setOpenId(id);

  return (
    <AccordionContext.Provider value={{ openId, toggle, open }}>
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error("useAccordion debe usarse dentro de AccordionProvider");
  }
  return ctx;
};
