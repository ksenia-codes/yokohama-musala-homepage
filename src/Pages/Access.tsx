import React, { useContext, useEffect } from "react";

// components
import { HeaderContext, HeaderContextType } from "../styles/HeaderContext";
import { PAGE_NAMES } from "../common/Const";

function Access() {
  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.access);
  }, []);

  return (
    <div className="page-container">
      <h2>Access</h2>
      <div>Here's how to access</div>
    </div>
  );
}

export default Access;
