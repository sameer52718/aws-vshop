import Select from "../../../components/ui/Select";
import Textinput from "../../../components/ui/Textinput";
import Button from "../../../components/ui/Button";
import Textarea from "../../../components/ui/Textarea";
import Fileinput from "../../../components/ui/Fileinput";

import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { getSubCategories, insertHireForm } from "../../../constant/apiRoutes";
import { useEffect, useState } from "react";
import { StockFrequencyOptions } from "../../../constant/data";
import { userDashboardRoutes } from "../../../constant/routes";

const personalSchema = yup.object({
  first_name: yup.string().required("First Name is Requied"),
  last_name: yup.string().required("Last Name is Requied"),
  email: yup.string().email().required("Email is Required"),
  phone: yup
    .number()
    .typeError("Phone Number Should be Number")
    .positive("Phone Number Should Be Positive")
    .required("Phone Number is Required"),
});

const productSchema = yup.object({
  category_id: yup.string().required("Category is Required"),
  subcategory_id: yup.string().required("Sub Category is Required"),
  price: yup
    .number()
    .typeError("Price Should be Number")
    .positive("Price Should Be Positive")
    .required("Price is Required"),
  stock_frequency: yup.string().required("Stock Frequency is Required"),
  stock: yup
    .number()
    .typeError("Stock Should be Number")
    .positive("Stock Should Be Positive")
    .required("Stock is Required"),
  description: yup.string().required("Description is Required"),
});

const ResellerHireForm = () => {
  const navigate = useNavigate();
  const {url} = useParams()
  const [images, setImages] = useState([]);
  const [step, setStep] = useState(1);
  const [subcategory, setSubCategory] = useState([]);
  const { options } = useSelector((state) => state.categories);
  const {
    user: { first_name, last_name, email, phone },token
  } = useSelector((state) => state.auth);
  let currentStepSchema;
  switch (step) {
    case 1:
      currentStepSchema = personalSchema;
      break;
    case 2:
      currentStepSchema = productSchema;
      break;
    case 3:
      currentStepSchema = productSchema;
      break;
    default:
      break;
  }

  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({ resolver: yupResolver(currentStepSchema), mode: "all" });

  useEffect(() => {
    if (step === 1) {
      reset({first_name, last_name, email, phone});
    }
  }, [email, first_name, last_name, phone, reset, step]);

  const category_id = watch("category_id");

  const onSubmit = async (data) => {
    try {
      let totalSteps = 3;
      const isLastStep = step === totalSteps;
      if (isLastStep) {
        if (images.length === 0) {
          toast.error("Product images Are Required");
          return;
        }
        const { data: res } = await axios.post(
          insertHireForm,
          { ...data, images , url },
          { headers: {Authorization:token, "Content-Type": "multipart/form-data" } }
        );
        if (res.error === false) {
          toast.success(res.message);
          navigate(`${userDashboardRoutes.dashboard}/${userDashboardRoutes.home}`);
        } else if (res.error === true) {
          toast.error(res.message);
        }
      } else {
        setStep((prev) => prev + 1);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const getSubCategory = async (id) => {
    try {
      if (!id) {
        return;
      } else {
        const { data } = await axios.post(getSubCategories, {
          category_id: id,
        });
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
  useEffect(() => {
    getSubCategory(category_id);
  }, [category_id]);

  const handleInputChange = (e) => {
    const { files } = e.target;
    setImages(Array.from(files));
  };

  return (
    <div className="container my-12">
      <div className="flex w-full justify-center">
        <div className="w-[80%] md:w-[60%] lg:w-[40%]">
          <ol className="flex items-center w-full justify-center">
            <li className="flex w-full items-center text-white dark:text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-main after:border-4 after:inline-block dark:after:border-main">
              <span className="text-lg font-bold  flex items-center justify-center w-10 h-10 bg-main rounded-full md:h-16 md:w-16 dark:bg-main shrink-0">
                01
              </span>
            </li>
            <li
              className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block dark:after:border-gray-700 ${
                step > 1 ? "after:border-main" : "after:border-white"
              }`}
            >
              <span
                className={`text-lg font-bold flex items-center justify-center w-10 h-10  rounded-full md:h-16 md:w-16 dark:bg-gray-700 shrink-0 ${
                  step > 1 ? "bg-main text-white" : "bg-white"
                } `}
              >
                02
              </span>
            </li>
            <li className="flex items-center  ">
              <span
                className={`text-lg font-bold flex items-center justify-center w-10 h-10  rounded-full md:h-16 md:w-16 dark:bg-gray-700 shrink-0 ${
                  step > 2 ? " bg-main text-white" : "bg-white"
                }`}
              >
                03
              </span>
            </li>
          </ol>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="lg:w-[65%] w-full bg-white flex flex-col justify-center sm:p-10 p-2 md:p-5 border border-[#E0E0E0]">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                  {step === 1 && "Personal"}
                  {step === 2 && "Product"}
                  {step === 3 && "Images"}
                </h1>
                <div className="shape -mt-6">
                  <svg
                    width="172"
                    height="29"
                    viewBox="0 0 172 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                      stroke="#FCBF49"
                    />
                  </svg>
                </div>
              </div>
              {step === 1 && (
                <div className="input-area" data-aos="fade-up">
                  <div className="md:flex gap-2">
                    <div className="input-item mb-5 flex-1">
                      <Textinput
                        placeholder="Enter Your First Name"
                        label="First Name"
                        type="text"
                        name={"first_name"}
                        register={register}
                        error={errors.first_name}
                      />
                    </div>
                    <div className="input-item mb-5 flex-1">
                      <Textinput
                        placeholder="Enter Your Last Name"
                        label="Last Name"
                        type="text"
                        name={"last_name"}
                        register={register}
                        error={errors.last_name}
                      />
                    </div>
                  </div>
                  <div className="md:flex gap-2">
                    <div className="input-item mb-5 flex-1">
                      <Textinput
                        placeholder="Enter Your Email"
                        label="Email"
                        type="text"
                        name={"email"}
                        register={register}
                        error={errors.email}
                      />
                    </div>
                    <div className="input-item mb-5 flex-1">
                      <Textinput
                        placeholder="Enter Your Phone (Optional)"
                        label="Phone #"
                        type="number"
                        name={"phone"}
                        register={register}
                        error={errors.phone}
                      />
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="input-area" data-aos="fade-up">
                  <div className="md:flex gap-2">
                    <div className="mb-5 flex-1">
                      <Select
                        label="Category"
                        name={"category_id"}
                        register={register}
                        error={errors.category_id}
                        options={options}
                        placeholder="Select Category"
                      />
                    </div>
                    <div className="mb-5 flex-1">
                      <Select
                        label="Sub Category"
                        name={"subcategory_id"}
                        register={register}
                        placeholder="Select Sub Category"
                        error={errors.subcategory_id}
                        options={subcategory}
                        disabled={subcategory.length === 0}
                      />
                    </div>
                  </div>
                  <div className="md:flex gap-2">
                    <div className="flex-1 mb-5">
                      <Textinput
                        placeholder="Enter Product Price"
                        label="Price"
                        type="text"
                        name={"price"}
                        register={register}
                        error={errors.price}
                      />
                    </div>
                    <div className="flex-1 mb-5">
                      <Select
                        label="Stock Frequency"
                        name={"stock_frequency"}
                        register={register}
                        error={errors.stock_frequency}
                        options={StockFrequencyOptions}
                        placeholder="Select Product Stock Frequency"
                      />
                    </div>
                    <div className="flex-1 mb-5">
                      <Textinput
                        placeholder="Enter Product Stock"
                        label="Stock"
                        type="text"
                        name={"stock"}
                        register={register}
                        error={errors.stock}
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <Textarea
                      placeholder="Enter Product Description"
                      label="Description"
                      type="text"
                      name={"description"}
                      register={register}
                      error={errors.description}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="input-area" data-aos="fade-up">
                  <div className="flex  flex-col items-center gap-4 mb-5">
                    <Fileinput
                      name={"cnicfront"}
                      placeholder="Select Images of Products..."
                      label="Product Images"
                      onChange={handleInputChange}
                      preview
                      className="w-full"
                      selectedFiles={images}
                      multiple
                    />
                  </div>
                </div>
              )}
              <div className="mb-3.5">
                <div className="flex gap-5 justify-end">
                  {step !== 0 && (
                    <Button text="prev" className="btn-primary" onClick={handlePrev} disabled={step === 1} />
                  )}
                  <Button
                    text={step !== 3 ? "next" : "submit"}
                    className="btn-primary"
                    type="submit"
                    disabled={step === 3 ? isSubmitting : !isValid}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResellerHireForm;
