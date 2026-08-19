import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="
        border-t
        border-slate-800
        py-2
      "
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-ivory text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-yellow-400">Jose .</span>{" "}
          {t("footer.builtWith")}
        </p>

        <p className="text-cream text-sm mt-0.5">
          {t("footer.subtitle")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
