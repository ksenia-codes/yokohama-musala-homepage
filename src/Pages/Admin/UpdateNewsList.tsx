import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../supabase";
import { INews } from "../../common/Interfaces";
import { PaginationComponent } from "../../components/PaginationComponent";
import { PAGE_NAMES } from "../../common/Const";

function UpdateNewsList() {
  enum ScreenMode {
    edit = "edit",
    add = "add",
  }

  // useState
  const [newsData, setNewsData] = useState([] as INews[]);

  // useNavigate
  let navigate = useNavigate();

  const handleEditOnClick = (news: INews) => {
    navigate(`/admin/news/${news.id}`);
  };
  const handleAddOnClick = () => {
    navigate("/admin/news/add");
  };

  // useEffect
  useEffect(() => {
    fetchNewsData().then((data) => {
      if (data) {
        setNewsData(data);
      }
    });
  }, []);

  const fetchNewsData = async () => {
    const { data } = await supabase
      .from("news_tbl")
      .select()
      .order("id", { ascending: false });
    return data;
  };

  // set pagination (for the news page)
  let PageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return newsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, newsData]);

  return (
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
              <div className="delete button">Delete</div>
            </div>
          </div>
        ))}
        <div className="buttons">
          <div className="add button" onClick={() => handleAddOnClick()}>
            + Add
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateNewsList;
