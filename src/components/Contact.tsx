import { useState } from "react";
import { PROFILE } from "../data/profile";
import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

type Item =
  | { name: string; href: string }
  | { name: string; pending: true };

type SubGroup = { subLabel?: string; items: Item[] };

type Group = {
  label: string;
  subGroups: SubGroup[];
};

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

  const groups: Group[] = [
    {
      label: t("contact.catSocial"),
      subGroups: [
        {
          items: [{ name: "LinkedIn", href: PROFILE.socials.linkedin }],
        },
      ],
    },
    {
      label: t("contact.catRepos"),
      subGroups: [
        {
          items: [
            { name: "GitHub", href: PROFILE.socials.github },
            { name: "GitLab", href: PROFILE.socials.gitlab },
            { name: "Bitbucket", pending: true },
            { name: "SourceForge", pending: true },
            { name: "Codeberg", pending: true },
          ],
        },
      ],
    },
    {
      label: t("contact.catCommunities"),
      subGroups: [
        {
          subLabel: t("contact.subBlogging"),
          items: [
            { name: "DEV.to", href: PROFILE.socials.devto },
            { name: "Hashnode", pending: true },
            { name: "Medium", pending: true },
          ],
        },
        {
          subLabel: t("contact.subQA"),
          items: [
            { name: "Stack Overflow", href: PROFILE.socials.stackoverflow },
            { name: "Quora", pending: true },
          ],
        },
        {
          subLabel: t("contact.subForums"),
          items: [
            { name: "Hacker News", pending: true },
            { name: "Reddit", pending: true },
          ],
        },
        {
          subLabel: t("contact.subPlaygrounds"),
          items: [
            { name: "CodePen", href: PROFILE.socials.codepen },
            { name: "Replit", pending: true },
            { name: "freeCodeCamp", pending: true },
          ],
        },
        {
          subLabel: t("contact.subDesign"),
          items: [{ name: "Dribbble", pending: true }],
        },
      ],
    },
    {
      label: t("contact.catPublic"),
      subGroups: [
        {
          subLabel: t("contact.subJobs"),
          items: [
            { name: "WellFound", href: PROFILE.socials.wellfound },
            { name: "Arc.dev", href: PROFILE.socials.arc },
          ],
        },
        {
          subLabel: t("contact.subPortfolio"),
          items: [
            { name: "Devpost", pending: true },
            { name: "Product Hunt", pending: true },
            { name: "Behance", pending: true },
          ],
        },
        {
          subLabel: t("contact.subCareer"),
          items: [{ name: "Polywork", pending: true }],
        },
        {
          subLabel: t("contact.subIdentity"),
          items: [
            { name: "Gravatar", pending: true },
            { name: "about.me", pending: true },
            { name: "Linktree", pending: true },
          ],
        },
      ],
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
        <p className="text-lg text-ivory leading-relaxed mb-3 text-center">
          {t("contact.subtitle")}
        </p>

        <p className="text-lg text-ivory leading-relaxed mb-6 text-center">
          <span className="text-yellow-400 font-semibold">
            {t("about.data.labels.contact")}
          </span>{" "}
          - {t("about.data.contact")}
        </p>

        <div className="flex flex-col gap-6">
          {/* Email: etiqueta centrada arriba + cajita con texto y botón Copiar */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-400 text-center mb-2 uppercase">
              {t("contact.email")}
            </span>

            <div className="border border-yellow-400 rounded-xl p-4">
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
          </div>

          {/* Grupos de enlaces por categoría */}
          {groups.map((group) => (
            <div key={group.label} className="flex flex-col">
              {/* Título de categoría: fuera de la cajita, arriba, centrado */}
              <span className="text-sm font-semibold text-blue-400 text-center mb-2 uppercase">
                {group.label}
              </span>

              {/* Cajita con borde amarillo */}
              <div className="border border-yellow-400 rounded-xl p-4">
                <div className="flex flex-col gap-4">
                  {group.subGroups.map((sub, sIdx) => (
                    <div key={sub.subLabel ?? sIdx} className="flex flex-col">
                      {/* Subtítulo de subcategoría (opcional) */}
                      {sub.subLabel && (
                        <span className="text-sm font-semibold text-yellow-300 mb-2">
                          {sub.subLabel}
                        </span>
                      )}

                      <div
                        className={`flex flex-col gap-3 ${
                          sub.subLabel ? "pl-1" : ""
                        }`}
                      >
                        {sub.items.map((item) =>
                          "pending" in item ? (
                            <div
                              key={item.name}
                              className="flex flex-col min-w-0"
                            >
                              <span className="text-base font-semibold text-slate-500">
                                {item.name}{" "}
                                <span className="text-sm font-normal text-slate-500">
                                  ({t("contact.pending")})
                                </span>
                              </span>
                            </div>
                          ) : (
                            <div
                              key={item.href}
                              className="flex flex-col min-w-0"
                            >
                              {/* Nombre del sitio encima del enlace */}
                              <span className="text-base font-semibold text-sky-300">
                                {item.name}
                              </span>
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-ivory hover:text-yellow-400 transition break-all"
                              >
                                {item.href
                                  .replace(/^https?:\/\//, "")
                                  .replace(/\/$/, "")}
                              </a>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
