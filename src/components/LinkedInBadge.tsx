import { useEffect, useRef, useState } from "react";

const SCRIPT_SRC = "https://platform.linkedin.com/badges/js/profile.js";
const PROFILE_URL = "https://es.linkedin.com/in/iamjosepunto?trk=profile-badge";

const LinkedInBadge = () => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const render = () => {
      const w = window as unknown as { LIRenderAll?: () => void };
      if (typeof w.LIRenderAll === "function") {
        w.LIRenderAll();
      }
    };

    const existing = document.querySelector(
      `script[src="${SCRIPT_SRC}"]`
    ) as HTMLScriptElement | null;

    if (existing) {
      render();
    } else {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.type = "text/javascript";
      script.onload = render;
      document.body.appendChild(script);
    }

    // Detectar si el badge llegó a renderizar (LinkedIn inserta un <iframe>).
    const check = () => {
      if (cancelled) return;
      if (badgeRef.current?.querySelector("iframe")) {
        setRendered(true);
      }
    };
    const interval = window.setInterval(check, 400);
    const stop = window.setTimeout(() => window.clearInterval(interval), 6000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={badgeRef} className="flex justify-center">
        <div
          className="badge-base LI-profile-badge"
          data-locale="es_ES"
          data-size="medium"
          data-theme="light"
          data-type="VERTICAL"
          data-vanity="iamjosepunto"
          data-version="v1"
        >
          <a
            className="badge-base__link LI-simple-link"
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Jose .
          </a>
        </div>
      </div>

      {/* Respaldo: visible solo si la insignia no llegó a cargar */}
      {!rendered && (
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex
            items-center
            gap-2
            px-5
            py-2.5
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            text-ivory
            hover:border-blue-500
            transition
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-blue-400"
            aria-hidden="true"
          >
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
          </svg>
          LinkedIn
        </a>
      )}
    </div>
  );
};

export default LinkedInBadge;
