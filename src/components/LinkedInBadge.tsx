import { useEffect, useRef } from "react";

const LinkedInBadge = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SCRIPT_SRC = "https://platform.linkedin.com/badges/js/profile.js";

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
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center">
      <div
        className="badge-base LI-profile-badge"
        data-locale="es_ES"
        data-size="medium"
        data-theme="dark"
        data-type="VERTICAL"
        data-vanity="iamjosepunto"
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href="https://es.linkedin.com/in/iamjosepunto?trk=profile-badge"
        >
          Jose .
        </a>
      </div>
    </div>
  );
};

export default LinkedInBadge;
