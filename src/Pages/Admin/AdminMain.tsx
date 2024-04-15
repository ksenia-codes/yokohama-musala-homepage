/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase/firebase";
import Login from "../Login";
import {
  HeaderContext,
  HeaderContextType,
} from "../../common/context/HeaderContext";
import { PAGE_NAMES } from "../../common/Const";

function AdminMain() {
  const [user] = useAuthState(auth);

  // useNavigate
  let navigate = useNavigate();
  const handleSectionOnClick = (path: string) => {
    navigate(`/${path}`);
  };

  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  //useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.admin);
  }, []);

  return user ? (
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
