import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

import { db, storage } from "../firebase/firebase";
import {
  HeaderContext,
  HeaderContextType,
} from "../common/context/HeaderContext";
import NewsComponent from "../Components/NewsComponent";
import { INews } from "../common/Interfaces";
import { PAGE_NAMES } from "../common/Const";

function News() {
  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useState
  const [newsData, setNewsData] = useState({} as INews);
  const [imagePaths, setImagePaths] = useState([] as string[]);

  // react route
  const { id } = useParams();

  async function fetchNewsData() {
    const docRef = doc(db, "news_tbl", String(id));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data() as INews;
      if (docData.visible === true) {
        setNewsData(docData);

        setImagePaths([]);
        fetchImages(docData.img);
      }
    }
  }

  function fetchImages(images: string[]) {
    let imagesArr = [] as string[];
    images.forEach((image) => {
      const imageRef = ref(storage, `news_images/${id}/${image}`);
      getDownloadURL(imageRef)
        .then((url) => {
          imagesArr = [...imagesArr, url];
          setImagePaths(imagesArr);
        })
        .catch((error) => {
          console.log("Error fetching image: ", error);
        });
    });
  }

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.news);

    if (id) {
      fetchNewsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // fetch and show the news entry, if there is URL parameter id
  if (id) {
    return newsData ? (
      <div className="page-container news">
        <h2>{newsData.title}</h2>
        <div className="news-entry-date">
          {new Date(newsData.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="news-entry-content">
          {newsData.content}
          {imagePaths &&
            imagePaths.map((image) => (
              <img
                className="news-entry-image"
                src={image}
                alt=""
                key={`${id}/${image}`}
              />
            ))}
        </div>
      </div>
    ) : (
      <div className="news-container">The news entry does not exist</div>
    );
  } else {
    return (
      <NewsComponent
        containerClassName="page"
        className="news-list"
        pageName={PAGE_NAMES.news}
      />
    );
  }
}

export default News;
