import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BASE_URL = "https://anin-beauty-studio-production.up.railway.app";

function ClientRegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError(t("client.register.passwords_not_match"));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || t("client.register.error"));
      }

      localStorage.setItem("anin_client_token", data.token);
      localStorage.setItem("anin_client_phone", data.client.phone || phone);

      navigate("/client-bookings");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-white px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-[#8B0000] mb-3">
          {t("client.register.title")}
        </h1>
        <p className="text-sm sm:text-base text-gray-500 text-center mb-6">
          {t("client.register.subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("client.register.first_name")}
              </label>
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t("client.register.last_name")}
              </label>
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("client.register.phone")}
            </label>
            <input
              type="tel"
              className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+7 777 123 45 67"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("client.register.password")}
            </label>
            <input
              type="password"
              className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("client.register.confirm_password")}
            </label>
            <input
              type="password"
              className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={4}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white py-2.5 rounded-xl text-sm sm:text-base font-medium shadow-md hover:opacity-90 transition disabled:opacity-60"
          >
            {loading
              ? t("client.register.loading")
              : t("client.register.button")}
          </button>
        </form>

        <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
          {t("client.register.have_account")}{" "}
          <Link to="/client-login" className="text-[#8B0000] font-semibold">
            {t("client.register.login_link")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ClientRegisterPage;
