import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//
import HeaderComponent from "../components/HeaderComponent";
import Main from "./Main";
import News from "./News";
import Services from "./Services";
import PrayerTimes from "./PrayerTimes";
import Contact from "./Contact";
import Access from "./Access";
import FooterComponent from "../components/FooterComponent";

function Page() {
  return (
    <Router>
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
        </Routes>
      </div>
      <FooterComponent></FooterComponent>
    </Router>
  );
}

export default Page;
