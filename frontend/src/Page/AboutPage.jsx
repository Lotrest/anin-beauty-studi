import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-rose-50/20 to-amber-50/20 py-20 px-6 relative overflow-hidden">
      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-lg"
        >
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-rose-700 uppercase tracking-widest">
            {t("about.page.badge")}
          </span>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-light text-slate-800 mb-4">
          {t("about.page.title")}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {t("about.page.subtitle")}
        </p>
      </motion.div>

      {/* Основной текст */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-slate-200">
          <p className="text-xl text-slate-700 leading-relaxed">
            {t("about.page.main_text")}
          </p>
        </div>
      </motion.div>

      {/* Преимущества */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: t("about.page.premium_materials.title"),
            desc: t("about.page.premium_materials.desc"),
            icon: "💎",
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: t("about.page.best_masters.title"),
            desc: t("about.page.best_masters.desc"),
            icon: "👩‍🎨",
            color: "from-rose-500 to-pink-500",
          },
          {
            title: t("about.page.comfort_atmosphere.title"),
            desc: t("about.page.comfort_atmosphere.desc"),
            icon: "✨",
            color: "from-amber-500 to-orange-500",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center">
              {/* Иконка */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all`}
              >
                {item.icon}
              </motion.div>

              {/* Заголовок */}
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                {item.title}
              </h3>

              {/* Описание */}
              <p className="text-slate-600 leading-relaxed flex-1">
                {item.desc}
              </p>

              {/* Декоративная линия */}
              <div className="w-12 h-1 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA секция */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-20"
      >
        <div className="bg-gradient-to-r from-rose-500 to-amber-500 rounded-3xl p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-light mb-4">
            {t("about.page.cta.title")}
          </h2>
          <p className="text-lg opacity-90 mb-6">
            {t("about.page.cta.text")}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-slate-800 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors shadow-lg"
          >
            {t("about.page.cta.button")}
          </motion.button>
        </div>
      </motion.div>

      {/* Декор */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-rose-300 rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-amber-300 rounded-full opacity-40 animate-pulse delay-1000" />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-rose-200 rounded-full opacity-70 animate-pulse delay-500" />
    </section>
  );
}
