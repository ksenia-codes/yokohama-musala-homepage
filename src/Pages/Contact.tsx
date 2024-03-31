import React, { useContext, useEffect } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";

// components
import {
  HeaderContext,
  HeaderContextType,
} from "../common/context/HeaderContext";
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
          <div className="contact-section">
            <div className="disp-flex contact-title">
              <PhoneIcon />
              <h3>Phone</h3>
            </div>
            <div>045-294-8816</div>
          </div>
          <div className="contact-section">
            <div className="disp-flex contact-title">
              <FacebookIcon />
              <h3>Facebook</h3>
            </div>
            <div>
              <a href="https://www.facebook.com/yokohamamusala/">
                https://www.facebook.com/yokohamamusala/
              </a>
            </div>
          </div>
          <div className="contact-section">
            <div className="disp-flex contact-title">
              <EmailIcon />
              <h3>Email</h3>
            </div>
            <div>yokohamamusala@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
