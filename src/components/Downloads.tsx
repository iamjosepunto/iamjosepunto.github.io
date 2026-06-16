import { useTranslation } from "react-i18next";

const CV_FILE = "CV_summary_Jose ._June_2026_En-Es.pdf";

const Downloads = () => {
  const { t } = useTranslation();

  const href = "/" + encodeURI(CV_FILE);

  return (
    <section
      id="downloads"
      className="max-w-5xl mx-auto px-6 py-4"
    >
      <h2
        className="
          text-4xl
          font-bold
          mb-6
          text-yellow-400
          text-center
          w-full
        "
      >
        {t("downloads.title")}
      </h2>

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
        "
      >
        <a
          href={href}
          download={CV_FILE}
          className="
            inline-flex
            items-center
            gap-3
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>

          {t("downloads.label")}
        </a>

        <p className="text-sm text-slate-400">
          {t("downloads.note")}
        </p>
      </div>
    </section>
  );
};

export default Downloads;
