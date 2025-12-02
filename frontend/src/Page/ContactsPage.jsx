import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Instagram, Phone, MessageCircle, Music2 } from "lucide-react";

function ContactsSection() {
  const { t } = useTranslation();

  const contacts = [
    {
      icon: "📍",
      labelKey: "contacts.address_label",
      valueKey: "contacts.address_value",
      helper: "",
    },
    {
      icon: "📞",
      labelKey: "contacts.phone_label",
      value: "+7 (777) 210-48-14",
      helper: "Звонки и сообщения в мессенджеры",
    },
    {
      icon: "🕒",
      labelKey: "contacts.worktime_label",
      valueKey: "contacts.worktime_value",
      helper: "Ежедневно по предварительной записи",
    },
  ];

  return (
    <section
      id="contacts"
      className="py-16 sm:py-20 bg-[radial-gradient(circle_at_bottom,_#FFE6EA_0,_#FFF4E0_45%,_#FFFFFF_100%)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        {/* Заголовок */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#C0916B] mb-2">
            {t("contacts.title")}
          </p>
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-playfair font-semibold text-[#8B0000] mb-3 tracking-[-0.03em]">
            {t("contacts.title")}
          </h2>
          <p className="text-lg sm:text-sm md:text-base text-[#6F4A4A] max-w-2xl mx-auto">
            Напишите нам в удобной соцсети или позвоните
          </p>
        </div>

        {/* Основной блок */}
        <div
          className="
            grid grid-cols-1 md:grid-cols-[1.05fr,1.1fr] gap-8 sm:gap-10
            bg-white/85 backdrop-blur-xl rounded-3xl
            p-6 sm:p-8
            shadow-[0_18px_55px_rgba(0,0,0,0.08)]
            border border-[#F1DCB0]
          "
        >
          {/* ЛЕВАЯ ЧАСТЬ */}
          <div className="flex flex-col justify-between gap-6">
            {/* Контакты */}
            <div className="space-y-4">
              {contacts.map((c, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 sm:gap-4 p-5 rounded-2xl bg-[#FFF8EB] border border-[#FFD700]/40"
                >
                  <div className="w-11 h-11 bg-[#FFD700]/25 rounded-2xl flex items-center justify-center text-lg">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#B18460] mb-1">
                      {t(c.labelKey)}
                    </p>
                    <p className="font-semibold text-[#8B0000]">
                      {c.valueKey ? t(c.valueKey) : c.value}
                    </p>
                    {c.helper && (
                      <p className="text-[15px] sm:text-xs text-[#7A5555] mt-1">
                        {c.helper}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ КРАСИВЫЕ КНОПКИ */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/77714025741"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center gap-4 p-5
                  rounded-2xl bg-white
                  border border-[#E8F8EE]
                  shadow-[0_20px_45px_rgba(37,211,102,0.15)]
                  hover:shadow-[0_25px_60px_rgba(37,211,102,0.25)]
                  hover:-translate-y-0.5 transition-all
                "
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#25D366]/15 text-[#25D366] group-hover:scale-110 transition">
                  <MessageCircle size={26} />
                </div>
                <div>
                  <p className="font-semibold text-[#1C3B2B]">WhatsApp</p>
                  <p className="text-base text-gray-500">Быстрый ответ в чате</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/anin_beautystudio"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center gap-4 p-5
                  rounded-2xl bg-white
                  border border-[#F6E9F2]
                  shadow-[0_20px_45px_rgba(225,48,108,0.15)]
                  hover:shadow-[0_25px_60px_rgba(225,48,108,0.25)]
                  hover:-translate-y-0.5 transition-all
                "
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#FCAF45] text-white group-hover:scale-110 transition">
                  <Instagram size={26} />
                </div>
                <div>
                  <p className="font-semibold text-[#3A1C2A]">Instagram</p>
                  <p className="text-base text-gray-500">@anin_beautystudio</p>
                </div>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@anin_beautystudio"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center gap-4 p-5
                  rounded-2xl bg-white
                  border border-[#EFEFEF]
                  shadow-[0_20px_45px_rgba(0,0,0,0.12)]
                  hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]
                  hover:-translate-y-0.5 transition-all
                "
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-black text-white group-hover:scale-110 transition">
                  <Music2 size={24} />
                </div>
                <div>
                  <p className="font-semibold text-[#1F1F1F]">TikTok</p>
                  <p className="text-base text-gray-500">@anin_beautystudio</p>
                </div>
              </a>

              {/* Call */}
              <a
                href="tel:+77772104814"
                className="
                  group flex items-center gap-4 p-5
                  rounded-2xl bg-white
                  border border-[#F3E8CC]
                  shadow-[0_20px_45px_rgba(255,215,0,0.15)]
                  hover:shadow-[0_25px_60px_rgba(255,215,0,0.25)]
                  hover:-translate-y-0.5 transition-all
                "
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#FFD700]/20 text-[#8B0000] group-hover:scale-110 transition">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="font-semibold text-[#8B0000]">Позвонить</p>
                  <p className="text-base text-gray-500">Мгновенный звонок</p>
                </div>
              </a>
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ — КАРТА */}
          <div
            className="
              w-full h-64 sm:h-72 md:h-full rounded-2xl overflow-hidden 
              shadow-[0_18px_45px_rgba(0,0,0,0.22)]
              border border-[#FFD700]/60
              relative
            "
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.4533763963427!2d76.8989177758892!3d43.24191907112466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883693957a9d4fd%3A0x6433d83d3f6700d8!2zNyDQu9C40L0uIDY2LCDQkNC70LzQsNGC0YsgMDUwMDAwLCDQmtCw0LfQsNGF0YHRgtCw0L0!5e0!3m2!1sru!2sru!4v1761764072883!5m2!1sru!2sru"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Карта студии ANIN"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactsSection;
