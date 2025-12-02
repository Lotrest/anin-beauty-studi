import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BASE_URL = "https://anin-beauty-studio-production.up.railway.app";

function ClientBookingsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("anin_client_token");
  const phone = localStorage.getItem("anin_client_phone");

  useEffect(() => {
    if (!token) {
      navigate("/client-login");
      return;
    }

    async function load() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${BASE_URL}/client/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || t("client.bookings.error_loading"));
        }

        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token, navigate]);

  async function handleCancel(id) {
    if (!window.confirm(t("client.bookings.confirm_cancel"))) return;

    try {
      const res = await fetch(`${BASE_URL}/client/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || t("client.bookings.cancel_error"));
      }

      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white p-30">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-4 sm:p-6">
        
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-[#8B0000]">
              {t("client.bookings.title")}
            </h1>

            {phone && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {t("client.bookings.phone_label")} {phone}
              </p>
            )}
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-500">
            {t("client.bookings.loading")}
          </p>
        )}

        {error && !loading && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-4">
            {error}
          </div>
        )}

        {!loading && bookings.length === 0 && !error && (
          <p className="text-center text-gray-500 text-sm sm:text-base">
            {t("client.bookings.empty")}
          </p>
        )}

        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border border-gray-100 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <div className="text-sm sm:text-base font-semibold text-[#8B0000]">
                  {b.services}
                </div>

                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  {t("client.bookings.master")} {b.master}
                </div>

                <div className="text-xs sm:text-sm text-gray-500">
                  {t("client.bookings.date")} {b.date} • {t("client.bookings.time")} {b.time}
                </div>
              </div>

              <button
                onClick={() => handleCancel(b.id)}
                className="text-xs sm:text-sm px-3 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
              >
                {t("client.bookings.cancel")}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ClientBookingsPage;
