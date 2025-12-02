import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function JobSection() {
  const { t } = useTranslation();

  const images = [
    "/jobs/home1.jpg",
    "/jobs/home2.jpg",
    "/jobs/home3.jpg",
    "/jobs/home4.jpg",
    "/jobs/home5.jpg",
  ];

  return (
    <section className="py-16 sm:py-20 bg-[radial-gradient(circle_at_top,_#FFF4E7_0,_#FFF9F3_40%,_#FFFFFF_100%)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10"
        >
          <div>
            
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-playfair font-semibold text-[#3C1417] mt-2 tracking-[-0.03em]">
              {t("studia.title")}
            </h2>
            
          </div>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#A07458]">
            Маникюр · Педикюр · Косметология
          </p>
        </motion.div>

        {/* мобилка — скролл как сторис */}
        <div className="block sm:hidden mb-4 -mx-1">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 px-1 scrollbar-anin">
            {images.map((src, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="
                  min-w-[72%] snap-center
                  rounded-[1.8rem] overflow-hidden
                  bg-white/95 border border-[#F3D7A8]/70
                  shadow-[0_14px_38px_rgba(0,0,0,0.08)]
                "
              >
                <div className="relative">
                  <img
                    src={src}
                    alt="Работа мастера"
                    className="w-full h-full object-cover aspect-[3/4]"
                  />
                  
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* планшет/десктоп — мозаика */}
        <div className="hidden sm:grid grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {images.map((src, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              viewport={{ once: true }}
              className={`
                group relative overflow-hidden rounded-3xl
                bg-white/95 border border-[#F3D7A8]/70
                shadow-[0_16px_45px_rgba(0,0,0,0.07)]
                hover:shadow-[0_22px_70px_rgba(0,0,0,0.12)]
                transition-all hover:-translate-y-1.5
                ${
                  i === 0 || i === 3
                    ? "col-span-2 row-span-2 aspect-[4/5]"
                    : "aspect-[3/4]"
                }
              `}
            >
              <img
                src={src}
                alt="Работа мастера"
                className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
              />

            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobSection;