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
        <div className="px-4 pt-4 pb-5">
          <img
            src="/FotoJosePunto.jpg"
            alt={t("contact.li.name")}
            className="w-[72px] h-[72px] rounded-full object-cover mx-auto mb-3"
          />

          <div className="text-[15px] font-semibold text-slate-900">
            {t("contact.li.name")}
          </div>

          <p className="text-[12px] text-slate-600 leading-snug mt-1 px-1">
            {t("contact.li.headline")}
          </p>

          <p className="text-[11px] text-slate-500 mt-2">
            {t("contact.li.school")}
          </p>

          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              mt-4
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
  );
};

export default LinkedInBadge;
