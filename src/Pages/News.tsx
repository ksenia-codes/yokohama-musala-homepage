import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { supabase } from "../supabase";
import { HeaderContext, HeaderContextType } from "../styles/HeaderContext";
import NewsComponent from "../components/NewsComponent";
import { INews } from "../common/Interfaces";
import { PAGE_NAMES } from "../common/Const";

function News() {
  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useState
  const [newsData, setNewsData] = useState([] as INews[]);

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.news);

    fetchNewsData();
  }, []);

  async function fetchNewsData() {
    const { data } = await supabase
      .from("news_tbl")
      .select()
      .filter("visible", "eq", "true")
      .order("id", { ascending: false })
      .limit(5);
    if (data !== null) {
      setNewsData(data);
      console.log(data);
    }
  }

  // useParams
  const { id } = useParams();
  let newsEntry;

  // fetch and show the news entry, if there is URL parameter id
  if (id) {
    newsEntry = newsData.find((news) => news.id === Number(id)) || null;

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
        {newsEntry.img.map((image) => (
          <img className="news-entry-image" src={image} alt="" key={image} />
        ))}
      </div>
    ) : (
      <div className="news-container">The news entry does not exist</div>
    );
  } else {
    return (
      <NewsComponent
        containerClassName="page"
        className="news-list"
        pageName={PAGE_NAMES.news}
      />
    );
  }
}

export default News;
