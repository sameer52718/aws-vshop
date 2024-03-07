/* eslint-disable react-hooks/exhaustive-deps */
import BackButton from "../../../components/ui/BackButton";
import Fileinput from "../../../components/ui/Fileinput";
import Card from "../../../components/ui/Card";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  deleteSellerPropertyFile,
  insertSellerPropertyFiles,
  propertyFilesRoute,
  getSellerPropertyFiles
} from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { getExtension } from "../../../utils/function";

const AddFiles = () => {
  
  const { token } = useSelector((state) => state.auth);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting , setIsSubmiting] =  useState(false)
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.post(
          getSellerPropertyFiles,
          { id },
          { headers: { Authorization: token } }
        );
        if (data.error === false) {
          if (data.data.property[0].files) {
            const parsedData = JSON.parse(data.data.property[0].files);
            setImages(parsedData.filter((item) => item !== null));            
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmiting(true)
      const { data } = await axios.post(
        insertSellerPropertyFiles,
        { id, file: files },
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.error === false) {
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setIsSubmiting(false)
    }
  };

  const handleFilesChange = (e) => {
    const { files } = e.target;
    setFiles(Array.from(files));
  };

 

  const handleDelete = async (e,file) => {
    e.preventDefault();
    try {
      setImages(prev=> prev.filter(item => item !== file))
      const {data} = await axios.post(deleteSellerPropertyFile,{id,file},{headers:{Authorization:token}})
      if (data.error === false) {
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  function deleteUploadFile(e, filename){
    setFiles(prev =>  prev.filter(item => item.name !== filename));
  }


  return (
    <>
      <Card title={"Files"} headerslot={<BackButton />}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <Fileinput
                name={"images"}
                onChange={handleFilesChange}
                multiple={true}
                selectedFiles={files}
                placeholder="Choose Thumbnail For Product Video"
                label="Files"
              />

              {files.length > 0 && (
                <div className="flex flex-wrap gap-4 ">
                  {files?.map((file, index) => (
                    <div className="w-[200px] h-[200px] mt-6 relative" key={index}>
                      <button
                      type="button"
                      className="h-8 w-7 absolute bg-red-500 right-4 top-4 rounded-lg flex justify-center items-center"
                      onClick={(e) => deleteUploadFile (e ,file.name) }
                        >
                      <Icon icon={"gg:trash"} color="white" />
                      </button>
                      {file.type.includes("video") ? (
                        <ReactPlayer
                          url={URL.createObjectURL(file)}
                          width={"100%"}
                          height={"100%"}
                          loop={true}
                          playing={true}
                          playIcon={true}
                          onError={(e) => console.error(e)}
                          controls={true}
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(file)}
                          className="w-full  h-full block rounded object-contain border p-2  border-slate-200"
                          alt={""}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-4">
                {images.map((item) => (
                  <div className="w-[200px] h-[200px] mt-6 relative" key={item}>
                    <button
                      type="button"
                      className="h-8 w-7 absolute bg-red-500 right-4 top-4 rounded-lg flex justify-center items-center"
                      onClick={(e) => handleDelete (e , item) }
                    >
                      <Icon icon={"gg:trash"} color="white" />
                    </button>
                    {getExtension(item).toLowerCase() === "mp4" ? (
                      <ReactPlayer
                        url={`${propertyFilesRoute}/${item}`}
                        width={"100%"}
                        height={"100%"}
                        loop={true}
                        playing={true}
                        playIcon={true}
                        onError={(e) => console.error(e)}
                        controls={true}
                        key={item}
                      />
                    ) : (
                      <img
                        src={`${propertyFilesRoute}/${item}`}
                        className="w-full  h-full block rounded object-contain border p-2  border-slate-200"
                        alt={""}
                        key={item}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddFiles;
