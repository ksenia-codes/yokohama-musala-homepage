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
      <div className="page-content-container">
        Here will be a list of services we can provide
        <div>
          <iframe
            src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fyokohamamusala%2Fvideos%2F1822095148304775%2F&show_text=false&width=560&t=0"
            width="560"
            height="314"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Services;
