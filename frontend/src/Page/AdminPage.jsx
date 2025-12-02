import { useEffect, useState } from "react";

function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedMaster, setSelectedMaster] = useState("Все");
  const [sortOrder, setSortOrder] = useState("asc");

  const BASE_URL = "https://anin-beauty-studio-production.up.railway.app";

  function parseDate(datestr) {
    if (!datestr) return new Date(0);
    const parts = datestr.split(".");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return new Date(`${year}-${month}-${day}`);
  }

const MASTER_MAP = {
  "Анна Якунина": "Анна",
  "Ольга Латута": "Ольга",
  "Марина Семенова": "Марина"
};

useEffect(() => {
  const masterParam =
    selectedMaster === "Все"
      ? ""
      : MASTER_MAP[selectedMaster] || selectedMaster;

  const url =
    masterParam === ""
      ? `${BASE_URL}/bookings`
      : `${BASE_URL}/bookings?master=${encodeURIComponent(masterParam)}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const sorted = [...data].sort((a, b) => {
        const d1 = parseDate(a.date);
        const d2 = parseDate(b.date);
        return sortOrder === "asc" ? d1 - d2 : d2 - d1;
      });
      setBookings(sorted);
    })
    .catch(() => setBookings([]));
}, [selectedMaster, sortOrder]);

  function handleDelete(id) {
    fetch(`${BASE_URL}/bookings/${id}`, { method: "DELETE" }).then(() => {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    });
  }

  return (
    <section className="mt-16 min-h-screen bg-[#FFF9F2] py-8 sm:py-12 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-3xl font-semibold text-[#8B0000] mb-1 sm:mb-2">
            Журнал записей
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Управление записями клиентов
          </p>
        </div>

        {/* Фильтры */}
        <div className="bg-white rounded-2xl shadow-md border border-[#F3E1B9] p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">
                Фильтр по мастеру
              </label>
              <select
                value={selectedMaster}
                onChange={(e) => setSelectedMaster(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] bg-white"
              >
                <option>Все</option>
                <option>Анна Якунина</option>
                <option>Ольга Латута</option>
                <option>Марина Семенова</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">
                Сортировка по дате
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] bg-white"
              >
                <option value="asc">Сначала старые</option>
                <option value="desc">Сначала новые</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===== МОБИЛЬНАЯ ВЕРСИЯ (карточки) ===== */}
        <div className="sm:hidden space-y-4">
          {bookings.length === 0 ? (
            <p className="text-center text-slate-500 text-sm">
              Записей пока нет
            </p>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-[#F3E1B9] shadow p-4 space-y-2"
              >
                <p className="text-xs text-slate-400">Мастер</p>
                <p className="font-semibold text-sm">{b.master}</p>

                <p className="text-xs text-slate-400">Услуга</p>
                <p className="text-sm">{b.services}</p>

                <p className="text-xs text-slate-400">Клиент</p>
                <p className="text-sm">{b.name}</p>

                <p className="text-xs text-slate-400">Телефон</p>
                <p className="text-sm">{b.phone}</p>

                <div className="flex justify-between text-sm pt-2 border-t">
                  <span>{b.date}</span>
                  <span>{b.time}</span>
                </div>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="w-full mt-3 bg-red-600 text-white py-2 rounded-xl text-sm"
                >
                  Удалить запись
                </button>
              </div>
            ))
          )}
        </div>

        {/* ===== ДЕСКТОП ВЕРСИЯ (таблица) ===== */}
        <div className="hidden sm:block bg-white rounded-2xl shadow-md border border-[#F3E1B9] p-4">
          <div className="w-full overflow-x-auto">
            <table className="min-w-[700px] w-full border-collapse text-sm">
              <thead className="bg-[#8B0000] text-white">
                <tr>
                  <th className="px-3 py-3 text-left">Мастер</th>
                  <th className="px-3 py-3 text-left">Услуга</th>
                  <th className="px-3 py-3 text-left">Имя</th>
                  <th className="px-3 py-3 text-left">Телефон</th>
                  <th className="px-3 py-3 text-left">Дата</th>
                  <th className="px-3 py-3 text-left">Время</th>
                  <th className="px-3 py-3 text-center">Действия</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-slate-500">
                      Записей пока нет
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="px-3 py-2">{b.master}</td>
                      <td className="px-3 py-2">{b.services}</td>
                      <td className="px-3 py-2">{b.name}</td>
                      <td className="px-3 py-2">{b.phone}</td>
                      <td className="px-3 py-2">{b.date}</td>
                      <td className="px-3 py-2">{b.time}</td>
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminPage;
