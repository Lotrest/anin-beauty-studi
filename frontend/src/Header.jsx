import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function Header() {
  const [visible, setVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Проверяем авторизацию клиента
  const token = localStorage.getItem("anin_client_token");
  const phone = localStorage.getItem("anin_client_phone");

  useEffect(() => {
    setVisible(true);
  }, []);

  function handleLogout() {
    localStorage.removeItem("anin_client_token");
    localStorage.removeItem("anin_client_phone");
    navigate("/client-login");
  }

  return (
    <header
      className={
        "fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] z-50 transition-all duration-700 ease-out " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5")
      }
    >
      <div className="flex justify-between items-center px-8 py-2 text-[#8B0000]">
        <div className="backdrop-blur-xl glass-inner px-8 py-2 hidden sm:flex">
          <h1 className="rounded-full text-2xl sm:text-3xl font-playfair font-bold tracking-wide select-none cursor-pointer hidden sm:flex">
            ANIN
          </h1>
        </div>

        {/* DESKTOP NAV */}
        <nav className="backdrop-blur-xl glass-inner px-8 py-4 rounded-3xl gap-4 sm:gap-7 text-sm sm:text-base font-medium hidden sm:flex">
          <Link to="/" className="hover:text-[#D6A85A] transition-colors">
            {t("header.home")}
          </Link>

          <Link
            to="/services"
            className="hover:text-[#D6A85A] transition-colors"
          >
            {t("header.services")}
          </Link>

          <Link
            to="/contacts"
            className="hover:text-[#D6A85A] transition-colors"
          >
            {t("header.contacts")}
          </Link>

          <Link to="/about" className="hover:text-[#D6A85A] transition-colors">
            {t("header.about")}
          </Link>
        </nav>

        {/* DESKTOP RIGHT BLOCK */}
        <div className="backdrop-blur-xl glass-inner px-8 py-2 shadow-lg rounded-3xl flex gap-4 text-[#8B0000] hidden sm:flex items-center">
          {/* LANG SELECT */}
          <select
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              localStorage.setItem("lang", e.target.value);
            }}
            className="bg-transparent outline-none font-bold"
            defaultValue={i18n.language}
          >
            <option value="ru">RU</option>
            <option value="kz">KZ</option>
          </select>

          {/* CLIENT AUTH BUTTON */}
          {!token ? (
            <Link
              to="/client-login"
              className="hover:text-[#D6A85A] bg-transparent outline-none font-bold transition-all"
            >
              {t("header.enter")}
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/client-bookings"
                className="hover:text-[#D6A85A] bg-transparent outline-none font-bold transition-all"
              >
                Личный кабинет
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm hover:text-red-600 transition"
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE BURGER */}
      <div
        className="sm:hidden flex flex-col gap-[6px] cursor-pointer glass-inner w-10 px-2 py-2 justify-center rounded-2xl ml-auto mr-5 mt-2 shadow-[0_0_12px_rgba(255,215,0,0.6)] active:scale-95 transition-all"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="w-6 h-[2px] bg-[#8B0000] rounded-full"></span>
        <span className="w-6 h-[2px] bg-[#8B0000] rounded-full"></span>
        <span className="w-6 h-[2px] bg-[#8B0000] rounded-full"></span>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="sm:hidden flex flex-col items-center text-center gap-4 mt-3 glass-inner rounded-3xl mx-4 py-6 shadow-[0_0_25px_rgba(255,215,0,0.5)] backdrop-blur-xl border border-[#FFD700]/40"
        >
          <h1 className="text-3xl font-playfair font-bold text-[#8B0000]">
            ANIN
          </h1>

          <Link
            to="/"
            className="text-[#8B0000] text-xl font-semibold hover:text-[#D6A85A] transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("header.home")}
          </Link>

          <Link
            to="/services"
            className="text-[#8B0000] text-xl font-semibold hover:text-[#D6A85A] transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("header.services")}
          </Link>

          <Link
            to="/contacts"
            className="text-[#8B0000] text-xl font-semibold hover:text-[#D6A85A] transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("header.contacts")}
          </Link>

          <Link
            to="/about"
            className="text-[#8B0000] text-xl font-semibold hover:text-[#D6A85A] transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("header.about")}
          </Link>

          {/* AUTH IN MOBILE */}
          {!token ? (
            <Link
              to="/client-login"
              className="text-lg font-semibold text-[#8B0000] hover:text-[#D6A85A] transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Войти
            </Link>
          ) : (
            <>
              <Link
                to="/client-bookings"
                className="text-lg font-semibold text-[#8B0000] hover:text-[#D6A85A] transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Личный кабинет
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-lg font-semibold text-red-600 hover:text-red-800 transition-all"
              >
                Выйти
              </button>
            </>
          )}

          {/* Language */}
          <select
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              localStorage.setItem("lang", e.target.value);
            }}
            defaultValue={i18n.language}
            className="mt-2 bg-white/40 text-[#8B0000] font-semibold px-4 py-2 rounded-xl shadow-inner border border-[#FFD700]/50 focus:outline-none"
          >
            <option value="ru">RU</option>
            <option value="kz">KZ</option>
          </select>
        </motion.div>
      )}
    </header>
  );
}

export default Header;
