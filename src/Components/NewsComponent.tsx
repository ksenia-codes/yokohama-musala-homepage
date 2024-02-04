import React from "react";

function NewsComponent() {
  return (
    <div className="bg-color-div main-section-container">
      <h3>News & Updates</h3>
      <div className="main-section-news-container disp-flex">
        <div className="disp-flex main-section-news-entries">
          <div className="main-section-news-date">June 27, 2023</div>
          <div className="main-section-news-title">
            Eid al-Adha 2023 announcement
          </div>
        </div>
        <div className="disp-flex main-section-news-entries">
          <div className="main-section-news-date">April 30, 2023</div>
          <div className="main-section-news-title">Hajj 2023 tour</div>
        </div>
        <div className="disp-flex main-section-news-entries">
          <div className="main-section-news-date">April 21, 2023</div>
          <div className="main-section-news-title">
            Eid al-Fitr 2023 announcement
          </div>
        </div>
        <div className="disp-flex main-section-news-entries">
          <div className="main-section-news-date">March 20, 2023</div>
          <div className="main-section-news-title">
            Ramadhan 2023 announcement
          </div>
        </div>
        <div className="disp-flex main-section-news-entries">
          <div className="main-section-news-date">November 10, 2022</div>
          <div className="main-section-news-title">Umrah tour</div>
        </div>
      </div>
    </div>
  );
}

export default NewsComponent;
