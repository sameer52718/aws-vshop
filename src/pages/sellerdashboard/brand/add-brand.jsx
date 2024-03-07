import BackButton from "../../../components/ui/BackButton";
import Textinput from "../../../components/ui/Textinput";
import Textarea from "../../../components/ui/Textarea";
import Card from "../../../components/ui/Card";
import Fileinput from "../../../components/ui/Fileinput";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import * as yup from "yup";
import { brandInsert as brandApi } from "../../../constant/apiRoutes";
import { MultiSelect } from "primereact/multiselect";
const schema = yup.object({
  name: yup.string().required("Brand name is required"),
  description: yup.string().required("Brand description is required"),
  category: yup.mixed().required("Brand category is required"),
});

const AddBrand = () => {
  const { token } = useSelector((state) => state.auth);
  const [file, setFile] = useState([]);
  const { categories } = useSelector((state) => state.categories);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });

  
  const onSubmit = async (data) => {
    try {
      if (file.length === 0) {
        toast.error("Please Select Files");
        return;
      }
      
      const fd = {
        name:data.name,
        description:data.description,
        category_ids:data.category.map((item) => item.category_id).join(","),
        file
      }
      
      const { data: res } = await axios.post(brandApi, fd, { headers: { Authorization: token,"Content-Type": "multipart/form-data" } });
      if (res.error === false) {
        toast.success(res.message);
        reset();
        
      }else{
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleinputChange = (e) => {
    if (e.target.files.length > 3) {
      toast.error("Please Select Max 3 Files");
    } else {
      setFile(Array.from(e.target.files));
    }
  };

  return (
    <>
      <Card title={"Add Brand"} headerslot={<BackButton />}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-6">
              <Textinput
                name={"name"}
                type={"text"}
                register={register}
                label={"Name"}
                error={errors.name}
                placeholder="Enter Your Product Name"
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Value is required." }}
                render={({ field }) => (
                  <MultiSelect
                    id={field.name}
                    name="category"
                    value={field.value}
                    options={categories}
                    onChange={(e) => field.onChange(e.value)}
                    optionLabel="name"
                    placeholder="Select Category"
                    className="w-full"
                    display="chip"
                    pt={{
                      label: { className: "px-3 py-2 text-sm" },
                      token: { className: "text-[12px] px-3 py-1" },
                    }}
                  />
                )}
              />
            </div>
            <div className="col-span-12 ">
              <Textarea
                name={"description"}
                register={register}
                label={"Description"}
                error={errors.description}
                placeholder="Enter Your Product Description"
              />
            </div>
            <div className="col-span-12">
              <Fileinput
                placeholder="Please provide Brand logo source files max three"
                multiple
                onChange={handleinputChange}
                selectedFiles={file}
                // preview={true}
              />
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
export default AddBrand;
