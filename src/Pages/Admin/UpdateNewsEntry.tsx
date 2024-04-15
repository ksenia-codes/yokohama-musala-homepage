import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { Input } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, deleteObject } from "firebase/storage";

import { auth, db, storage } from "../../firebase/firebase";
import Login from "../Login";
import { INews } from "../../common/Interfaces";
import {
  HeaderContext,
  HeaderContextType,
} from "../../common/context/HeaderContext";
import { PAGE_NAMES } from "../../common/Const";

enum ScreenMode {
  edit = "edit",
  add = "add",
}

type Props = {
  mode: ScreenMode;
};

function UpdateNewsEntry({ mode }: Props) {
  const [user] = useAuthState(auth);

  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useState
  const [newsData, setNewsData] = useState({} as INews);
  const [filesToUpload, setFilesToUpload] = useState<FileList>();
  const [filesToDelete, setFilesToDelete] = useState([] as string[]);

  // useParams
  const { id } = useParams();

  async function fetchNewsData() {
    const docRef = doc(db, "news_tbl", String(id));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setNewsData(docSnap.data() as INews);
    }
  }
  const createNewsObject = () => {
    let data: INews = {
      id: "",
      title: "",
      date: String(dayjs(new Date())),
      content: "",
      img: [] as string[],
      visible: true,
      createdAt: "",
    };
    setNewsData(data);
  };

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.admin);

    if (mode === ScreenMode.edit) {
      fetchNewsData();
    } else {
      createNewsObject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handlers
  /* input handlers */
  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsData({ ...newsData, title: e.target.value });
  };
  const onPublishDateChanged = (newValue: string) => {
    setNewsData({
      ...newsData,
      date: new Date(newValue).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
  };

  const onContentsChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewsData({ ...newsData, content: e.target.value });
  };

  const onVisibleChanged = () => {
    setNewsData({ ...newsData, visible: !newsData.visible });
  };

  const onDeleteImageClick = (imgToDel: string) => {
    const res = window.confirm(
      "Do you want to remove this file? It will be deleted permanently on save."
    );
    if (res) {
      // add to the useState of files to delete array
      setFilesToDelete([...filesToDelete, imgToDel]);
      // remove from newsData useState's images array
      setNewsData({
        ...newsData,
        img: newsData.img.filter((img) => img !== imgToDel),
      });
    }
  };

  const onFileSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFilesToUpload(files);
    }
  };

  /* bottom buttons */
  const onSaveClick = async () => {
    let newImages2 = newsData.img;
    let err = "";
    const currentTimeStamp = dayjs().format("YYYYMMDDHHmmss");

    // if there are filesToUpload, upload to storage first
    filesToUpload &&
      Array.from(filesToUpload as ArrayLike<File>).forEach((file) => {
        if (err) return;
        const folder = id ? id : currentTimeStamp;
        // first create a red to the file
        const newImageRef = ref(storage, `news_images/${folder}/${file.name}`);
        // upload
        uploadBytes(newImageRef, file).then((snapshot) => {
          console.log(snapshot);
        });
        newImages2 = [...newImages2, file.name];
      });

    // update/insert the newsData
    const dataForDb = { ...newsData, img: newImages2 };

    try {
      if (mode === ScreenMode.add) {
        // insert
        await setDoc(doc(db, "news_tbl", currentTimeStamp), {
          ...dataForDb,
          createdAt: currentTimeStamp,
        });
      } else {
        // update
        await setDoc(doc(db, "news_tbl", String(id)), dataForDb);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    // remove filesToDelete from newsData.img *(if there are any)
    filesToDelete.forEach((fileName) => {
      if (err) return;
      // create a ref to the file to delete
      const delFileRef = ref(storage, `news_images/${fileName}`);
      // delete the file
      deleteObject(delFileRef)
        .then(() => {
          // success
        })
        .catch((error) => {
          // uh-oh
          console.log(error);
          err = error;
        });
    });

    if (!err) {
      navigate("/admin/news");
    }
  };

  // useNavigate()
  const navigate = useNavigate();

  const onCancelClick = () => {
    // go back to the list without saving to supabase
    navigate("/admin/news");
  };

  return user ? (
    <div className="admin-page-container">
      <div className="admin-page-content upd-news-entry">
        {mode === ScreenMode.edit ? (
          <h2>Edit news entry</h2>
        ) : (
          <h2>Create a news entry</h2>
        )}
        <div className="upd-entry-section">
          <h4 className="section-title">Title</h4>
          <input
            className="section-input"
            type="text"
            value={newsData.title}
            onChange={onTitleChanged}
            required
          />
        </div>
        <div className="upd-entry-section">
          <h4 className="section-title">Publishing date</h4>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(newsData.date)}
              onChange={(newValue) =>
                onPublishDateChanged(String(dayjs(newValue)))
              }
            />
          </LocalizationProvider>
        </div>
        <div className="upd-entry-section">
          <h4 className="section-title">Contents</h4>
          <textarea
            className="section-input"
            name="contents"
            id="newsconents"
            value={newsData.content}
            cols={30}
            rows={10}
            onChange={onContentsChanged}
          ></textarea>
        </div>
        <div className="upd-entry-section">
          <h4 className="section-title">Images</h4>
          <div className="disp-flex images" style={{ flexDirection: "column" }}>
            <div className="">
              Uploaded files: {newsData.img ? newsData.img.length : 0} files
            </div>
            {newsData.img &&
              newsData.img.map((img) => (
                <div
                  className="disp-flex"
                  style={{
                    width: "70%",
                    textOverflow: "ellipsis",
                  }}
                  key={img}
                >
                  <div>{img}</div>
                  <div
                    className="hover-cursor del"
                    style={{ margin: "0 5px", background: "grey" }}
                    onClick={() => onDeleteImageClick(img)}
                  >
                    delete
                  </div>
                </div>
              ))}
            <Button
              component="label"
              role={undefined}
              variant="contained"
              sx={{ backgroundColor: "white" }}
              tabIndex={-1}
            >
              <Input
                type="file"
                inputProps={{ multiple: true, accept: "image/*" }}
                onChange={onFileSelectChange}
              />
            </Button>
          </div>
        </div>
        <div className="upd-entry-section">
          <h4 className="section-title">Visible</h4>
          <input
            className="section-input checkbox"
            type="checkbox"
            name="visible-flg"
            checked={newsData.visible}
            onChange={onVisibleChanged}
            id="visible-flg"
          />
        </div>
        <div className="disp-flex buttons">
          <div className="button save" onClick={onSaveClick}>
            Save
          </div>
          <div className="button cancel" onClick={onCancelClick}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default UpdateNewsEntry;
