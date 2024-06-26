import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";

import { db } from "../firebase/firebase";
import { PaginationComponent } from "./PaginationComponent";
import { INews } from "../common/Interfaces";
import { PAGE_NAMES } from "../common/Const";
import dayjs from "dayjs";

interface Props {
  containerClassName: string;
  className: string;
  pageName: string;
}

function NewsComponent({ containerClassName, className, pageName }: Props) {
  const [newsData, setNewsData] = useState([] as INews[]);

  // useEffect
  useEffect(() => {
    fetchNewsData();
  }, []);

  async function fetchNewsData() {
    const q = query(collection(db, "news_tbl"), where("visible", "==", true));
    const newsSnapshot = await getDocs(q);
    const newsData = newsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as INews[];

    if (newsData) {
      let filteredNews = newsData.filter((news) => dayjs(news.date) <= dayjs());
      setNewsData(
        filteredNews.sort((a, b) => (dayjs(a.date) > dayjs(b.date) ? -1 : 1))
      );
    }
  }

  // useNavigate
  let navigate = useNavigate();
  const handleNewsOnClick = (news: INews) => {
    navigate(`/news/${news.id}`);
  };

  // set pagination (for the news page)
  let PageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return newsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, newsData]);

  // get the newest 5 (for the main page)
  const newToDisplay =
    pageName === PAGE_NAMES.news ? currentData : newsData.slice(0, 5);

  return (
    <div className={`bg-color-div ${containerClassName}-container`}>
      <h3>News & Updates</h3>
      {newToDisplay.map((news) => (
        <div
          className={`disp-flex hover-cursor ${className}-entries`}
          onClick={() => handleNewsOnClick(news)}
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
          totalCount={newsData.length}
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
