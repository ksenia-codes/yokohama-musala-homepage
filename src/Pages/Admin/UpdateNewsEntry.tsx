import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { Input } from "@mui/material";

import { supabase } from "../../supabase";
import { INews, INewsImages } from "../../common/Interfaces";

enum ScreenMode {
  edit = "edit",
  add = "add",
}

type Props = {
  mode: ScreenMode;
};

function UpdateNewsEntry({ mode }: Props) {
  // useState
  const [newsData, setNewsData] = useState({} as INews);
  const [filesToUpload, setFilesToUpload] = useState<FileList>();
  const [filesToDelete, setFilesToDelete] = useState([] as string[]);

  // useParams
  const { id } = useParams();

  async function fetchNewsData() {
    const { data } = await supabase
      .from("news_tbl")
      .select()
      .filter("id", "eq", id);
    if (data !== null) {
      setNewsData(data[0]);
    }
  }
  const createNewsObject = () => {
    let data: INews = {
      title: "",
      date: String(dayjs(new Date())),
      content: "",
      img: [] as INewsImages[],
      visible: true,
    };
    setNewsData(data);
  };

  // useEffect
  useEffect(() => {
    // updateActiveTab(PAGE_NAMES.news);

    if (mode === ScreenMode.edit) {
      fetchNewsData();
    } else {
      createNewsObject();
    }
  }, []);

  // handlers
  /* input handlers */
  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsData({ ...newsData, title: e.target.value });
  };
  const onPublishDateChanged = (newValue: string) => {
    setNewsData({ ...newsData, date: newValue });
  };

  const onContentsChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewsData({ ...newsData, content: e.target.value });
  };

  const onVisibleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsData({ ...newsData, visible: !newsData.visible });
  };

  const onDeleteImageClick = (imgToDel: INewsImages) => {
    const res = window.confirm(
      "Do you want to remove this file? It will be deleted permanently on save."
    );
    if (res) {
      // add to the useState of files to delete array
      setFilesToDelete([...filesToDelete, imgToDel.imgName]);
      // remove from newsData useState's images array
      setNewsData({
        ...newsData,
        img: newsData.img.filter((img) => img.imgName !== imgToDel.imgName),
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
  let newImages: INewsImages[];
  const onSaveClick = () => {
    newImages = newsData.img;
    let err = "";
    // if there are filesToUpload, upload to storage first
    // get their publicURLs
    filesToUpload &&
      Array.from(filesToUpload as ArrayLike<File>).forEach((file) => {
        if (err) return;

        uploadFile(file).then(({ data, error }) => {
          if (error) {
            console.log(error.message);
            err = error.message;
            return;
          }
          if (!data) return;
          // getPubliURL
          getPublicUrl(file);
        });
      });

    // update/insert the newsData
    setTimeout(() => {
      const dataForDb = { ...newsData, img: newImages };
      console.log(dataForDb, "before db");

      if (mode === ScreenMode.add) {
        // insert
        insertData(dataForDb).then((error) => {
          if (error) {
            console.log(error.message);
            err = error.message;
            return;
          }
        });
      } else {
        // update
        updateData(dataForDb).then((error) => {
          if (error) {
            console.log(error.message);
            err = error.message;
            return;
          }
        });
      }
    }, 2000);

    // remove filesToDelete from newsData.img *(if there are any)
    filesToDelete.length > 0 &&
      deleteFiles().then(({ data, error }) => {
        if (error) {
          console.log(error.message);
          err = error.message;
          return;
        }
      });

    if (!err) {
      navigate("/admin/news");
    }
  };

  const uploadFile = async (file: File) => {
    const { data, error } = await supabase.storage
      .from("news_images")
      .upload(file.name, file);

    return { data, error };
  };

  const getPublicUrl = async (file: File) => {
    const publicUrl = supabase.storage
      .from("news_images")
      .getPublicUrl(file.name).data.publicUrl;
    // add to array of INewsImage objects
    console.log(newImages, 1);
    newImages
      ? newImages.push({ imgName: file.name, imgPath: publicUrl })
      : (newImages = [{ imgName: file.name, imgPath: publicUrl }]);
    console.log(newImages, 2);
  };

  const deleteFiles = async () => {
    const { data, error } = await supabase.storage
      .from("news_images")
      .remove(filesToDelete);

    return { data, error };
  };

  const addFiles = async () => {
    console.log(newImages);
    setNewsData({ ...newsData, img: newsData.img.concat(newImages) });
    console.log(newsData);
  };

  const insertData = async (data: INews) => {
    const { error } = await supabase.from("news_tbl").insert(data);

    return error;
  };

  const updateData = async (data: INews) => {
    const { error } = await supabase
      .from("news_tbl")
      .update(data)
      .eq("id", data.id);

    return error;
  };

  // useNavigate()
  const navigate = useNavigate();

  const onCancelClick = () => {
    // go back to the list without saving to supabase
    navigate("/admin/news");
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-content upd-news-entry">
        {mode === ScreenMode.edit ? (
          <h2>Edit news entry</h2>
        ) : (
          <h2>Create a new news entry</h2>
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
              onChange={(newValue) => onPublishDateChanged(String(newValue))}
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
            <div className="">Uploaded files</div>
            {newsData.img &&
              newsData.img.map((img) => (
                <div
                  className="disp-flex"
                  style={{
                    width: "70%",
                    textOverflow: "ellipsis",
                    backgroundColor: "yellow",
                  }}
                  key={img.imgName}
                >
                  <div>{img.imgName}</div>
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
              tabIndex={-1}
              // startIcon={<CloudUploadIcon />}
            >
              <Input
                type="file"
                inputProps={{ multiple: true, accept: "image/*" }}
                // style={{ display: "none" }}
                onChange={onFileSelectChange}
              />
            </Button>
          </div>
        </div>
        <div className="upd-entry-section">
          <h4 className="section-title">Visible</h4>
          <input
            className="section-input"
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
  );
}

export default UpdateNewsEntry;
