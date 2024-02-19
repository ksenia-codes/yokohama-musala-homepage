import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";

function FooterComponent() {
  return (
    <footer>
      <a
        href="https://www.facebook.com/yokohamamusala/"
        className="footer-fb-icon disp-flex"
      >
        <FacebookIcon></FacebookIcon>
      </a>
      <div className="footer-copyright">
        ©{new Date().getFullYear()} Yokohama Musala
      </div>
    </footer>
  );
}

export default FooterComponent;
