import { PROFILE } from "../data/profile";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const items = [
    {
      label: t("contact.email"),
      value: PROFILE.socials.email,
      href: `mailto:${PROFILE.socials.email}`,
    },
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
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
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
