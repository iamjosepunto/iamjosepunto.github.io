import { useTranslation } from "react-i18next";
import CollapsibleSection from "./CollapsibleSection";

const CV_FILE = "Summary_CV_Jose ._June_2026_En-Es.pdf";

const Downloads = () => {
  const { t } = useTranslation();

  const href = "/" + encodeURI(CV_FILE);

  return (
    <section
      id="downloads"
      className="max-w-5xl mx-auto px-6 py-0"
    >
      <CollapsibleSection id="downloads" title={t("downloads.title")}>

      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
          flex
          flex-col
          items-center
          text-center
          gap-4
            transition
            hover:-translate-y-1
          "
      >
        <p className="text-sm text-slate-400">
          {t("downloads.note")}
        </p>

        <a
          href={href}
          download={CV_FILE}
          className="
            inline-flex
            items-center
            gap-3
            max-w-md
            px-6
            py-3
            rounded-xl
            bg-yellow-400
            text-slate-950
            font-bold
            hover:bg-yellow-300
            transition
            cursor-pointer
          "
        >
          {/* Icono documento tipo currículum */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 shrink-0"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="16" y2="17" />
            <line x1="8" y1="9" x2="10" y2="9" />
          </svg>

          {/* Icono descarga */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 shrink-0"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>

          {t("downloads.label")}
        </a>
      </div>
    </CollapsibleSection>
    </section>
  );
};

export default Downloads;
