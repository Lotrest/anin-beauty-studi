import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";

// импортируем из папки main
import HeroSection from "./main/HeroSection";
import WhyChooseSection from "./main/WhyChooseSection";
import CustomerReviews from "./main/CustomerReviews";
import ContactsSection from "./main/ContactsSection";

// страницы
import ServicesPage from "./Page/ServicesPage";
import AboutPage from "./Page/AboutPage";
import ContactsPage from "./Page/ContactsPage"
import JobSection from "./main/JobSection";

import ScrollToTop from "./components/ScrollToTop";
import AdminPage from "./Page/AdminPage";
import ClientRegisterPage from "./Page/ClientRegisterPage";
import ClientLoginPage from "./Page/ClientLoginPage";
import ClientBookingsPage from "./Page/ClientBookingsPage";
function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Header />
      <main className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <WhyChooseSection />
              <JobSection/>
              <CustomerReviews />
              <ContactsSection />
            </>
          }
        />
        <Route path="/admin" element={<AdminPage />}/>
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/client-register" element={<ClientRegisterPage />} />
        <Route path="/client-login" element={<ClientLoginPage />} />
        <Route path="/client-bookings" element={<ClientBookingsPage />} />
      </Routes>
      </main>
    </Router>
  );
}

export default App;
