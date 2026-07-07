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
  | { name: string; href?: string; users?: string; manager?: string; pending: true };

type SubGroup = { subLabel?: string; subTag?: string; items: Item[] };

type Group = {
  label?: string;
  subGroups: SubGroup[];
};

type Block = {
  label: string;
  groups: Group[];
};

// Contenedor principal colapsable: título grande <...> con flecha, colapsado por defecto.
// SEO-safe: el contenido permanece siempre en el DOM; sólo se colapsa visualmente por CSS.
const CollapsibleBlock = ({
  label,
  children,
  bare = false,
}: {
  label: string;
  children: React.ReactNode;
  bare?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-start gap-2 mb-1 cursor-pointer bg-transparent border-0 text-left"
      >
        <span className="text-lg font-semibold tracking-widest text-sky-400 uppercase">
          {bare ? label : `<${label}>`}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`w-5 h-5 text-yellow-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

// Sub-caja colapsable: subtítulo azul con flecha, colapsada por defecto. SEO-safe igual que arriba.
const CollapsibleSub = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-start gap-2 mb-1 cursor-pointer bg-transparent border-0 text-left"
      >
        <span className="text-sm font-semibold text-blue-400 uppercase">
          {label}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 text-yellow-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
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
                { name: "SourceForge", users: "[35M]", pending: true },
                { name: "Codeberg", users: "[0.2M]", pending: true },
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
                { name: "Hashnode", href: PROFILE.socials.hashnode, users: "[1M]", indexed: true },
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
              items: [{ name: "FreeCodeCamp", users: "[18M]", pending: true }],
            },
          ],
        },
        {
          label: t("contact.catPublic"),
          subGroups: [
            {
              subLabel: t("contact.subJobs"),
              items: [
                { name: "WellFound", href: PROFILE.socials.wellfound, users: "[10M]" },
                { name: "Arc.dev", href: PROFILE.socials.arc, users: "[4M]" },
                { name: "Tecnoempleo", users: "[0.5M]", pending: true },
              ],
            },
            {
              subLabel: t("contact.subPortfolio"),
              items: [
                { name: "Devpost", users: "[6M]", pending: true },
                { name: "Product Hunt", users: "[10M]", pending: true },
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
                { name: "InfoJobs", users: "[4M]", pending: true },
                { name: "Polywork", users: "[2M]", pending: true },
                { name: "Xing", users: "[20.5M]", pending: true },
                { name: "Read.cv", users: "[0.5M]", pending: true },
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
                { name: "Hacker News", users: "[8M]", pending: true },
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
                { name: "Pixiv", users: "[100M]", pending: true },
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
                { name: "Flickr", users: "[120M]", pending: true },
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
        {
          label: t("contact.blockIdentity"),
          subGroups: [
            {
              items: [
                { name: "Gravatar", href: PROFILE.socials.gravatar, users: "[60M]" },
                { name: "About.me", href: PROFILE.socials.aboutme, users: "[40M]", indexed: true },
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
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-ivory hover:text-yellow-400 transition break-all"
              >
                {item.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            )}
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
      <CollapsibleSub key={group.label} label={group.label}>
        <div className="border border-yellow-400 rounded-xl p-4">
          {renderSubGroups(group)}
        </div>
      </CollapsibleSub>
    );
  };

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-4">
      <SectionTitle>{t("contact.title")}</SectionTitle>

      <div
        className="
          w-full
          max-w-lg
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

        <div className="flex flex-col gap-2">
          {/* Email: cabecera grande a la izquierda + cajita con borde amarillo */}
          <div className="flex flex-col">
            <div className="text-left mb-1">
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

          {/* Perfiles públicos (padre): agrupa Tech only + Generalist */}
          <CollapsibleBlock label={t("contact.blockPublicProfiles")}>
            <div className="flex flex-col gap-2 pl-4">
              {sortedBlocks.map((block) => (
                <CollapsibleBlock key={block.label} label={block.label} bare>
                  <div className="border-2 border-yellow-400 rounded-2xl p-4 flex flex-col gap-5">
                    {block.groups.map((group, gIdx) => renderGroup(group, gIdx))}
                  </div>
                </CollapsibleBlock>
              ))}
            </div>
          </CollapsibleBlock>

          {/* Catálogo de publicaciones */}
          <CollapsibleBlock label={t("contact.blockPublications")}>
            <div className="border-2 border-yellow-400 rounded-2xl p-4 flex flex-col gap-5">
              {/* Sub-sección: Publicados */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-blue-400 text-left mb-2 uppercase">
                  {t("contact.pubPublished")}
                </span>
                <div className="border border-yellow-400 rounded-xl p-4 flex flex-col gap-4">
                  {[
                    {
                      platform: "Medium",
                      marker: "[w27-26]",
                      title:
                        "Migrating a Legacy Razor + JavaScript Frontend to React and TypeScript, One Component at a Time",
                      url: "https://iamjosepunto.medium.com/migrating-a-legacy-razor-javascript-frontend-to-react-and-typescript-one-component-at-a-time-ca9222d69490",
                    },
                  ].map((post) => (
                    <div key={post.url} className="flex flex-col min-w-0">
                      <span className="text-base font-semibold text-sky-300">
                        {post.platform}
                      </span>
                      <span className="text-sm font-normal text-slate-500">{post.marker}</span>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ivory hover:text-yellow-400 transition break-words max-w-sm"
                      >
                        {post.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-sección: Ideas para futuros artículos */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-blue-400 text-left mb-2 uppercase">
                  {t("contact.pubIdeas")}
                </span>
                <div className="border border-yellow-400 rounded-xl p-4 flex flex-col gap-2.5">
                  {(t("contact.pubIdeasList", { returnObjects: true }) as string[]).map(
                    (idea, i) => (
                      <span key={i} className="text-sm text-slate-400">
                        {idea}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </CollapsibleBlock>

          {/* Gestores de redes sociales */}
          <CollapsibleBlock label={t("contact.blockManagers")}>
            <div className="border-2 border-yellow-400 rounded-2xl p-4 flex flex-col gap-3">
              {[
                { name: "Buffer", url: "buffer.com" },
                { name: "Publer", url: "publer.com" },
                { name: "Metricool", url: "metricool.com" },
              ].map((tool) => (
                <div key={tool.name} className="flex flex-col min-w-0">
                  <span className="text-base font-semibold text-sky-300">{tool.name}</span>
                  <a
                    href={`https://${tool.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ivory hover:text-yellow-400 transition break-all"
                  >
                    {tool.url}
                  </a>
                </div>
              ))}
            </div>
          </CollapsibleBlock>

          {/* Perfiles privados (padre): agrupa Tech only + Generalist */}
          <CollapsibleBlock label={t("contact.blockPrivateProfiles")}>
            <div className="flex flex-col gap-2 pl-4">
              {/* Perfiles privados - Sólo Tecnología */}
              <CollapsibleBlock label={t("contact.blockPrivateTech")} bare>
                <div className="border-2 border-yellow-400 rounded-2xl p-4 flex flex-col gap-3">
                  {[
                    { name: "HackerRank", users: "[26M]", url: "https://hackerrank.com" },
                    { name: "Codility", users: "[16M]", url: "https://codility.com" },
                    { name: "CodeSignal", users: "[n/d]", url: "https://codesignal.com" },
                    { name: "Toptal", users: "[n/d]", url: "https://toptal.com" },
                  ].map((p) => (
                    <div key={p.name} className="flex flex-col min-w-0">
                      <span className="text-base font-semibold text-sky-300">
                        {p.name}
                        <span className="text-sm font-normal text-slate-500"> {p.users}</span>
                      </span>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ivory hover:text-yellow-400 transition break-all"
                      >
                        {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                      <span className="text-sm font-normal text-slate-500">
                        ({t("contact.pending")})
                      </span>
                    </div>
                  ))}
                </div>
              </CollapsibleBlock>

              {/* Perfiles privados - Generalistas */}
              <CollapsibleBlock label={t("contact.blockPrivateGeneralist")} bare>
                <div className="border-2 border-yellow-400 rounded-2xl p-4 flex flex-col gap-3">
                  {[
                    { name: "Indeed", users: "[350M]", url: "https://indeed.com" },
                    { name: "Glassdoor", users: "[63M]", url: "https://glassdoor.com" },
                    { name: "Adecco", users: "[n/d]", url: "https://adecco.com" },
                    { name: "Randstad", users: "[n/d]", url: "https://randstad.com" },
                  ].map((p) => (
                    <div key={p.name} className="flex flex-col min-w-0">
                      <span className="text-base font-semibold text-sky-300">
                        {p.name}
                        <span className="text-sm font-normal text-slate-500"> {p.users}</span>
                      </span>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ivory hover:text-yellow-400 transition break-all"
                      >
                        {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                      <span className="text-sm font-normal text-slate-500">
                        ({t("contact.pending")})
                      </span>
                    </div>
                  ))}
                </div>
              </CollapsibleBlock>
            </div>
          </CollapsibleBlock>

          {/* Secciones empleo empresas (padre): agrupa Tech only + Generalist */}
          <CollapsibleBlock label={t("contact.blockCompanyJobs")}>
            <div className="flex flex-col gap-2 pl-4">
              {/* Secciones empleo - Sólo Tecnología (dos sub-cajas: Producto y Consultoras) */}
              <CollapsibleBlock label={t("contact.blockJobsTech")} bare>
            <div className="border-2 border-yellow-400 rounded-2xl p-4 flex flex-col gap-5">
              {/* Sub-caja: Producto */}
              <CollapsibleSub label={t("contact.jobsProduct")}>
                <div className="border border-yellow-400 rounded-xl p-4 flex flex-col gap-3">
                  {[
                    { name: "HP", users: "[2.8k-Es|58k-W]", descKey: "descHP", url: "https://apply.hp.com" },
                    { name: "Oracle", users: "[1.27k-Es|162k-W]", descKey: "descOracle", url: "https://oracle.com/careers" },
                    { name: "Microsoft", users: "[1.26k-Es|228k-W]", descKey: "descMicrosoft", url: "https://careers.microsoft.com" },
                    { name: "Amadeus", users: "[1.17k-Es|21k-W]", descKey: "descAmadeus", url: "https://amadeus.com/careers" },
                    { name: "SAP", users: "[1.02k-Es|110k-W]", descKey: "descSAP", url: "https://jobs.sap.com" },
                    { name: "IBM Producto", users: "[0.79k-Es|282k-W]", descKey: "descIBMProduct", url: "https://ibm.com/careers" },
                    { name: "Autodesk", users: "[0.68k-Es|14k-W]", descKey: "descAutodesk", url: "https://autodesk.com/careers" },
                    { name: "Salesforce", users: "[0.65k-Es|76k-W]", descKey: "descSalesforce", url: "https://careers.salesforce.com" },
                    { name: "Red Hat", users: "[0.59k-Es|18k-W]", descKey: "descRedHat", url: "https://redhat.com/jobs" },
                    { name: "Google", users: "[0.58k-Es|183k-W]", descKey: "descGoogle", url: "https://careers.google.com" },
                    { name: "Dell", users: "[0.51k-Es|108k-W]", descKey: "descDell", url: "https://jobs.dell.com" },
                    { name: "Cisco", users: "[0.49k-Es|86k-W]", descKey: "descCisco", url: "https://careers.cisco.com" },
                    { name: "VMware", users: "[0.2k-Es|33k-W]", descKey: "descVMware", url: "https://broadcom.com/careers" },
                    { name: "SAS", users: "[0.16k-Es|11k-W]", descKey: "descSAS", url: "https://sas.com/careers" },
                    { name: "Nutanix", users: "[0.12k-Es|7k-W]", descKey: "descNutanix", url: "https://nutanix.com/careers" },
                    { name: "Intel", users: "[0.06k-Es|109k-W]", descKey: "descIntel", url: "https://jobs.intel.com" },
                    { name: "NVIDIA", users: "[0.03k-Es|36k-W]", descKey: "descNVIDIA", url: "https://jobs.nvidia.com" },
                    { name: "Adobe", users: "[0.03k-Es|31k-W]", descKey: "descAdobe", url: "https://careers.adobe.com" },
                    { name: "Qualcomm", users: "[n/d-Es|49k-W]", descKey: "descQualcomm", url: "https://qualcomm.com/careers" },
                  ].map((company) => (
                    <div key={company.name} className="flex flex-col min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-base font-semibold text-sky-300">
                          {company.name}
                        </span>
                        <span className="text-sm text-slate-400">
                          {t(`contact.${company.descKey}`)}
                        </span>
                      </div>
                      <span className="text-sm font-normal text-slate-500">{company.users}</span>
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ivory hover:text-yellow-400 transition break-all"
                      >
                        {company.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                      <span className="text-sm font-normal text-slate-500">
                        ({t("contact.pending")})
                      </span>
                    </div>
                  ))}
                </div>
              </CollapsibleSub>

              {/* Sub-caja: Consultoras */}
              <CollapsibleSub label={t("contact.jobsConsulting")}>
                <div className="border border-yellow-400 rounded-xl p-4 flex flex-col gap-3">
                  {[
                    { name: "Capgemini", users: "[10.88k-Es|341k-W]", descKey: "descCapgemini", url: "https://capgemini.com/careers" },
                    { name: "Indra", users: "[10.19k-Es|61k-W]", descKey: "descIndra", url: "https://careers.indragroup.com" },
                    { name: "NTT Data", users: "[10.1k-Es|198k-W]", descKey: "descNTTData", url: "https://nttdata.com/careers" },
                    { name: "Inetum", users: "[8.5k-Es|28k-W]", descKey: "descInetum", url: "https://inetum.com/es/careers" },
                    { name: "Sopra Steria", users: "[4k-Es|50k-W]", descKey: "descSopraSteria", url: "https://careers.soprasteria.es" },
                    { name: "Accenture", users: "[3.63k-Es|779k-W]", descKey: "descAccenture", url: "https://accenture.com/careers" },
                    { name: "HPE", users: "[1.1k-Es|61k-W]", descKey: "descHPE", url: "https://careers.hpe.com" },
                    { name: "IBM Consulting", users: "[0.78k-Es|282k-W]", descKey: "descIBMConsulting", url: "https://ibm.com/careers" },
                    { name: "TCS", users: "[0.77k-Es|615k-W]", descKey: "descTCS", url: "https://tcs.com/careers" },
                    { name: "Atos", users: "[n/d-Es|110k-W]", descKey: "descAtos", url: "https://jobs.atos.net" },
                    { name: "GFT", users: "[n/d-Es|12k-W]", descKey: "descGFT", url: "https://jobs.gft.com" },
                    { name: "Cognizant", users: "[n/d-Es|348k-W]", descKey: "descCognizant", url: "https://careers.cognizant.com" },
                    { name: "Globant", users: "[n/d-Es|29k-W]", descKey: "descGlobant", url: "https://globant.com/careers" },
                  ].map((company) => (
                    <div key={company.name} className="flex flex-col min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-base font-semibold text-sky-300">
                          {company.name}
                        </span>
                        <span className="text-sm text-slate-400">
                          {t(`contact.${company.descKey}`)}
                        </span>
                      </div>
                      <span className="text-sm font-normal text-slate-500">{company.users}</span>
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ivory hover:text-yellow-400 transition break-all"
                      >
                        {company.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                      <span className="text-sm font-normal text-slate-500">
                        ({t("contact.pending")})
                      </span>
                    </div>
                  ))}
                </div>
              </CollapsibleSub>
            </div>
          </CollapsibleBlock>

          {/* Secciones empleo - Generalistas (dos sub-cajas: Corporaciones y Consultoras) */}
          <CollapsibleBlock label={t("contact.blockJobsGeneralist")} bare>
            <div className="border-2 border-yellow-400 rounded-2xl p-4 flex flex-col gap-5">
              {/* Sub-caja: Corporaciones */}
              <CollapsibleSub label={t("contact.jobsCorporations")}>
                <div className="border border-yellow-400 rounded-xl p-4 flex flex-col gap-3">
                  {[
                    { name: "Mercadona", users: "[98.7k-Es|104k-W]", descKey: "descMercadona", url: "https://mercadona.es/es/conocenos/trabaja-con-nosotros" },
                    { name: "El Corte Inglés", users: "[74.7k-Es|80k-W]", descKey: "descElCorteIngles", url: "https://elcorteingles.es/empleo" },
                    { name: "Inditex", users: "[46k-Es|161k-W]", descKey: "descInditex", url: "https://inditexcareers.com" },
                    { name: "CaixaBank", users: "[44.9k-Es|49.8k-W]", descKey: "descCaixaBank", url: "https://caixabank.com/es/talento" },
                    { name: "BBVA", users: "[28.2k-Es|125k-W]", descKey: "descBBVA", url: "https://careers.bbva.com" },
                    { name: "Amazon", users: "[28k-Es|1556k-W]", descKey: "descAmazon", url: "https://amazon.jobs/es" },
                    { name: "Telefónica", users: "[27.8k-Es|104k-W]", descKey: "descTelefonica", url: "https://telefonica.com/es/talento" },
                    { name: "Santander", users: "[26.8k-Es|210k-W]", descKey: "descSantander", url: "https://santandercareers.com" },
                    { name: "Repsol", users: "[15k-Es|26k-W]", descKey: "descRepsol", url: "https://repsol.com/es/talento" },
                    { name: "Iberdrola", users: "[9.75k-Es|42k-W]", descKey: "descIberdrola", url: "https://iberdrola.com/talento" },
                  ].map((company) => (
                    <div key={company.name} className="flex flex-col min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-base font-semibold text-sky-300">
                          {company.name}
                        </span>
                        <span className="text-sm text-slate-400">
                          {t(`contact.${company.descKey}`)}
                        </span>
                      </div>
                      <span className="text-sm font-normal text-slate-500">{company.users}</span>
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ivory hover:text-yellow-400 transition break-all"
                      >
                        {company.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                      <span className="text-sm font-normal text-slate-500">
                        ({t("contact.pending")})
                      </span>
                    </div>
                  ))}
                </div>
              </CollapsibleSub>

              {/* Sub-caja: Consultoras */}
              <CollapsibleSub label={t("contact.jobsConsultingGen")}>
                <div className="border border-yellow-400 rounded-xl p-4 flex flex-col gap-3">
                  {[
                    { name: "Deloitte", users: "[10.75k-Es|312k-W]", descKey: "descDeloitte", url: "https://deloitte.com/es/careers" },
                    { name: "EY", users: "[6.44k-Es|395k-W]", descKey: "descEY", url: "https://ey.com/es_es/careers" },
                    { name: "KPMG", users: "[6.05k-Es|275k-W]", descKey: "descKPMG", url: "https://kpmg.com/es/careers" },
                    { name: "PwC", users: "[5.79k-Es|370k-W]", descKey: "descPwC", url: "https://pwc.es/carreras" },
                    { name: "McKinsey", users: "[n/d-Es|45k-W]", descKey: "descMcKinsey", url: "https://mckinsey.com/careers" },
                    { name: "BCG", users: "[n/d-Es|32k-W]", descKey: "descBCG", url: "https://bcg.com/careers" },
                    { name: "Bain", users: "[n/d-Es|19k-W]", descKey: "descBain", url: "https://bain.com/careers" },
                  ].map((company) => (
                    <div key={company.name} className="flex flex-col min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-base font-semibold text-sky-300">
                          {company.name}
                        </span>
                        <span className="text-sm text-slate-400">
                          {t(`contact.${company.descKey}`)}
                        </span>
                      </div>
                      <span className="text-sm font-normal text-slate-500">{company.users}</span>
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ivory hover:text-yellow-400 transition break-all"
                      >
                        {company.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                      <span className="text-sm font-normal text-slate-500">
                        ({t("contact.pending")})
                      </span>
                    </div>
                  ))}
                </div>
              </CollapsibleSub>
            </div>
          </CollapsibleBlock>
            </div>
          </CollapsibleBlock>
        </div>
      </div>
    </section>
  );
};

export default Contact;
