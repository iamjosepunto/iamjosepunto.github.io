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
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-ivory">
          © {new Date().getFullYear()} Jose Punto
        </p>

        <p className="text-ivory text-sm mt-2">
          {t("footer.subtitle")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;