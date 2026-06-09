const Footer = () => {
  return (
    <footer
      className="
        border-t
        border-slate-800
        py-10
        mt-10
      "
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-ivory">
          © {new Date().getFullYear()} Jose Punto
        </p>

        <p className="text-ivory text-sm mt-2">
          Senior Full Stack Developer · Industrial Engineer · AI & Software Automation
        </p>
      </div>
    </footer>
  );
};

export default Footer;