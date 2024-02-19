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
      <div className="page-content-container">
        You can contact us using the following
        <div>
          <div>
            <h3>Phone</h3>
            <div>045-294-8816</div>
          </div>
          <div>
            <h3>Facebook</h3>
            <div>
              <a href="https://www.facebook.com/yokohamamusala/">
                https://www.facebook.com/yokohamamusala/
              </a>
            </div>
          </div>
          <div>
            <h3>Email</h3>
            <div>(yokohamamusala@gmail.com)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
