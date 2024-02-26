import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages and components
import HeaderComponent from "../components/HeaderComponent";
import Main from "./Main";
import News from "./News";
import Services from "./Services";
import PrayerTimes from "./PrayerTimes";
import Contact from "./Contact";
import Access from "./Access";
import AdminMain from "./Admin/AdminMain";
import UpdatePrayerTimes from "./Admin/UpdatePrayerTimes";
import UpdateNewsList from "./Admin/UpdateNewsList";
import FooterComponent from "../components/FooterComponent";
import { HeaderProvider } from "../styles/HeaderContext";

function Page() {
  return (
    <Router>
      <HeaderProvider>
        <HeaderComponent></HeaderComponent>
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/news" element={<News />}></Route>
            <Route path="/news/:id" element={<News />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/prayertimes" element={<PrayerTimes />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/access" element={<Access />}></Route>
            {/* Admin menu ↓ */}
            <Route path="/admin" element={<AdminMain />}></Route>
            <Route
              path="/admin/prayertimes"
              element={<UpdatePrayerTimes />}
            ></Route>
            <Route path="/admin/news" element={<UpdateNewsList />}></Route>
            <Route path="/admin/news:id" element={<UpdateNewsList />}></Route>
          </Routes>
        </div>
        <FooterComponent></FooterComponent>
      </HeaderProvider>
    </Router>
  );
}

export default Page;
