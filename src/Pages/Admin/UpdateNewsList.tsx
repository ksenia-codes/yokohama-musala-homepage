import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../supabase";
import { Session } from "@supabase/supabase-js";
import Login from "../Login";
import { INews } from "../../common/Interfaces";
import { PaginationComponent } from "../../Components/PaginationComponent";
import {
  HeaderContext,
  HeaderContextType,
} from "../../common/context/HeaderContext";
import { PAGE_NAMES } from "../../common/Const";

function UpdateNewsList() {
  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useNavigate
  let navigate = useNavigate();

  // useState
  const [session, setSession] = useState<Session | null>(null);
  const [newsData, setNewsData] = useState([] as INews[]);

  const handleEditOnClick = (news: INews) => {
    navigate(`/admin/news/${news.id}`);
  };

  const handleAddOnClick = () => {
    navigate("/admin/news/add");
  };

  const handleDeleteOnClick = (id: number) => {
    if (
      window.confirm(
        "The news entry will be deleted permanently.\nAre you sure, you want to delete it?"
      )
    ) {
      // remove from db
      deleteEntry(id).then((deleted) => {
        if (deleted) {
          setNewsData(newsData.filter((data) => data.id !== id));
        }
      });
    }
  };
  const deleteEntry = async (id: number) => {
    const { error } = await supabase.from("news_tbl").delete().eq("id", id);
    if (error?.message) {
      console.log(error.message);
      return false;
    }
    return true;
  };

  // useEffect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    updateActiveTab(PAGE_NAMES.admin);

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
      .order("date", { ascending: false });
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

  return session ? (
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
