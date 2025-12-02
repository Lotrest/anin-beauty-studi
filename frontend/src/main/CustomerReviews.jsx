import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

function CustomerReviews() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("https://anin-beauty-studio-production.up.railway.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => setReviews([]));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !review.trim()) return;

    setIsSubmitting(true);

    fetch("https://anin-beauty-studio-production.up.railway.app/reviews", {
      method: "POST",
      body: JSON.stringify({ name, review, rating }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() =>
        fetch("https://anin-beauty-studio-production.up.railway.app/reviews")
      )
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setName("");
        setReview("");
        setRating(5);
      })
      .catch(() => {})
      .finally(() => setIsSubmitting(false));
  }

  const filteredReviews =
    activeTab === "all"
      ? reviews
      : reviews.filter((r) => r.rating >= 4);

  const getInitials = (name) =>
    name ? name.charAt(0).toUpperCase() : "?";

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (rating >= 3) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-rose-700 bg-rose-50 border-rose-200";
  };

  const total = reviews.length;
  const positive = reviews.filter((r) => r.rating >= 4).length;
  const avg =
    total > 0
      ? (
          reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / total
        ).toFixed(1)
      : "0.0";

  return (
    <section className="py-20 bg-[radial-gradient(circle_at_top,_#FFEFF4_0,_#FFFFFF_55%)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-3 mb-5 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-rose-100 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold text-rose-700 uppercase tracking-[0.2em]">
              {t("reviews.title")}
            </span>
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-[2.7rem] font-playfair font-semibold text-slate-900 mb-3 tracking-[-0.03em]">
            {t("reviews.list_title")}
          </h2>
          <p className="text-base sm:text-base text-slate-600 max-w-2xl mx-auto">
            Что говорят гости о качестве услуг, атмосфере и заботе в студии ANIN.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-10 lg:gap-12 items-start">
          {/* LEFT — список отзывов */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* табы */}
            <div className="inline-flex rounded-2xl bg-white/70 border border-slate-200 p-1 mb-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 sm:px-6 py-2 rounded-2xl text-sm font-medium transition-all ${
                  activeTab === "all"
                    ? "bg-[#8B0000] text-white shadow-md"
                    : "text-slate-600 hover:text-[#8B0000]"
                }`}
              >
                Все отзывы
              </button>
              <button
                onClick={() => setActiveTab("top")}
                className={`px-4 sm:px-6 py-2 rounded-2xl text-sm font-medium transition-all ${
                  activeTab === "top"
                    ? "bg-[#FFD700] text-[#4A100F] shadow-md"
                    : "text-slate-600 hover:text-[#8B0000]"
                }`}
              >
                Топ 4–5★
              </button>
            </div>

            {/* список */}
            <div className="space-y-5 max-h-[560px] overflow-y-auto pr-2 scrollbar-anin">
              <AnimatePresence>
                {filteredReviews.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 bg-white/70 rounded-3xl border border-slate-200"
                  >
                    <div className="text-5xl mb-3">💫</div>
                    <p className="text-slate-600 text-base">
                      {t("reviews.empty")}
                    </p>
                    <p className="text-slate-400 text-xs mt-1">
                      Будьте первым, кто оставит отзыв о студии.
                    </p>
                  </motion.div>
                ) : (
                  filteredReviews.map((r, index) => (
                    <motion.div
                      key={r.id || `${r.name}-${index}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      className="group bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-[#FFD700]/70 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FDE6CF] to-[#F9D6DF] flex items-center justify-center text-slate-800 font-semibold text-lg border border-white shadow-xs">
                          {getInitials(r.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900 truncate">
                              {r.name || "Анонимный гость"}
                            </h4>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${getRatingColor(
                                r.rating || 0
                              )}`}
                            >
                              {r.rating}.0 ★
                            </span>
                          </div>
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-sm ${
                                  star <= (r.rating || 0)
                                    ? "text-amber-400"
                                    : "text-slate-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-700 leading-relaxed text-sm sm:text-[15px]">
                        “{r.review}”
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span>ANIN Beauty Studio</span>
                        <span className="text-lg text-rose-200">❝</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT — форма + статистика */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-5 lg:space-y-6"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/95 rounded-3xl p-7 sm:p-8 shadow-lg border border-slate-200"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-1">
                  {t("reviews.form_title")}
                </h3>
                <p className="text-base sm:text-sm text-slate-500">
                  Поделитесь вашими впечатлениями — это помогает другим гостям
                  и команде студии.
                </p>
              </div>

              <div className="space-y-5">
                {/* имя */}
                <div>
                  <label className="block text-base sm:text-sm font-medium text-slate-700 mb-2.5">
                    {t("reviews.field_name")}
                  </label>
                  <div className="relative">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-[#8B0000] focus:border-transparent text-sm transition-all placeholder-slate-400"
                      placeholder={t("reviews.field_name")}
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      👤
                    </div>
                  </div>
                </div>

                {/* рейтинг */}
                <div>
                  <label className="block text-base sm:text-sm font-medium text-slate-700 mb-2.5">
                    Ваша оценка
                  </label>
                  <div className="flex gap-2 rounded-2xl bg-slate-50 px-4 py-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-2xl transition-all ${
                          star <= rating
                            ? "text-amber-400 drop-shadow-sm"
                            : "text-slate-300 hover:text-amber-200"
                        }`}
                      >
                        ★
                      </motion.button>
                    ))}
                  </div>
                  <div className="text-center text-base text-slate-500 mt-2">
                    {rating === 5 && "Отлично! 🌟 Нам очень приятно."}
                    {rating === 4 && "Хорошо! 👍 Будем рады увидеть вас снова."}
                    {rating === 3 && "Нормально 👌 Напишите, что можно улучшить."}
                    {rating <= 2 && "Расскажите подробнее — нам важно стать лучше 💪"}
                  </div>
                </div>

                {/* отзыв */}
                <div>
                  <label className="block text-base sm:text-sm font-medium text-slate-700 mb-2.5">
                    {t("reviews.field_review")}
                  </label>
                  <div className="relative">
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-[#8B0000] focus:border-transparent text-sm transition-all resize-none placeholder-slate-400"
                      placeholder={t("reviews.field_review")}
                    />
                    <div className="absolute top-3 right-3 text-slate-400">
                      💬
                    </div>
                  </div>
                </div>

                {/* кнопка */}
                <motion.button
                  type="submit"
                  disabled={!name.trim() || !review.trim() || isSubmitting}
                  whileHover={{ scale: !isSubmitting ? 1.02 : 1 }}
                  whileTap={{ scale: !isSubmitting ? 0.98 : 1 }}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#8B0000] via-[#C92A4A] to-[#F59E0B] text-white rounded-2xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Отправка…
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      {t("reviews.button_send")}
                      <span className="text-lg">✨</span>
                    </div>
                  )}
                </motion.button>

                <p className="text-center text-[15px] text-slate-400 pt-1">
                  Отзыв увидят только администратор и гости, которые выбирают студию.
                </p>
              </div>
            </form>

            {/* статистика */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { number: total, label: "Всего отзывов" },
                { number: positive, label: "Положительных" },
                { number: avg, label: "Средний рейтинг" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3.5 bg-white/90 rounded-2xl border border-slate-200 shadow-sm"
                >
                  <div className="text-lg sm:text-xl font-semibold text-slate-900">
                    {stat.number}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CustomerReviews;