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
import UpdateNewsEntry from "./Admin/UpdateNewsEntry";
import Login from "./Login";
import FooterComponent from "../components/FooterComponent";
import { HeaderProvider } from "../common/context/HeaderContext";

function Page() {
  enum ScreenMode {
    edit = "edit",
    add = "add",
  }
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
            <Route path="/login" element={<Login />}></Route>
            <Route path="/admin" element={<AdminMain />}></Route>
            <Route
              path="/admin/prayertimes"
              element={<UpdatePrayerTimes />}
            ></Route>
            <Route path="/admin/news" element={<UpdateNewsList />}></Route>
            <Route
              path="/admin/news/:id"
              element={<UpdateNewsEntry mode={ScreenMode.edit} />}
            ></Route>
            <Route
              path="/admin/news/add"
              element={<UpdateNewsEntry mode={ScreenMode.add} />}
            ></Route>
          </Routes>
        </div>
        <FooterComponent></FooterComponent>
      </HeaderProvider>
    </Router>
  );
}

export default Page;
