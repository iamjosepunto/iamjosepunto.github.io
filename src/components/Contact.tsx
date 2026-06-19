import { useState } from "react";
import { PROFILE } from "../data/profile";
import { useTranslation } from "react-i18next";
import LinkedInBadge from "./LinkedInBadge";
import GitHubBadge from "./GitHubBadge";
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

  const links = [
    {
      label: t("contact.linkedin"),
      value: PROFILE.socials.linkedin.replace(/^https?:\/\//, ""),
      href: PROFILE.socials.linkedin,
    },
    {
      label: t("contact.github"),
      value: PROFILE.socials.github.replace(/^https?:\/\//, ""),
      href: PROFILE.socials.github,
    },
    {
      label: t("contact.web"),
      value: PROFILE.socials.web.replace(/^https?:\/\//, "").replace(/\/$/, ""),
      href: PROFILE.socials.web,
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
        "
      >
        <p className="text-lg text-ivory leading-relaxed mb-6">
          {t("contact.subtitle")}
        </p>

        <div className="flex flex-col gap-4">
          {/* Email: texto + botón Copiar (sin enlace) */}
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 text-left">
            <span className="text-sm font-semibold text-blue-400 sm:w-24 shrink-0">
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

          {/* Resto de enlaces */}
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-baseline
                sm:gap-3
                group
              "
            >
              <span className="text-sm font-semibold text-blue-400 sm:w-24 shrink-0">
                {item.label}
              </span>

              <span className="text-ivory group-hover:text-yellow-400 transition break-all">
                {item.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center items-stretch gap-6">
        <LinkedInBadge />
        <GitHubBadge />
      </div>
    </section>
  );
};

export default Contact;
