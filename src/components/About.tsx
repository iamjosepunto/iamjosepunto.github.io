import { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

const About = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const data = t("about.data", { returnObjects: true }) as {
    labels: Record<string, string>;
    name: string;
    birth: string;
    nationality: string;
    resident: string;
    cv: string;
    email: string;
    contact: string;
    availability: string;
    workmode: string;
  };

  const rows: { label: string; value: string; href?: string; copy?: boolean }[] = [
    { label: data.labels.name, value: data.name },
    { label: data.labels.birth, value: data.birth },
    { label: data.labels.nationality, value: data.nationality },
    { label: data.labels.resident, value: data.resident },
    { label: data.labels.cv, value: data.cv, href: data.cv },
    { label: data.labels.email, value: data.email, copy: true },
    { label: data.labels.contact, value: data.contact },
    { label: data.labels.availability, value: data.availability },
    { label: data.labels.workmode, value: data.workmode },
  ];

  return (
    <section
      id="about"
      className="max-w-5xl mx-auto px-6 py-4"
    >
      <SectionTitle>{t("about.title")}</SectionTitle>

      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
        "
      >
        <p className="text-lg text-ivory leading-relaxed mb-6 flex gap-3">
          <span className="text-yellow-400 shrink-0">•</span>
          <span>{t("about.paragraph1")}</span>
        </p>

        <p className="text-lg text-ivory leading-relaxed mb-6 flex gap-3">
          <span className="text-yellow-400 shrink-0">•</span>
          <span>{t("about.paragraph2")}</span>
        </p>

        <p className="text-lg text-ivory leading-relaxed mb-6 flex gap-3">
          <span className="text-yellow-400 shrink-0">•</span>
          <span>{t("about.paragraph3")}</span>
        </p>

        <p className="text-lg text-ivory leading-relaxed mb-6 flex gap-3">
          <span className="text-yellow-400 shrink-0">•</span>
          <span>{t("about.paragraph4")}</span>
        </p>

        <p className="text-lg text-ivory leading-relaxed flex gap-3">
          <span className="text-yellow-400 shrink-0">•</span>
          <span>{t("about.paragraph5")}</span>
        </p>
      </div>

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
          mt-6
          flex
          flex-col
          divide-y
          divide-slate-800
        "
      >
        {rows.map((row) => (
          <div
            key={row.label}
            className="
              flex
              flex-col
              sm:flex-row
              sm:gap-4
              py-2.5
            "
          >
            <span className="text-sm font-semibold text-blue-400 sm:w-40 shrink-0">
              {row.label}
            </span>

            {row.copy ? (
              <span className="text-ivory break-all sm:w-72 flex items-center gap-3">
                {row.value}
                <button
                  onClick={() => copyEmail(row.value)}
                  className="text-base text-yellow-400 font-semibold shrink-0 cursor-pointer"
                >
                  {copied ? t("contact.copied") : t("contact.copy")}
                </button>
              </span>
            ) : row.href ? (
              <a
                href={row.href}
                target="_blank"
                rel="noreferrer"
                className="text-ivory hover:text-yellow-400 transition break-all sm:w-72"
              >
                {row.value}
              </a>
            ) : (
              <span className="text-ivory sm:w-72">{row.value}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
