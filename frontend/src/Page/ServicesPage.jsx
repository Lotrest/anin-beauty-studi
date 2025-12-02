import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';
import 'react-calendar/dist/Calendar.css';

function ServicesPage(){
    const { t } = useTranslation();
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    
    const filters = [
        {id: "all", name: t('services.filters.all'), icon: "🌟"},
        {id: "manicure", name: t('services.filters.manicure'), icon: "💅"},
        {id: "pedicure", name: t('services.filters.pedicure'), icon: "👣"},
        {id: "cosmetic", name: t('services.filters.cosmetic'), icon: "✨"}
    ];

    const [selectedCategory,setSelectedCategory] = useState("all");
    const [selectedMasterId, setSelectedMasterId] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedIsBooking, setSelectedIsBooking] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [unavailableTimes, setUnavailableTimes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("anin_client_token");
    const [client, setClient] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const calendarRef = useRef(null);
    

    const [formDate, setFormDate] = useState({
        name:"",
        phone:"",
        date:"",
        time:""
    });

    const allTimes = [
        "Выберите время","08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00"
    ];

    const availableTimes = allTimes.filter((time)=>!unavailableTimes.includes(time));

    const services = [
        { id: 1, title: t('services.items.1'), price: "4 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 2, title: t('services.items.2'), price: "5 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 3, title: t('services.items.3'), price: "7 000 тг",duration: 60, category: ["pedicure", "all"] },
        { id: 4, title: t('services.items.4'), price: "2 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 5, title: t('services.items.5'), price: "3 000 тг",duration: 60, category: ["manicure", "pedicure", "all"] },
        { id: 6, title: t('services.items.6'), price: "1 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 7, title: t('services.items.7'), price: "2 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 8, title: t('services.items.8'), price: "3 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 9, title: t('services.items.9'), price: "6 000 тг",duration: 60, category: ["manicure", "all"]},
        { id: 10, title: t('services.items.10'), price: "7 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 11, title: t('services.items.11'), price: "9 000 тг",duration: 60, category: ["pedicure", "all"] },
        { id: 12, title: t('services.items.12'), price: "6 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 13, title: t('services.items.13'), price: "8 000 тг",duration: 60, category: ["pedicure", "all"] },
        { id: 14, title: t('services.items.14'), price: "4 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 15, title: t('services.items.15'), price: "6 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 16, title: t('services.items.16'), price: "3 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 17, title: t('services.items.17'), price: "4 000 тг",duration: 60, category: ["pedicure", "all"] },
        { id: 18, title: t('services.items.18'), price: "3 000 тг",duration: 60, category: ["pedicure", "all"]},
        { id: 19, title: t('services.items.19'), price: "2 000 тг",duration: 60, category: ["pedicure", "all"] },
        { id: 20, title: t('services.items.20'), price: "2 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 21, title: t('services.items.21'), price: "1 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 22, title: t('services.items.22'), price: "4 000 тг",duration: 60, category: ["pedicure", "all"] },
        { id: 23, title: t('services.items.23'), price: "3 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 24, title: t('services.items.24'), price: "4 000 тг",duration: 60, category: ["pedicure", "all"] },
        { id: 25, title: t('services.items.25'), price: "3 000 тг",duration: 60, category: ["manicure", "all"] },
        { id: 26, title: t('services.items.26'), price: "4 000 тг",duration: 60, category: ["pedicure", "all"] },
        { id: 27, title: t('services.items.27'), price: "2 000 тг",duration: 60, category: ["cosmetic", "all"] },
        { id: 28, title: t('services.items.28'), price: "2 000 тг",duration: 60, category: ["cosmetic", "all"] },
        { id: 29, title: t('services.items.29'), price: "1 500 тг",duration: 60, category: ["cosmetic", "all"] },
        { id: 30, title: t('services.items.30'), price: "4 500 тг",duration: 60, category: ["cosmetic", "all"] },
        { id: 31, title: t('services.items.31'), price: "7 000 тг",duration: 60, category: ["cosmetic", "all"]  },
        { id: 32, title: t('services.items.32'), price: "5 000 тг",duration: 60, category: ["cosmetic", "all"] },
        { id: 33, title: t('services.items.33'), price: "7 000 тг",duration: 60, category: ["cosmetic", "all"] },
        { id: 34, title: t('services.items.34'), price: "5 000 тг",duration: 60, category: ["cosmetic", "all"] },
        { id: 35, title: t('services.items.35'), price: "15 000 тг",duration: 60, category: ["cosmetic", "all"] },
        { id: 36, title: t('services.items.36'), price: "8 000 тг",duration: 60, category: ["cosmetic", "all"], },
        { id: 37, title: t('services.items.37'), price: "от 25 000 тг",duration: 60, category: ["cosmetic", "all"] },
        { id: 38, title: t('services.items.38'), price: "1 200 тг",duration: 60, category: ["cosmetic", "all"] },
        { id: 39, title: t('services.items.39'), price: "15 000 тг",duration: 120, category: ["cosmetic", "all"]},
        { id: 40, title: t('services.items.40'), price: "10 000 тг",duration: 60, category: ["cosmetic", "all"] },
    ];

    const filteredServices = services.filter(
        (s) => s.category.includes(selectedCategory)
    );

    const master = [
        {
            id: 1,
            i18nKey: "anna",
            name: "Анна",
            photo: "/images/master2.jpg",
            services: ["pedicure", "manicure"],
            specialization: ["Ногтевой дизайн", "SPA уход"],
             workingDays: ["tue", "wed", "fri", "sat"]
        },
        {
            id: 2,
            i18nKey: "olga",
            name: "Ольга",
            photo: "/images/master3.jpg",
            services: ["pedicure", "manicure"],
            specialization: ["Аппаратный педикюр", "Гель-лак"],
            workingDays: "everyOtherDay"
        },
        {
            id: 3,
            i18nKey: "marina",
            name: "Марина",
            photo: "/images/master1.jpg",
            services: ["cosmetic"],
            specialization: ["Уходовые процедуры", "Чистка лица"],
             workingDays: ["tue", "wed", "fri", "sat"]
        }
    ];

    const selectedMaster = master.find((m) => m.id === selectedMasterId);
    const mastersForService = selectedService 
        ? master.filter(m => m.services.includes(selectedService.category[0]))
        : [];

        function getBlockedTimes(startTime, duration) {
    const result = [];
    let [hour, minute] = startTime.split(":").map(Number);
  
    const slots = duration / 60; // 120 -> 2 слота

    for (let i = 0; i < slots; i++) {
        const h = (hour + i).toString().padStart(2, "0");
        result.push(`${h}:00`);
    }

    return result;
}

    useEffect(() => {
    if (!selectedMaster || !formDate.date) return;

    setIsLoadingSlots(true);
    const url = `https://anin-beauty-studio-production.up.railway.app/bookings?date=${formDate.date}&master=${selectedMaster.name}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
    let busy = [];

    data.forEach(item => {
        // item.time — начальный слот
        // item.services — название услуги (нам нужно найти duration)
        const service = services.find(s => s.title === item.services);

        const duration = service?.duration || 60;
        const blocked = getBlockedTimes(item.time, duration);

        busy.push(...blocked);
    });

    setUnavailableTimes(busy);
})
        .finally(() => setIsLoadingSlots(false));
}, [formDate.date, selectedMaster, selectedService]);

    // Закрытие календаря при клике вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCalendar && calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showCalendar]);

    function handleBookingSubmit() {

        const selectedDateObj = new Date(
    formDate.date.split('.').reverse().join('-')
);

if (!isDayAllowed(selectedDateObj, selectedMaster)) {
    alert("Этот мастер в этот день не работает");
    return;
}
        setIsLoading(true);
        
        const dataToSend = { 
    date: formDate.date,
    time: formDate.time,
    master: selectedMaster?.name,
    services: selectedService?.title,
    phone: client.phone,         // БЕРЁМ ТОЛЬКО ИЗ ПРОФИЛЯ
    name: client.first_name      // ТАК ТОЖЕ
};

        fetch("https://anin-beauty-studio-production.up.railway.app/bookings", {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(dataToSend),
})
            .then(() => {
                setSelectedRecord(true);
            })
            .catch(() => {
                console.error("Ошибка сервера");
            })
            .finally(() => setIsLoading(false));
    }

    const handleDateSelect = (newDate) => {
        setDate(newDate);
        setFormDate((prev) => ({
            ...prev,
            date: newDate.toLocaleDateString('ru-RU'),
        }));
        setShowCalendar(false);
    };

    useEffect(() => {
    if (token) {
        fetch("https://anin-beauty-studio-production.up.railway.app/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setClient(data));
    }
}, []);

function isDayAllowed(date, master) {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const day = days[date.getDay()];

    // Фиксированные рабочие дни
    if (Array.isArray(master.workingDays)) {
        return master.workingDays.includes(day);
    }

    // Нормализация даты (обнуление времени)
    function normalize(d) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    // Оля — через день
    if (master.workingDays === "everyOtherDay") {
        const start = normalize(new Date("2025-11-28")); // рабочий день
        const current = normalize(date);

        const diff = Math.floor((current - start) / 86400000);

        return diff % 2 === 0; // 0,2,4 — рабочие
    }

    return true;
}

    return(
        <section className="gap-10 min-h-screen w-full bg-gradient-to-br from-white via-rose-50/20 to-amber-50/20 py-20">
            {/* Секция мастеров */}
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-lg"
                    >
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-rose-700 uppercase tracking-widest">
                            {t('services.masters_title')}
                        </span>
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl font-light text-slate-800 mb-4">
                        {t('services.masters_title')}
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        {t('services.masters_title')}
                    </p>
                </motion.div>

                {/* Карточки мастеров */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {master.map((m, index) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="bg-white/95 rounded-3xl border border-[#F3E1B9] shadow-[0_14px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_55px_rgba(0,0,0,0.14)] transition-all duration-300 h-full flex flex-col overflow-hidden">
                                <div className="relative bg-[#FFF7ED] rounded-t-3xl overflow-hidden flex justify-center">
                                    <img
                                        src={m.photo}
                                        alt={m.name}
                                        className="w-full h-auto max-h-[520px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                </div>

                                <div className="flex-1 p-6">
                                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                        {t(`services.masters.${m.i18nKey}.name`)}
                                    </h3>
                                    <p className="text-rose-600 font-medium mb-3">
                                        {t(`services.masters.${m.i18nKey}.role`)}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {m.specialization.map((spec, i) => (
                                            <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="px-6 pb-6 pt-0">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedMasterId(m.id)}
                                        className="w-full py-3 rounded-xl font-medium bg-slate-900 text-white hover:bg-slate-950 shadow-[0_10px_28px_rgba(15,23,42,0.35)] transition-colors"
                                    >
                                        {t("services.read_more")}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Секция услуг */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-lg"
                    >
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-amber-700 uppercase tracking-widest">
                            {t('services.services_title')}
                        </span>
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl font-light text-slate-800 mb-4">
                        {t('services.services_title')}
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        {t('services.services_title')}
                    </p>
                </motion.div>

                {/* Фильтры */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {filters.map((i) => (
                        <motion.button
                            key={i.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(i.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all ${
                                selectedCategory === i.id 
                                ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg"
                                : "bg-white text-slate-600 border border-slate-200 hover:border-rose-200"
                            }`}
                        >
                            <span>{i.icon}</span>
                            {i.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Сетка услуг */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {filteredServices.map((service) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">
                                {service.title}
                            </h3>
                            
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-rose-600">
                                    {service.price}
                                </span>
                                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                                    <span className="text-rose-600">+</span>
                                </div>
                            </div>
                            
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
    if (!token) {
        setShowLoginModal(true);
        return;
    }

    setSelectedService(service);
}}


                                className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium hover:bg-slate-900 transition-colors"
                            >
                                {t('services.choose_master_btn')}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Модальные окна */}
            <AnimatePresence>
                {/* Модальное окно мастера */}
                {showLoginModal && (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl max-w-md w-full shadow-2xl text-center p-8"
        >
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Необходима авторизация
            </h2>

            <p className="text-slate-600 mb-6 leading-relaxed">
                Чтобы оформить запись, выполните вход.<br />
                Так вы сможете просматривать и отменять свои визиты в личном кабинете.
            </p>

            <button 
                onClick={() => window.location.href = "/client-login"}
                className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
                Войти / Зарегистрироваться
            </button>

            <button 
                onClick={() => setShowLoginModal(false)}
                className="w-full py-3 mt-3 rounded-xl border border-slate-300 text-slate-700 hover:border-slate-400 transition-colors"
            >
                Назад
            </button>
        </motion.div>
    </motion.div>
)}

                {selectedMasterId && !selectedIsBooking && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="relative bg-[#FFF7ED] rounded-t-3xl flex justify-center overflow-hidden">
                                <img
                                    src={selectedMaster.photo}
                                    alt={selectedMaster.name}
                                    className="w-full h-auto max-h-[70vh] object-contain rounded-t-3xl"
                                />
                                <button
                                    onClick={() => setSelectedMasterId(null)}
                                    className="absolute top-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all text-xl shadow"
                                >
                                    ✕
                                </button>
                                <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-b-3xl text-white">
                                    <h2 className="text-3xl sm:text-4xl font-bold">
                                        {t(`services.masters.${selectedMaster.i18nKey}.name`)}
                                    </h2>
                                    <p className="text-xl opacity-90">
                                        {t(`services.masters.${selectedMaster.i18nKey}.role`)}
                                    </p>
                                </div>
                            </div>

                            <div className="p-8">
                                 <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-3">
    О мастере
</h3>

<div className="text-slate-600 leading-relaxed mb-4 space-y-2">
    {t(`services.masters.${selectedMaster.i18nKey}.about`, { returnObjects: true })
        .map((line, i) => (
            <p key={i}>{line}</p>
        ))
    }
</div>

    </div>
                                <div className="mt-8 flex gap-4">
                                    <button
                                        onClick={() => setSelectedMasterId(null)}
                                        className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 hover:border-slate-400 transition-colors"
                                    >
                                        {t('services.back')}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedService({ category: selectedMaster.services });
                                            setSelectedIsBooking(true);
                                        }}
                                        className="flex-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                                    >
                                        {t('services.booking.book_btn')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Модальное окно выбора мастера для услуги */}
                {selectedService !== null && selectedMasterId === null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl max-w-md w-full shadow-2xl"
                        >
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                    {t('services.choose_master')}
                                </h2>
                                <p className="text-slate-600">
                                    Услуга: <span className="font-semibold text-rose-600">{selectedService.title}</span>
                                </p>
                            </div>

                            <div className="p-6 space-y-4">
                                {mastersForService.map((m) => (
                                    <div
                                        key={m.id}
                                        className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-rose-200 cursor-pointer transition-all"
                                        onClick={() => {
                                            setSelectedMasterId(m.id);
                                            setSelectedIsBooking(true);
                                        }}
                                    >
                                        <img 
                                            src={m.photo} 
                                            className="w-16 h-16 rounded-2xl object-cover"
                                            alt={m.name}
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-800">
                                                {m.name}
                                            </h3>
                                            <p className="text-rose-600 text-sm">
                                                {t(`services.masters.${m.i18nKey}.role`)}
                                            </p>
                                        </div>
                                        <div className="text-slate-400">
                                            →
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 border-t border-slate-200">
                                <button
                                    onClick={() => setSelectedService(null)}
                                    className="w-full py-3 rounded-xl border border-slate-300 text-slate-700 hover:border-slate-400 transition-colors"
                                >
                                    {t('services.back')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Модальное окно бронирования */}
                {selectedService !== null && selectedMasterId !== null && selectedIsBooking === true && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                    {t('services.booking.title')}
                                </h2>
                                <p className="text-slate-600">
                                    Мастер: <span className="font-semibold text-rose-600">{selectedMaster?.name}</span>
                                </p>
                                <p className="text-slate-600">
                                    Услуга: <span className="font-semibold">{selectedService.title}</span>
                                </p>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
  <label className="block text-sm font-medium text-slate-700 mb-2">Ваше имя</label>
  <input 
    value={client?.first_name || ""} 
    readOnly
    className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl"
  />
</div>

<div>
  <label className="block text-sm font-medium text-slate-700 mb-2">Ваш телефон</label>
  <input 
    value={client?.phone || ""} 
    readOnly
    className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl"
  />
</div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        {t('services.booking.input_date')}
                                    </label>
                                    <input
                                        value={formDate.date}
                                        onClick={() => setShowCalendar(!showCalendar)}
                                        readOnly 
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all cursor-pointer"
                                        placeholder={t('services.booking.input_date')}
                                    />
                                    
                                    {showCalendar && (
                                        <div 
                                            ref={calendarRef}
                                            className="absolute z-50 mt-2 bg-white p-4 rounded-xl shadow-2xl border border-slate-200 w-full max-w-[300px] left-0"
                                            style={{ top: '100%' }}
                                        >
                                            <Calendar
    value={date}
    onChange={(newDate) => {
        if (!isDayAllowed(newDate, selectedMaster)) {
            alert("Этот мастер в этот день не работает");
            return;
        }
        handleDateSelect(newDate);
    }}
    tileDisabled={({ date }) => !isDayAllowed(date, selectedMaster)}
    tileClassName={({ date }) => {
        if (!selectedMaster) return "";

        const allowed = isDayAllowed(date, selectedMaster);

        return allowed 
            ? "allowed-day"      // рабочие дни
            : "blocked-day";     // выходные
    }}
    minDate={new Date()}
/>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        {t('services.booking.input_time')}
                                    </label>
                                    <select
                                        value={formDate.time}
                                        onChange={(e) => setFormDate({ ...formDate, time: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
                                    >
                                        {availableTimes.map((time) => {

    const blocked = getBlockedTimes(time, selectedService.duration);

    // проверяем — все ли слоты свободны?
    const fits = blocked.every(t => !unavailableTimes.includes(t));

    return (
        <option key={time} value={time} disabled={!fits}>
            {time} {!fits ? "(занято)" : ""}
        </option>
    );
})}
                                    </select>
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-200 space-y-3">
                                <button 
                                    onClick={handleBookingSubmit}
                                    disabled={isLoading} 
                                    className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                                >
                                    {isLoading ? "Записываем..." : t('services.booking.book_btn')}
                                </button>
                                <button 
                                    onClick={() => {
                                        setSelectedMasterId(null)
                                        setSelectedIsBooking(false)
                                        setShowCalendar(false)
                                    }}
                                    className="w-full py-3 rounded-xl border border-slate-300 text-slate-700 hover:border-slate-400 transition-colors"
                                >
                                    {t('services.back')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Модальное окно успешного бронирования */}
                {selectedService !== null && selectedMasterId !== null && selectedIsBooking === true && selectedRecord === true && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl max-w-md w-full shadow-2xl text-center"
                        >
                            <div className="p-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-green-600">✓</span>
                                </div>
                                
                                <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                                    Запись успешна!
                                </h2>
                                <p className="text-slate-600 mb-6">
                                    Мы ждем вас в салоне!
                                </p>
                                
                                <button 
                                    onClick={() => {
                                        setSelectedService(null)
                                        setSelectedMasterId(null)
                                        setSelectedIsBooking(false)
                                        setSelectedRecord(false)
                                        setFormDate({ name: "", phone: "", date: "", time: "" })
                                        setShowCalendar(false)
                                    }}
                                    className="w-full bg-slate-800 text-white py-4 rounded-xl font-semibold hover:bg-slate-900 transition-colors"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default ServicesPage;