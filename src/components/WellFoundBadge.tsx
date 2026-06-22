import { useTranslation } from "react-i18next";

const PROFILE_URL = "https://wellfound.com/u/iamjosepunto";

const WellFoundBadge = () => {
  const { t } = useTranslation();

  return (
    <div
      className="
        w-fit
        bg-white
        rounded-md
        overflow-hidden
        border
        border-slate-300
        shadow-sm
        text-center
        flex
        flex-col
        transition
        hover:-translate-y-1
      "
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      {/* Cabecera con logo WellFound */}
      <div className="flex items-center justify-center px-6 py-3 border-b border-slate-200">
        <span
          className="
            inline-flex
            items-center
            justify-center
            mr-2
            w-8
            h-8
            rounded
            bg-slate-900
            text-white
            text-[20px]
            font-black
          "
        >
          w
        </span>
        <span
          className="text-[24px] font-bold text-slate-900"
          style={{ letterSpacing: "-0.3px" }}
        >
          wellfound
        </span>
      </div>

      {/* Cuerpo */}
      <div className="px-4 pt-4 pb-5 flex flex-col flex-1">
        <div className="mt-auto">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              px-5
              py-1.5
              rounded-full
              border-2
              border-[#0A66C2]
              text-[#0A66C2]
              text-[13px]
              font-semibold
              hover:bg-[#0A66C2]
              hover:text-white
              transition
            "
          >
            {t("contact.wf.cta")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default WellFoundBadge;
