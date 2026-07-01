import { useState } from "react";
import { PROFILE } from "../data/profile";
import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

type Item =
  | {
      name: string;
      href: string;
      users?: string;
      manager?: string;
      indexed?: boolean;
      sharesToLinkedIn?: boolean;
    }
  | { name: string; users?: string; manager?: string; pending: true };

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

  // Comparador alfabético insensible a mayúsculas/acentos, según idioma activo.
  const collator = new Intl.Collator(undefined, {
    sensitivity: "base",
    numeric: true,
  });
  const byText = (a: string, b: string) => collator.compare(a, b);

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
                { name: "GitHub", href: PROFILE.socials.github, users: "[165M]" },
                { name: "GitLab", href: PROFILE.socials.gitlab, users: "[45M]" },
                { name: "Bitbucket", users: "[15M]", pending: true },
                { name: "SourceForge", users: "[n/d]", pending: true },
                { name: "Codeberg", users: "[n/d]", pending: true },
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
                { name: "DEV.to", href: PROFILE.socials.devto, users: "[1M]", indexed: true },
                { name: "Hashnode", href: PROFILE.socials.hashnode, users: "[1M]" },
              ],
            },
            {
              subLabel: t("contact.subQA"),
              items: [
                { name: "Stack Overflow", href: PROFILE.socials.stackoverflow, users: "[22M]" },
              ],
            },
            {
              subLabel: t("contact.subPlaygrounds"),
              items: [
                { name: "CodePen", href: PROFILE.socials.codepen, users: "[6M]" },
                { name: "Replit", users: "[50M]", pending: true },
              ],
            },
            {
              subLabel: t("contact.subData"),
              items: [{ name: "Kaggle", users: "[30M]", pending: true }],
            },
            {
              subLabel: t("contact.subChallenges"),
              items: [
                { name: "HackerRank", users: "[26M]", pending: true },
                { name: "LeetCode", users: "[12M]", pending: true },
              ],
            },
            {
              subLabel: t("contact.subLearning"),
              items: [{ name: "freeCodeCamp", users: "[n/d]", pending: true }],
            },
          ],
        },
        {
          label: t("contact.catPublic"),
          subGroups: [
            {
              subLabel: t("contact.subJobs"),
              items: [
                { name: "WellFound", href: PROFILE.socials.wellfound, users: "[n/d]" },
                { name: "Arc.dev", href: PROFILE.socials.arc, users: "[n/d]" },
              ],
            },
            {
              subLabel: t("contact.subPortfolio"),
              items: [
                { name: "Devpost", users: "[n/d]", pending: true },
                { name: "Product Hunt", users: "[n/d]", pending: true },
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
                { name: "LinkedIn", href: PROFILE.socials.linkedin, users: "[1150M]", manager: "[B]", indexed: true },
                { name: "Polywork", users: "[n/d]", pending: true },
                { name: "Xing", users: "[20.5M]", pending: true },
                { name: "Read.cv", users: "[n/d]", pending: true },
              ],
            },
          ],
        },
        {
          label: t("contact.catSocial"),
          subGroups: [
            {
              items: [
                { name: "X (Twitter)", users: "[550M]", manager: "[B]", pending: true },
                { name: "Instagram", users: "[3000M]", manager: "[M]", pending: true },
                { name: "Facebook", users: "[3070M]", manager: "[P]", pending: true },
                { name: "Threads", users: "[400M]", manager: "[P]", pending: true },
                { name: "Bluesky", users: "[42M]", manager: "[P]", pending: true },
                { name: "Mastodon", users: "[10.5M]", manager: "[B]", pending: true },
              ],
            },
          ],
        },
        {
          label: t("contact.catBloggingGen"),
          subGroups: [
            {
              items: [
                { name: "Medium", href: PROFILE.socials.medium, users: "[75M]", sharesToLinkedIn: true },
                { name: "Substack", users: "[35M]", pending: true },
                { name: "Tumblr", users: "[135M]", pending: true },
              ],
            },
          ],
        },
        {
          label: t("contact.subQA"),
          subGroups: [
            {
              items: [{ name: "Quora", users: "[400M]", pending: true }],
            },
          ],
        },
        {
          label: t("contact.subForums"),
          subGroups: [
            {
              items: [
                { name: "Hacker News", users: "[n/d]", pending: true },
                { name: "Reddit", users: "[970M]", pending: true },
              ],
            },
          ],
        },
        {
          label: t("contact.subDesign"),
          subGroups: [
            {
              items: [
                { name: "Dribbble", users: "[12M]", pending: true },
                { name: "Behance", users: "[50M]", pending: true },
              ],
            },
          ],
        },
        {
          label: t("contact.subArt"),
          subGroups: [
            {
              items: [
                { name: "DeviantArt", users: "[110M]", pending: true },
                { name: "pixiv", users: "[100M]", pending: true },
              ],
            },
          ],
        },
        {
          label: t("contact.subPhoto"),
          subGroups: [
            {
              items: [
                { name: "VSCO", users: "[200M]", pending: true },
                { name: "Flickr", users: "[n/d]", pending: true },
                { name: "Unsplash", users: "[0.4M]", pending: true },
              ],
            },
          ],
        },
        {
          label: t("contact.subCreators"),
          subGroups: [
            {
              items: [{ name: "Ko-fi", users: "[1M]", pending: true }],
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
                { name: "Gravatar", href: PROFILE.socials.gravatar, users: "[n/d]" },
                { name: "about.me", href: PROFILE.socials.aboutme, users: "[n/d]" },
                { name: "Linktree", href: PROFILE.socials.linktree, users: "[50M]" },
              ],
            },
          ],
        },
      ],
    },
  ];

  // Ordenación alfabética (por idioma activo) en los tres niveles:
  // categorías dentro del bloque, subgrupos dentro del grupo, e ítems dentro del subgrupo.
  // Los bloques se mantienen en su orden fijo.
  const sortedBlocks: Block[] = blocks.map((block) => ({
    ...block,
    groups: [...block.groups]
      .map((group) => ({
        ...group,
        subGroups: [...group.subGroups]
          .map((sub) => ({
            ...sub,
            items: [...sub.items].sort((a, b) => byText(a.name, b.name)),
          }))
          .sort((a, b) => byText(a.subLabel ?? "", b.subLabel ?? "")),
      }))
      .sort((a, b) => byText(a.label ?? "", b.label ?? "")),
  }));

  const renderItems = (items: Item[]) => (
    <>
      {items.map((item) =>
        "pending" in item ? (
          <div key={item.name} className="flex flex-col min-w-0">
            <span className="text-base font-semibold text-sky-300">
              {item.name}
              {item.users && (
                <span className="text-sm font-normal text-slate-500"> {item.users}</span>
              )}
              {item.manager && (
                <span className="text-sm font-normal text-slate-500"> {item.manager}</span>
              )}
            </span>
            <span className="text-sm font-normal text-slate-500">
              ({t("contact.pending")})
            </span>
          </div>
        ) : (
          <div key={item.href} className="flex flex-col min-w-0">
            <span className="text-base font-semibold text-sky-300">
              {item.name}
              {item.users && (
                <span className="text-sm font-normal text-slate-500"> {item.users}</span>
              )}
              {item.manager && (
                <span className="text-sm font-normal text-slate-500"> {item.manager}</span>
              )}
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
                {"<"}
                {t("contact.email")}
                {">"}
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
          {sortedBlocks.map((block) => (
            <div key={block.label} className="flex flex-col">
              {/* Cabecera de bloque: grande, centrada, fuera del contenedor */}
              <div className="text-center mb-3">
                <span className="text-lg font-semibold tracking-widest text-sky-400 uppercase">
                  {"<"}
                  {block.label}
                  {">"}
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
