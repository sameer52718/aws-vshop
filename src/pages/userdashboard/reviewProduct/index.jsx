import { useState } from "react";
import { Rating } from "primereact/rating";
import Textarea from "../../../components/ui/Textarea";
import Fileinput from "../../../components/ui/Fileinput";

const ReviewProduct = () => {
  const [data, setData] = useState({
    rating: 0,
    description: "",
  });
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { value, id } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files
    const filesArray = Array.from(files);
    setFiles(filesArray);
  }

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/3 bg-white p-6 rounded-md flex flex-col gap-4">
        <Rating
          id="rating"
          value={data.rating}
          onChange={handleChange}
          cancel={false}
          className="gap-1"
          size={"40px"}
          pt={{
            onIcon: { className: "w-20 h-20" },
            offIcon: { width: 50, height: 50 },
          }}
        />
        <Textarea
          label={"Review"}
          id="description"
          placeholder={"Enter Your Review About Product"}
          onChange={handleChange}
        />
        <Fileinput
          name={"images"}
          id={"images"}
          preview={true}
          selectedFiles={files}
          onChange={handleFileChange}
          multiple={true}
          accept="image/*"
          label="Browse"
        />
      </div>
    </div>
  );
};

export default ReviewProduct;
