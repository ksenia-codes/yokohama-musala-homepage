import React from "react";
import { useNavigate } from "react-router-dom";

import { INews } from "../common/NewsInterface";
import newsJSON from "../assets/json/news.json";

function NewsComponent() {
  // useNavigate
  let navigate = useNavigate();
  const handleNewsOnClick = (path: string, news: INews) => {
    navigate(path, { state: { newsEntry: news } });
  };

  // retrieve and sort news by date (newest first)
  const news = newsJSON.news;
  const sortedNews = news.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  // get the newest 5
  const newestNews = sortedNews.slice(0, 5);

  return (
    <div className="bg-color-div main-section-container">
      <h3>News & Updates</h3>
      <div className="main-section-news-container disp-flex">
        {newestNews.map((news) => (
          <div
            className="disp-flex hover-cursor main-section-news-entries"
            key={news.id}
          >
            <div className="main-section-news-date">
              {new Date(news.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div
              className="main-section-news-title"
              onClick={() => handleNewsOnClick("/news", news)}
            >
              {news.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsComponent;
