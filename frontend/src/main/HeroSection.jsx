import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function HeroSection() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-br from-[#FFF6F3] via-[#FFF9F2] to-[#FFFFFF] min-h-[100vh] sm:min-h-[85vh] flex items-center">
      
      {/* Фоновая графика */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-52 h-52 sm:w-96 sm:h-96 bg-[#FFD8A8]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-52 h-52 sm:w-96 sm:h-96 bg-[#F7C1C1]/20 rounded-full blur-3xl" />
      </div>

      <div
        className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">

          {/* Левая колонка */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            {/* Бейдж */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#EAC58A]/60 shadow-sm"
            >
              <div className="flex gap-1">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className="text-amber-400 text-xs">★</span>
                ))}
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-[#8B0000] tracking-widest">
                PREMIUM BEAUTY STUDIO
              </span>
            </motion.div>

            {/* Заголовок */}
            <div className="space-y-4 sm:space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-playfair font-bold text-3xl sm:text-5xl lg:text-6xl text-[#2B0F0F] leading-tight"
              >
                <span className="block">ANIN</span>
                <span className="block text-[#5B3A3A] font-light">
                  Beauty Studio
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-lg text-[#5B3A3A] leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                {t("hero.subtitle")}
              </motion.p>
            </div>

            {/* Кнопки */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-2xl font-semibold bg-[#8B0000] text-white hover:bg-[#6B0000] transition-all text-sm sm:text-base"
              >
                {t("hero.button")} →
              </Link>

              <a
                href="#contacts"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-3.5 rounded-2xl border border-[#EAC58A] bg-white/80 text-[#5B3A3A] hover:bg-white transition-all text-sm sm:text-base"
              >
                📍 {t("contacts.title")}
              </a>
            </motion.div>

            {/* Статистика */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              {[
                { number: "5.0", label: "Рейтинг", suffix: "★" },
                { number: "200+", label: "Клиентов" },
                { number: "3", label: "Мастера" },
                { number: "99%", label: "Рекомендуют" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 sm:p-4 rounded-2xl bg-white/60 border border-[#F1DCB0]/50"
                >
                  <div className="text-lg sm:text-xl font-bold text-[#8B0000]">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-[15px] sm:text-xs text-[#7A5555] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Правая колонка */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-4 sm:mt-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-[#FFD08A]/20 via-[#F6B3C4]/15 to-white/10 rounded-[2.5rem] blur-xl"></div>

              <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-white to-[#FFF9F2] p-3 sm:p-4 shadow-2xl">
                <img
                  src="/images/anin-bg.jpg"
                  alt="Интерьер"
                  className="w-full h-auto max-h-[260px] sm:max-h-[500px] object-contain rounded-[1.5rem] shadow-lg"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
