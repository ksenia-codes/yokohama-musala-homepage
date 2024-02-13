import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { INews } from "../common/NewsInterface";
import newsJSON from "../assets/json/news.json";

function News() {
  // useNavigate
  let navigate = useNavigate();

  // useParams
  const { id } = useParams();
  let newsEntry;

  // fetch and show the news entry, if there is URL parameter id
  if (id) {
    newsEntry = newsJSON.news.find((news) => news.id === Number(id)) || null;

    return newsEntry ? (
      <div className="page-container">
        <h2>{newsEntry.title}</h2>
        <div className="news-entry-date">
          {new Date(newsEntry.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="news-entry-content">{newsEntry.content}</div>
      </div>
    ) : (
      <div className="news-container">The news entry does not exist</div>
    );
  } else {
    // TODO: add pagination

    // otherwise, fetch and show the list of news
    const handleNewsOnClick = (path: string, news: INews) => {
      navigate(path, { state: { newsEntry: news } });
    };

    // retrieve news and sort by date (newest first)
    const news = newsJSON.news;
    const sortedNews = news.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
      <div className="news-container page-container">
        <h2>News & Updates</h2>
        {sortedNews.map((news) => (
          <div
            className="disp-flex hover-cursor news-list-entries"
            key={news.id}
            onClick={() => handleNewsOnClick(`/news/${news.id}`, news)}
          >
            <div className="news-list-entry-date">
              {new Date(news.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="news-list-entry-title">{news.title}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default News;
