import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, deleteDoc, doc, collection, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "../../firebase/firebase";
import Login from "../Login";
import { INews } from "../../common/Interfaces";
import { PaginationComponent } from "../../Components/PaginationComponent";
import {
  HeaderContext,
  HeaderContextType,
} from "../../common/context/HeaderContext";
import { PAGE_NAMES } from "../../common/Const";
import dayjs from "dayjs";

function UpdateNewsList() {
  const [user] = useAuthState(auth);

  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useNavigate
  let navigate = useNavigate();

  // useState
  const [newsData, setNewsData] = useState([] as INews[]);

  const handleEditOnClick = (news: INews) => {
    navigate(`/admin/news/${news.id}`);
  };

  const handleAddOnClick = () => {
    navigate("/admin/news/add");
  };

  const handleDeleteOnClick = async (id: string) => {
    if (
      window.confirm(
        "The news entry will be deleted permanently.\nAre you sure, you want to delete it?"
      )
    ) {
      // remove from db
      await deleteDoc(doc(db, "news_tbl", id)).then(() => {
        setNewsData(newsData.filter((data) => data.id !== id));
      });
    }
  };

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.admin);

    fetchNewsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNewsData = async () => {
    const q = query(collection(db, "news_tbl"));
    const newsSnapshot = await getDocs(q);
    const newsData = newsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as INews[];
    if (newsData) {
      setNewsData(
        newsData.sort((a, b) => (dayjs(a.date) > dayjs(b.date) ? -1 : 1))
      );
    }
  };

  // set pagination (for the news page)
  let PageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return newsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, newsData]);

  return user ? (
    <div className="admin-page-container">
      <div className="admin-page-content upd-news-list">
        <h2>Add or edit news & upates</h2>
        {currentData.map((news) => (
          <div className="disp-flex hover-cursor news-entries" key={news.id}>
            <div className="news-entry-date">
              {new Date(news.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="news-entry-title">{news.title}</div>
            <div className="disp-flex buttons">
              <div
                className="edit button"
                onClick={() => handleEditOnClick(news)}
              >
                Edit
              </div>
              <div
                className="delete button"
                onClick={() => news.id && handleDeleteOnClick(news.id)}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
        <div className="buttons">
          <div className="add button" onClick={() => handleAddOnClick()}>
            + Add
          </div>
        </div>
      </div>
      <PaginationComponent
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={newsData.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  ) : (
    <Login />
  );
}

export default UpdateNewsList;
