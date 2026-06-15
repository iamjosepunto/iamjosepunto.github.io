import { useState } from "react";
import { PROFILE } from "../data/profile";
import { useTranslation } from "react-i18next";

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
        {t("contact.title")}
      </h2>

      <div
        className="
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
          {/* Email: botón que copia al portapapeles */}
          <button
            onClick={copyEmail}
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-baseline
              sm:gap-3
              text-left
              cursor-pointer
              group
            "
          >
            <span className="text-sm font-semibold text-blue-400 sm:w-24 shrink-0">
              {t("contact.email")}
            </span>

            <span className="text-ivory group-hover:text-yellow-400 transition break-all">
              {PROFILE.socials.email}
            </span>

            <span className="text-xs text-slate-400 group-hover:text-yellow-400 transition shrink-0">
              {copied ? t("contact.copied") : t("contact.copy")}
            </span>
          </button>

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
    </section>
  );
};

export default Contact;
