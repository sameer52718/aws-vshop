/* eslint-disable react-hooks/exhaustive-deps */
import BackButton from "../../../components/ui/BackButton";
import Fileinput from "../../../components/ui/Fileinput";
import Card from "../../../components/ui/Card";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  productThumbnailRoute,
  productVideoRoute,
  resellerupdateProductVideo,
  getResellerProductVideo,
} from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";

const AddVideo = () => {
  const { token } = useSelector((state) => state.auth);
  const [video, setVideo] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [data, setData] = useState({
    video: null,
    thumbnail: null,
  });
  const { url } = useParams();

  const getData = async () => {
    try {
      const { data } = await axios.post(
        getResellerProductVideo,
        { url },
        { headers: { Authorization: token } }
      );
      if (data.error === false) {
        setData((prev) => ({
          ...prev,
          video: data.data.product[0].video,
          thumbnail: data.data.product[0].thumbnail,
        }));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        resellerupdateProductVideo,
        { url, video, thumbnail },
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.error === false) {
       toast.success(data?.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Card title={"Edit Product"} headerslot={<BackButton />}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <Fileinput
                name={"video"}
                onChange={(e) => setVideo(e.target.files[0])}
                placeholder="Choose Video For the Product"
                label="Product Video"
                accept="video/mp4,video/x-m4v,video/*"
              />
             
              {!video && data.video && (
                <div className="w-[200px] h-[200px] mx-auto mt-6">
                  <ReactPlayer
                    url={`${productVideoRoute}/${data.video}`}
                    width={"100%"}
                    height={"100%"}
                    loop={true}
                    playing={true}
                    playIcon={true}
                    onError={(e) => console.error(e)}
                    controls={true}
                  />
                </div>
              )}
              {video  && (
                <div className="w-[200px] h-[200px] mx-auto mt-6">
                  <ReactPlayer
                    url={URL.createObjectURL(video)}
                    width={"100%"}
                    height={"100%"}
                    loop={true}
                    playing={true}
                    playIcon={true}
                    onError={(e) => console.error(e)}
                    controls={true}
                  />
                </div>
              )}
            </div>
            <div className="col-span-12">
              <Fileinput
                name={"images"}
                onChange={(e) => setThumbnail(e.target.files[0])}
                selectedFile={thumbnail}
                preview={true}
                placeholder="Choose Thumbnail For Product Video"
                label="Video Thumbnail"
              />
              {!thumbnail && data.thumbnail && (
                <div className="w-[200px] h-[200px] mx-auto mt-6  ">
                  <img
                    src={`${productThumbnailRoute}/${data.thumbnail}`}
                    className="w-full  h-full block rounded object-contain border p-2  border-slate-200"
                    alt={""}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddVideo;
