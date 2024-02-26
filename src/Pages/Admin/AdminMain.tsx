import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function AdminMain() {
  // useNavigate
  let navigate = useNavigate();
  const handleSectionOnClick = (path: string) => {
    navigate(`/${path}`);
  };

  return (
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
  );
}

export default AdminMain;
