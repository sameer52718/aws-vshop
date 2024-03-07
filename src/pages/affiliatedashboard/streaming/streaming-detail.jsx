import Textinput from "../../../components/ui/Textinput";
import Fileinput from "../../../components/ui/Fileinput";
import Textarea from "../../../components/ui/Textarea";
import Radio from "../../../components/ui/Radio";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MultiSelect } from "primereact/multiselect";
import { toast } from "react-toastify";
import axios from "axios";
import { createResellerStreaming } from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";

const schema = yup.object({
  category_ids: yup
    .array()
    .of(
      yup.object().shape({
        category_id: yup.number(),
        name: yup.string(),
      })
    )
    .min(1, "At least one category must be selected")
    .required("Category is required"),
  title: yup.string().required("Streaming title is required"),
  description: yup.string().required("Product description is required"),
});

// eslint-disable-next-line react/prop-types
const StreamingDetail = ({ setActive }) => {
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState(null);
  const {categories:options} = useSelector(state=> state.categories)

  

  const onSubmit = async (data) => {
    try {
      if (!thumbnail) {
        toast.error("Thumbnail is required");
        return;
      }
      if (selected === null) {
        toast.error("You Have to select Card Holding Category")
        return
      }
      const body = {
        ...data,
        category_ids: data.category_ids.map((item) => item.category_id).join(","),
        thumbnail,
        category_id:selected,
      };
      const { data: res } = await axios.post(createResellerStreaming, body, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });
      if (res.error === false) {
        setActive(res.data.code);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const category_ids = watch("category_ids");

  useEffect(() => {
    if (getValues("category_ids")) {
      setCategory(getValues("category_ids"));
    }
  }, [category_ids, getValues]);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-6">
          <label htmlFor="product-specification" className="form-label">
            Category
          </label>
          <Controller
            name="category_ids"
            control={control}
            rules={{ required: "Value is required." }}
            render={({ field }) => (
              <MultiSelect
                className="w-full h-9"
                id={field.name}
                name="category_ids"
                value={field.value}
                options={options}
                onChange={(e) => field.onChange(e.value)}
                optionLabel="name"
                placeholder="Select Categories"
                maxSelectedLabels={3}
                pt={{label:{className:"px-3 py-[0.35rem]"}}}
              />
            )}
          />
          {errors.category_ids && (
            <div className="text-danger-500 block text-sm mt-2">
              {errors.category_ids.message}
            </div>
          )}
        </div>
        <div className="col-span-12 lg:col-span-6">
          <Textinput
            name={"title"}
            type={"text"}
            register={register}
            label={"Title"}
            error={errors.title}
            placeholder="Enter Your Streaming Title"
            className="h-[48px]"
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
        {category.length > 0 && (
          <h6 className="col-span-12 my-1">Streaming Card Holding Category</h6>
        )}
        {category.map((item) => (
          <div className="col-span-3" key={item.category_id}>
            <Radio
              label={item.name}
              name={"category_selected"}
              checked={parseInt(selected) === item.category_id}
              onChange={handleChange}
              value={item.category_id}
            />
          </div>
        ))}
        <div className="col-span-12 mt-2">
          <Fileinput
            name={"thumbnail"}
            onChange={handleFileChange}
            preview={true}
            selectedFile={thumbnail}
            accept="image/*"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          Next
        </button>
      </div>
    </form>
  );
};

export default StreamingDetail;
