import { useState } from "react";
import { PROFILE } from "../data/profile";
import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

type Item =
  | { name: string; href: string; indexed?: boolean; sharesToLinkedIn?: boolean }
  | { name: string; pending: true };

type SubGroup = { subLabel?: string; subTag?: string; items: Item[] };

type Group = {
  label?: string;
  subGroups: SubGroup[];
};

type Block = {
  label: string;
  groups: Group[];
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

  const blocks: Block[] = [
    {
      label: t("contact.blockTech"),
      groups: [
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
                { name: "DEV.to", href: PROFILE.socials.devto, indexed: true },
                { name: "Hashnode", href: PROFILE.socials.hashnode },
              ],
            },
            {
              subLabel: t("contact.subQA"),
              items: [{ name: "Stack Overflow", href: PROFILE.socials.stackoverflow }],
            },
            {
              subLabel: t("contact.subPlaygrounds"),
              items: [
                { name: "CodePen", href: PROFILE.socials.codepen },
                { name: "Replit", pending: true },
              ],
            },
            {
              subLabel: t("contact.subLearning"),
              items: [{ name: "freeCodeCamp", pending: true }],
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
              ],
            },
          ],
        },
      ],
    },
    {
      label: t("contact.blockGeneralist"),
      groups: [
        {
          label: t("contact.catNetworks"),
          subGroups: [
            {
              items: [
                { name: "LinkedIn", href: PROFILE.socials.linkedin, indexed: true },
                { name: "Polywork", pending: true },
                { name: "Xing", pending: true },
                { name: "Read.cv", pending: true },
              ],
            },
          ],
        },
        {
          label: t("contact.catSocial"),
          subGroups: [
            {
              items: [
                { name: "X (Twitter)", pending: true },
                { name: "Instagram", pending: true },
                { name: "Bluesky", pending: true },
                { name: "Mastodon", pending: true },
              ],
            },
          ],
        },
        {
          label: t("contact.catBloggingGen"),
          subGroups: [
            {
              items: [
                { name: "Medium", href: PROFILE.socials.medium, sharesToLinkedIn: true },
                { name: "Substack", pending: true },
              ],
            },
          ],
        },
        {
          label: t("contact.subQA"),
          subGroups: [
            {
              items: [{ name: "Quora", pending: true }],
            },
          ],
        },
        {
          label: t("contact.subForums"),
          subGroups: [
            {
              items: [
                { name: "Hacker News", pending: true },
                { name: "Reddit", pending: true },
              ],
            },
          ],
        },
        {
          label: t("contact.subDesign"),
          subGroups: [
            {
              items: [
                { name: "Dribbble", pending: true },
                { name: "Behance", pending: true },
              ],
            },
          ],
        },
      ],
    },
    {
      label: t("contact.blockIdentity"),
      groups: [
        {
          subGroups: [
            {
              items: [
                { name: "Gravatar", href: PROFILE.socials.gravatar },
                { name: "about.me", href: PROFILE.socials.aboutme },
                { name: "Linktree", href: PROFILE.socials.linktree },
              ],
            },
          ],
        },
      ],
    },
  ];

  const renderItems = (items: Item[]) => (
    <>
      {items.map((item) =>
        "pending" in item ? (
          <div key={item.name} className="flex flex-col min-w-0">
            <span className="text-base font-semibold text-slate-500">
              {item.name}{" "}
              <span className="text-sm font-normal text-slate-500">
                ({t("contact.pending")})
              </span>
            </span>
          </div>
        ) : (
          <div key={item.href} className="flex flex-col min-w-0">
            <span className="text-base font-semibold text-sky-300">
              {item.name}
              {item.indexed && (
                <span className="text-sm font-normal text-slate-500"> [i]</span>
              )}
              {item.sharesToLinkedIn && (
                <span className="text-sm font-normal text-slate-500"> [+L]</span>
              )}
            </span>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-ivory hover:text-yellow-400 transition break-all"
            >
              {item.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          </div>
        )
      )}
    </>
  );

  const renderSubGroups = (group: Group) => (
    <div className="flex flex-col gap-4">
      {group.subGroups.map((sub, sIdx) => (
        <div key={sub.subLabel ?? sIdx} className="flex flex-col">
          {sub.subLabel && (
            <span className="text-sm font-semibold text-yellow-300 mb-2">
              {sub.subLabel}
              {sub.subTag && (
                <span className="text-sm font-normal text-slate-500">
                  {" "}
                  {sub.subTag}
                </span>
              )}
            </span>
          )}

          <div className={`flex flex-col gap-3 ${sub.subLabel ? "pl-4" : ""}`}>
            {renderItems(sub.items)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderGroup = (group: Group, gIdx: number) => {
    // Grupo sin label (p. ej. bloque Identidad): sin cajita interior,
    // los ítems van directos dentro del contenedor del bloque.
    if (!group.label) {
      return (
        <div key={gIdx} className="flex flex-col">
          {renderSubGroups(group)}
        </div>
      );
    }

    // Grupo con label: subcabecera a la izquierda + cajita con borde amarillo.
    return (
      <div key={group.label} className="flex flex-col">
        <span className="text-sm font-semibold text-blue-400 text-left mb-2 uppercase">
          {group.label}
        </span>

        <div className="border border-yellow-400 rounded-xl p-4">
          {renderSubGroups(group)}
        </div>
      </div>
    );
  };

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-4">
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
            {t("about.data.labels.contact")}:
          </span>{" "}
          <span className="blink-soft">{t("about.data.contact")}</span>
        </p>

        <div className="flex flex-col gap-8">
          {/* Email: cabecera grande centrada + cajita con borde amarillo */}
          <div className="flex flex-col">
            <div className="text-center mb-3">
              <span className="text-lg font-semibold tracking-widest text-sky-400 uppercase">
                {t("contact.email")}
              </span>
            </div>

            <div className="border-2 border-yellow-400 rounded-2xl p-4">
              <div className="flex flex-col min-w-0">
                <span className="text-base font-semibold text-sky-300">
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
            </div>
          </div>

          {/* Bloques principales */}
          {blocks.map((block) => (
            <div key={block.label} className="flex flex-col">
              {/* Cabecera de bloque: grande, centrada, fuera del contenedor */}
              <div className="text-center mb-3">
                <span className="text-lg font-semibold tracking-widest text-sky-400 uppercase">
                  {block.label}
                </span>
              </div>

              {/* Contenedor de bloque con borde amarillo que engloba todo */}
              <div className="border-2 border-yellow-400 rounded-2xl p-4 flex flex-col gap-5">
                {block.groups.map((group, gIdx) => renderGroup(group, gIdx))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
