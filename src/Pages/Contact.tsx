import React, { useContext, useEffect } from "react";

// components
import { HeaderContext, HeaderContextType } from "../styles/HeaderContext";
import { PAGE_NAMES } from "../common/Const";

function Contact() {
  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.contact);
  }, []);

  return (
    <div className="page-container">
      <h2>Contact us</h2>
      <div>You can contact us using the following</div>
    </div>
  );
}

export default Contact;
