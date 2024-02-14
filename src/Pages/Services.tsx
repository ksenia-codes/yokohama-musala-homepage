import React, { useContext, useEffect } from "react";

// components
import { HeaderContext, HeaderContextType } from "../styles/HeaderContext";
import { PAGE_NAMES } from "../common/Const";

function Services() {
  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.services);
  }, []);

  return (
    <div className="page-container">
      <h2>Our services</h2>
      <div>Here will be a list of services we can provide</div>
    </div>
  );
}

export default Services;
