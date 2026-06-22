import { useTranslation } from "react-i18next";

const PROFILE_URL = "https://es.linkedin.com/in/iamjosepunto?trk=profile-badge";

const LinkedInBadge = () => {
  const { t } = useTranslation();

  return (
    <div
      className="
        w-[300px]
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
        {/* Cabecera con logo LinkedIn */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200">
          <span
            className="text-[20px] font-bold text-slate-800"
            style={{ letterSpacing: "-0.5px" }}
          >
            Linked
          </span>
          <span
            className="
              inline-flex
              items-center
              justify-center
              ml-0.5
              w-[24px]
              h-[24px]
              rounded
              bg-[#0A66C2]
              text-white
              text-[13px]
              font-bold
            "
          >
            in
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
              {t("contact.li.cta")}
            </a>
          </div>
        </div>
    </div>
  );
};

export default LinkedInBadge;
