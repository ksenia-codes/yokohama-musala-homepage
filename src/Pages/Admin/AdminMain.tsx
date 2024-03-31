import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { supabase } from "../../supabase";
import { Session } from "@supabase/supabase-js";
import Login from "../Login";
import {
  HeaderContext,
  HeaderContextType,
} from "../../common/context/HeaderContext";
import { PAGE_NAMES } from "../../common/Const";

function AdminMain() {
  // useNavigate
  let navigate = useNavigate();
  const handleSectionOnClick = (path: string) => {
    navigate(`/${path}`);
  };

  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useState
  const [session, setSession] = useState<Session | null>(null);

  //useEffect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    updateActiveTab(PAGE_NAMES.admin);
  }, []);

  return session ? (
    <div className="admin-page-container">
      <div className="admin-main-section-container">
        <div
          className="admin-main-section disp-flex top"
          onClick={() => {
            handleSectionOnClick("admin/news");
          }}
        >
          <div>Add or edit news & updates</div>
          <ArrowForwardIosIcon className="next-arrow"></ArrowForwardIosIcon>
        </div>
        <div
          className="admin-main-section disp-flex"
          onClick={() => {
            handleSectionOnClick("admin/prayertimes");
          }}
        >
          <div>Edit prayer times</div>
          <ArrowForwardIosIcon className="next-arrow"></ArrowForwardIosIcon>
        </div>
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default AdminMain;
