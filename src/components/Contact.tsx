import { useState } from "react";
import { PROFILE } from "../data/profile";
import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

const Contact = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.socials.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROFILE.socials.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const groups = [
    {
      label: t("contact.catSocial"),
      links: [PROFILE.socials.linkedin],
    },
    {
      label: t("contact.catRepos"),
      links: [PROFILE.socials.github, PROFILE.socials.gitlab],
    },
    {
      label: t("contact.catCommunities"),
      links: [PROFILE.socials.devto, PROFILE.socials.stackoverflow],
    },
    {
      label: t("contact.catPublic"),
      links: [PROFILE.socials.wellfound, PROFILE.socials.arc],
    },
  ];

  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 py-4"
    >
      <SectionTitle>{t("contact.title")}</SectionTitle>

      <div
        className="
          w-fit
          max-w-full
          mx-auto
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
            transition
            hover:-translate-y-1
          "
      >
        <p className="text-lg text-ivory leading-relaxed mb-3">
          {t("contact.subtitle")}
        </p>

        <p className="text-lg text-ivory leading-relaxed mb-6 text-center">
          <span className="text-yellow-400 font-semibold">
            {t("about.data.labels.contact")}
          </span>{" "}
          - {t("about.data.contact")}
        </p>

        <div className="flex flex-col gap-6">
          {/* Email: texto + botón Copiar (sin enlace) */}
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 text-left">
            <span className="text-sm font-semibold text-blue-400 sm:w-56 shrink-0">
              {t("contact.email")}
            </span>

            <span className="text-ivory break-all flex items-center gap-3">
              {PROFILE.socials.email}
              <button
                onClick={copyEmail}
                className="text-base text-yellow-400 font-semibold shrink-0 cursor-pointer"
              >
                {copied ? t("contact.copied") : t("contact.copy")}
              </button>
            </span>
          </div>

          {/* Grupos de enlaces por categoría */}
          {groups.map((group) => (
            <div
              key={group.label}
              className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 text-left"
            >
              <span className="text-sm font-semibold text-blue-400 sm:w-56 shrink-0">
                {group.label}
              </span>

              <div className="flex flex-col gap-1 min-w-0">
                {group.links.map((href) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ivory hover:text-yellow-400 transition break-all"
                  >
                    {href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
