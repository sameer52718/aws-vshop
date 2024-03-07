/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import BackButton from "@/components/ui/BackButton";
import Textinput from "@/components/ui/Textinput";
import Card from "@/components/ui/Card";
import Select from "../../../components/ui/Select"

import { productThumbnailRoute,getResellerProducts, resellerInsertProductInventory,getProductDetails  } from "@/constant/apiRoutes";
import DashboardLoader from "../../../components/DashboardLoader";
import NoThumbnail from "../../../assets/images/vectors/thumbnail.png";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";


const schema = yup.object({
  color: yup.string(),
  size: yup.string(),
  stock: yup
    .number()
    .typeError("Stoke should ba a number")
    .required("Stock is Required"),
});

const AddInventory = () => {
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [color,setColor] = useState([])
  const [size, setSize] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productError, setProductError] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(getResellerProducts, {
        headers: { Authorization: token },
      });
      if (data.error === false) {
        setOptions(
          data?.data?.product?.map((item) => ({
            name: item.name,
            url: item.url,
            thumbnail: item.thumbnail,
          }))
        );
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (selectedProduct === null) {
        setProductError("Please Select The Product");
        return;
      }
      const { data: res } = await axios.post(
        resellerInsertProductInventory,
        { ...data, url:selectedProduct.url },
        { headers: { Authorization: token } }
      );
      if (res.error === false) {
        toast.success(res.message);
        reset();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getProduct = async (product) => {
      try {
        setColor([])
        setSize([])
        const body = {
          url:product?.url,
          select: [
            "product.color",
            "product.size",
          ],
        };
        const {data} = await axios.post(getProductDetails,body)
        if (data.error=== false) {
          const {color,size} = data.data.product.at(0)
          setColor(Array.isArray(JSON.parse(color)) ?  JSON.parse(color) : []);
          setSize(Array.isArray(JSON.parse(size))? JSON.parse(size) :[])
        } 
      } catch (error) {
        toast.error(error.message);
      }
    }
    if (selectedProduct) {
      getProduct(selectedProduct)
    }
  },[selectedProduct])

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <img
            alt={option.name}
            src={
              option.thumbnail
                ? `${productThumbnailRoute}/${option.thumbnail}`
                : NoThumbnail
            }
            className={`mr-2 `}
            style={{ width: "18px" }}
          />
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src={
            option.thumbnail
              ? `${productThumbnailRoute}/${option.thumbnail}`
              : NoThumbnail
          }
          className={`mr-2 `}
          style={{ width: "18px" }}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <DashboardLoader />
      ) : (
        <Card title="Add Inventory" headerslot={<BackButton />}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-6">
                <label htmlFor="" className="form-label">
                  Product
                </label>
                <Dropdown
                  value={selectedProduct}
                  onChange={(e) => {
                    setSelectedProduct(e.value);
                    setProductError(null);
                  }}
                  options={options}
                  optionLabel="name"
                  placeholder="Select a Product"
                  filter
                  valueTemplate={selectedCountryTemplate}
                  itemTemplate={countryOptionTemplate}
                  className="w-full"
                />
                <div className={`mt-2 text-danger-500 block text-sm`}>
                  {productError}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6">
              <Select
                  label={"Color"}
                  name={"color"}
                  register={register}
                  error={errors.color}
                  placeholder="Enter the Stock of Product"
                  options={color}
                  disabled={color.length === 0}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
              <Select
                  label={"Size"}
                  name={"size"}
                  register={register}
                  error={errors.size}
                  placeholder="Enter the Stock of Product"
                  options={size}
                  disabled={size.length ===0}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Textinput
                  label={"Stock"}
                  name={"stock"}
                  register={register}
                  error={errors.stock}
                  placeholder="Enter the Stock of Product"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Add
              </button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default AddInventory;
