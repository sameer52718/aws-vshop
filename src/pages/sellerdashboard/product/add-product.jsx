import BackButton from "../../../components/ui/BackButton";
import Textinput from "../../../components/ui/Textinput";
import Textarea from "../../../components/ui/Textarea";
import Select from "../../../components/ui/Select";
import Card from "../../../components/ui/Card";

import { getSellerCategories, getSubCategories, getbrands, productInsert } from "../../../constant/apiRoutes";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { Chips } from "primereact/chips";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import axios from "axios";
import * as yup from "yup";

import "react-quill/dist/quill.snow.css";

const schema = yup.object({
  category_id: yup.string().required("Product Category is required"),
  subcategory_id: yup.string().required("Product Sub Category is required"),
  brand_id: yup.string(),
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .typeError("Price Must be a Number")
    .positive("Price Must be a Positive Number")
    .required("Product price is required"),
  color: yup.array(),
  size: yup.array(),
  keyword: yup.string().required("Product Keyworods is required"),
  description: yup.string().required("Product description is required"),
  specification: yup.string().required("Product specification is required"),
  feature: yup.string().required("Product Features is required"),
  redirect_url: yup.string().url("Must be A valid url").required("Product redirect URL is required"),
});

const AddProduct = () => {
  const { token } = useSelector((state) => state.auth);
  const [options, setOptions] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [brand, setBrand] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const category_id = watch("category_id");

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(getSellerCategories, {
          headers: { Authorization: token },
        });
        if (data.error === false) {
          setOptions(
            data.data?.category?.flat(1)?.map((item) => ({
              id: item.category_id.toString(),
              name: item.name,
            }))
          );
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, [token]);

  const onSubmit = async (data) => {
    try {
      const body = {
        ...data,
        brand_id:data?.brand ? data?.brand : "0",
        color: data?.color && data?.color?.length > 0 ? data.color : null,
        size: data?.size && data?.size?.length > 0 ? data.size : null,
      };
      const { data: res } = await axios.post(productInsert, body, {
        headers: { Authorization: token },
      });
      if (res.error === false) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  useEffect(() => {
    const getSubCategory = async (id) => {
      try {
        if (!id) {
          return;
        } else {
          const [{ data: brandRes }, { data }] = await Promise.all([
            axios.post(getbrands, { category_id: id }),
            axios.post(getSubCategories, { category_id: id }),
          ]);
          if (brandRes.error === false) {
            setBrand(brandRes.data.brand.map((item) => ({ id: item.brand_id, name: item.name })));
          }
          if (data.error === false) {
            setSubCategory(
              data.data.subcategory.map((item) => ({
                id: item.subcategory_id,
                name: item.name,
              }))
            );
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getSubCategory(category_id);
  }, [category_id]);

  return (
    <>
      <Card title={"Add Product"} headerslot={<BackButton />}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-6">
              <Select
                name={"category_id"}
                register={register}
                label={"Category"}
                error={errors.category_id}
                placeholder="Select Your Product Category"
                options={options}
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Select
                name={"subcategory_id"}
                register={register}
                label={"Sub Category"}
                error={errors.subcategory_id}
                placeholder="Select Your Product Category"
                disabled={subCategory.length === 0}
                options={subCategory}
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Select
                name={"brand_id"}
                register={register}
                label={"Brand"}
                error={errors.brand_id}
                placeholder="Select Your Product Brand(Optional)"
                disabled={brand.length === 0}
                options={brand}
              />
            </div>
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
              <label htmlFor="color" className="form-label">
                Color
              </label>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Chips
                    id={field.name}
                    name="color"
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    className="w-full"
                    pt={{ container: { className: "form-control " } }}
                  />
                )}
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <label htmlFor="color" className="form-label">
                Size
              </label>
              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <Chips
                    id={field.name}
                    name="size"
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    className="w-full"
                    pt={{ container: { className: "form-control " } }}
                  />
                )}
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Textinput
                name={"price"}
                type={"number"}
                register={register}
                label={"Price"}
                error={errors.price}
                placeholder="Enter Your Product Price"
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Textinput
                name={"keyword"}
                type={"text"}
                register={register}
                label={"Keywords (space between each keyword)"}
                error={errors.keyword}
                placeholder="Enter Your Product Keywords"
              />
            </div>
            <div className="col-span-12 ">
              <Textinput
                name={"redirect_url"}
                type={"text"}
                register={register}
                label={"Redirect URL"}
                error={errors.redirect_url}
                placeholder="Enter Your Product Redirect URL"
                description={"Example: https://example.com/product/mobile"}
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
              <label htmlFor="product-specification" className="form-label">
                Specification
              </label>
              <Controller
                name="specification"
                control={control}
                defaultValue=""
                render={({ field }) => <ReactQuill {...field} id="product-specification" theme="snow" />}
              />
              {errors.specification && (
                <div className="text-danger-500 block text-sm mt-2">{errors.specification.message}</div>
              )}
            </div>
            <div className="col-span-12">
              <label htmlFor="product-feature" className="form-label">
                Feature
              </label>
              <Controller
                name="feature"
                control={control}
                defaultValue=""
                render={({ field }) => <ReactQuill {...field} id="product-feature" theme="snow" />}
              />
              {errors.feature && (
                <div className="text-danger-500 block text-sm mt-2">{errors.feature.message}</div>
              )}
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
export default AddProduct;
