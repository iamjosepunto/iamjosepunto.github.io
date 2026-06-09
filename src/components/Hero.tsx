import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="
        flex
        items-center
        justify-center
        px-6
        py-16
      "
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            text-5xl
            md:text-7xl
            font-black
            mb-6
          "
        >
          <span className="text-blue-400">Jose</span>{" "}
          <span className="text-yellow-400">Punto</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
            text-xl
            md:text-3xl
            text-slate-300
            mb-8
            leading-relaxed
          "
        >
          <div>{t("hero.role1")}</div>
          <div>{t("hero.role2")}</div>
          <div>{t("hero.role3")}</div>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="
            max-w-4xl
            mx-auto
            text-slate-400
            text-lg
            leading-relaxed
          "
        >
          {t("hero.description1")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="
            max-w-4xl
            mx-auto
            text-slate-500
            text-base
            mt-6
          "
        >
          {t("hero.description2")}
        </motion.p>

        <div className="mt-8 flex justify-center">
          <a
            href="#projects"
            className="
              px-6
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-500
              transition
            "
          >
            {t("hero.viewProjects")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;