import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="flex items-center justify-center px-6 py-2"
    >
      <div className="max-w-5xl mx-auto w-full">

        {/* Roles (izquierda) + Foto (centro) + Nombre (derecha). Responsive: apilado en movil. */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-2">
          {/* Roles */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="order-3 md:order-1 text-xl md:text-2xl text-ivory leading-tight text-left"
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

          {/* Foto */}
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src="/FotoJosePunto.jpg"
            alt="Jose Punto - Senior Full Stack .NET Developer & Industrial Engineer"
            className="order-1 md:order-2 w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-yellow-400 shadow-lg shrink-0"
          />

          {/* Nombre */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-3 text-5xl md:text-7xl font-black leading-none shrink-0"
          >
            <span className="text-yellow-400">Jose .</span>
          </motion.h1>
        </div>

        {/* Descripcion: un solo contenedor con dos parrafos, cada uno con punto amarillo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto text-ivory text-lg leading-relaxed text-left border border-yellow-400 rounded-2xl p-2"
        >
          <p className="flex gap-3 mb-1">
            <span className="text-yellow-400 shrink-0">•</span>
            <span>{t("hero.description1")}</span>
          </p>

          <p className="flex gap-3">
            <span className="text-yellow-400 shrink-0">•</span>
            <span>{t("hero.description2")}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
