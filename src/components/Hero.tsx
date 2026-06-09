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
        py-8
      "
    >
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            text-center
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
            max-w-4xl
            mx-auto
            text-xl
            md:text-3xl
            text-ivory
            mb-6
            leading-relaxed
            text-left
          "
        >
          <div>
            <span className="text-yellow-400">•</span>{" "}
            {t("hero.role1")}
          </div>

          <div>
            <span className="text-yellow-400">•</span>{" "}
            {t("hero.role2")}
          </div>

          <div>
            <span className="text-yellow-400">•</span>{" "}
            {t("hero.role3")}
          </div>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="
            max-w-4xl
            mx-auto
            text-ivory
            text-lg
            leading-relaxed
            text-left
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
            text-ivory
            text-base
            mt-4
            text-left
          "
        >
          {t("hero.description2")}
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;