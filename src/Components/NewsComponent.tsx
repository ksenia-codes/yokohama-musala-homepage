import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PaginationComponent } from "./PaginationComponent";
import { INews } from "../common/NewsInterface";
import newsJSON from "../assets/json/news.json";
import { PAGE_NAMES } from "../common/Const";

interface Props {
  containerClassName: string;
  className: string;
  pageName: string;
}

function NewsComponent({ containerClassName, className, pageName }: Props) {
  // useNavigate
  let navigate = useNavigate();
  const handleNewsOnClick = (path: string, news: INews) => {
    navigate(path, { state: { newsEntry: news } });
  };

  // retrieve and sort news by date (newest first)
  const news = newsJSON.news.filter((a) => a.visible);
  const sortedNews = news.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // set pagination (for the news page)
  let PageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return sortedNews.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  // get the newest 5 (for the main page)
  const newToDisplay =
    pageName === PAGE_NAMES.news ? currentData : sortedNews.slice(0, 5);

  return (
    <div className={`bg-color-div ${containerClassName}-container`}>
      <h3>News & Updates</h3>
      {newToDisplay.map((news) => (
        <div
          className={`disp-flex hover-cursor ${className}-entries`}
          onClick={() => handleNewsOnClick(`/news/${news.id}`, news)}
          key={news.id}
        >
          <div className={`${className}-entry-date`}>
            {new Date(news.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className={`${className}-entry-title`}>{news.title}</div>
        </div>
      ))}
      {pageName === PAGE_NAMES.news ? (
        <PaginationComponent
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={sortedNews.length}
          pageSize={PageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default NewsComponent;
