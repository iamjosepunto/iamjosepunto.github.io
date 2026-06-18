import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="
        border-t
        border-slate-800
        py-6
        mt-4
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-2
            text-center
            md:text-left
          "
        >
          <p className="text-ivory">
            © {new Date().getFullYear()}{" "}
            <span className="text-yellow-400">Jose .</span>
          </p>

          <p className="text-ivory text-sm">
            {t("footer.builtWith")}
          </p>
        </div>

        <p className="text-ivory text-sm mt-2 text-center">
          {t("footer.subtitle")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
