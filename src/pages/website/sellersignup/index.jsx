import { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Fileinput from "@/components/ui/Fileinput";

import CNICFront from "@/assets/images/cnic/front.png";
import CNICBack from "@/assets/images/cnic/back.png";

import { sellerRegister } from "@/constant/apiRoutes";
import { websiteRoutes } from "@/constant/routes";

import { setAuth } from "@/store/auth/store";
import { fetchState } from "@/store/state/slice";
import { fetchCity } from "@/store/city/slice";

import { useDispatch ,useSelector} from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import * as yup from "yup";
import Step from "../../../components/ui/Step/Step";

const personalSchema = yup.object({
  first_name: yup.string().required("First Name is Requied"),
  last_name: yup.string().required("Last Name is Requied"),
  email: yup.string().email().required("Email is Required"),
  phone: yup
    .number()
    .typeError("Phone Number Should be Number")
    .positive("Phone Number Should Be Positive")
    .required("Phone Number is Required"),
  country_id: yup.string().required("Country Is Required"),
  state_id: yup.string().required("State Is Required"),
  city_id: yup.string().required("City Is Required"),
  address: yup.string().required("Address Is Required"),
  nic: yup
    .number()
    .typeError("Nic Number Should be Number")
    .positive("Nic Should Be Positive")
    .required("Nic Number is Required"),
  // .test("len", "Must be exactly 13 Numbers without dashes (-)", (val) => val.length === 13)
  password: yup.string().required("Password is Required"),
  // .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
  // .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
  // .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
  // .matches(/^(?=.*[!@#$%^&*])/, "  Must Contain  One Special Case Character")
  // .test("len", "Must be greater than 8 Characters", (val) => val.length >= 8)
  cpassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});

const bankSchema = yup.object({
  bank_id: yup.string().required("Bank is Required"),
  iban: yup
    .string()
    .required("IBAN is Required"),
    // .test("len", "Must be exactly 24 Characters", (val) => val.length === 24),
  title: yup.string().required("Account Title is Required"),
});

const shopSchema = yup.object({
  shop_name: yup.string().required("Shop Name is Required"),
  shop_email: yup.string().email().required("Shop Email is Required"),
  shop_phone: yup.number().typeError("Shop Phone Shouid be Number ").required("Shop Phone is Required"),
  shop_address: yup.string(),
  ntn: yup.number().typeError("NTN Should be a Number"),
  stn: yup.number().typeError("STN Should be a Number"),
});

const bank = [{ name: "Meezan", id: 1 }];

const VendorSignup = () => {
  const {options} = useSelector(state => state.country)
  const {options:state} = useSelector(state => state.state)
  const {options:city} = useSelector(state => state.city)
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);

  let currentStepSchema;
  switch (step) {
    case 1:
      currentStepSchema = personalSchema;
      break;
    case 2:
      currentStepSchema = bankSchema;
      break;
    case 3:
      currentStepSchema = shopSchema;
      break;
    case 4:
      currentStepSchema = shopSchema;
      break;
    default:
      break;
  }
  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
  } = useForm({ resolver: yupResolver(currentStepSchema), mode: "onSubmit" });
  const onSubmit = async (data) => {
    try {
      let totalSteps = 4;
      const isLastStep = step === totalSteps;
      if (isLastStep) {
        if (!cnicFront) {
          toast.error("CNIC Front is Required");
          return;
        }

        if (!cnicBack) {
          toast.error("CNIC Back is Required");
          return;
        }

        const { data: res } = await axios.post(
          sellerRegister,
          { ...data, front: cnicFront, back: cnicBack },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (res.error === false) {
          dispatch(setAuth({ token: res.token, userType: 2, user: res.data.account[0] }));
          toast.success(res.message);
          navigate(websiteRoutes.sellerOtp);
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

  const country_id = watch("country_id")
  useEffect(()=> {
    if (country_id) {
      dispatch(fetchState(country_id))
    }
  },[country_id, dispatch])
  const state_id = watch("state_id")
  useEffect(()=> {
    if (state_id) {
      dispatch(fetchCity(state_id))
    }
  },[state_id, dispatch])

  useEffect(()=> {
    if (searchParams.get("switch")) {
      reset({...user})
    }
  },[reset, searchParams, user])

  return (
    <div className="container my-12">
      <Step step={step} count={4}/>
      
      <div className="mt-8 flex justify-center">
        <div className="lg:w-[65%] w-full bg-white flex flex-col justify-center sm:p-10 p-2 md:p-5 border border-[#E0E0E0]">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                  {step === 1 && "Personal"}
                  {step === 2 && "Bank"}
                  {step === 3 && "Shop"}
                  {step === 4 && "CNIC"}
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
                        onChange={(e)=>setValue("first_name",e.target.value)}
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
                        onChange={(e)=>setValue("last_name",e.target.value)}
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
                        onChange={(e)=>setValue("email",e.target.value)}
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
                        onChange={(e)=>setValue("phone",e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <Select
                      label="Country"
                      name={"country_id"}
                      register={register}
                      error={errors.country_id}
                      options={options}
                      onChange={(e)=>setValue("country_id",e.target.value)}
                    />
                  </div>
                  <div className="md:flex gap-2">
                    <div className="mb-5 flex-1">
                      <Select
                        label="State"
                        name={"state_id"}
                        register={register}
                        error={errors.state_id}
                        options={state}
                        disabled={state.length === 0}
                        onChange={(e)=>setValue("state_id",e.target.value)}
                      />
                    </div>{" "}
                    <div className="mb-5 flex-1">
                      <Select
                        label="City"
                        name={"city_id"}
                        register={register}
                        error={errors.city_id}
                        options={city}
                        disabled={city.length === 0}
                        onChange={(e)=>setValue("city_id",e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-item mb-5  ">
                    <Textinput
                      placeholder="Enter Your Address"
                      label="Address"
                      type="text"
                      name={"address"}
                      register={register}
                      error={errors.address}
                      onChange={(e)=>setValue("address",e.target.value)}
                    />
                  </div>
                  <div className="input-item mb-5  ">
                    <Textinput
                      placeholder="Enter Your Cnic Number"
                      label="National Identification Number"
                      type="number"
                      name={"nic"}
                      register={register}
                      error={errors.nic}
                      onChange={(e)=>setValue("nic",e.target.value)}
                    />
                  </div>
                  <div className="md:flex gap-2">
                    <div className="input-item mb-5 flex-1 ">
                      <Textinput
                        placeholder="Enter Your Password"
                        label="Password"
                        type="password"
                        name={"password"}
                        register={register}
                        error={errors.password}
                        hasicon
                        onChange={(e)=>setValue("password",e.target.value)}
                      />
                    </div>
                    <div className="input-item mb-5 flex-1">
                      <Textinput
                        placeholder="Confirm Your Password"
                        label="Confirm Passoword"
                        type="password"
                        name={"cpassword"}
                        register={register}
                        error={errors.cpassword}
                        hasicon
                        onChange={(e)=>setValue("cpassword",e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="input-area" data-aos="fade-up">
                  <div className="mb-5">
                    <Select
                      label="Bank"
                      name={"bank_id"}
                      register={register}
                      error={errors.bank_id}
                      options={bank}
                      onChange={(e)=>setValue("bank_id",e.target.value)}
                    />
                  </div>
                  <div className="md:flex gap-2">
                    <div className="input-item mb-5 flex-1 ">
                      <Textinput
                        placeholder="Enter Your IBAN Number"
                        label="Account IBAN Number (24 Characters)"
                        type="text"
                        name={"iban"}
                        register={register}
                        error={errors.iban}
                        min={0}
                        onChange={(e)=>setValue("iban",e.target.value)}
                      />
                    </div>
                    <div className="input-item mb-5 flex-1">
                      <Textinput
                        placeholder="Confirm Your Account Title"
                        label="Account Title"
                        type="text"
                        name={"title"}
                        register={register}
                        error={errors.title}
                        onChange={(e)=>setValue("title",e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="input-area" data-aos="fade-up">
                  <div className="input-item mb-5">
                    <Textinput
                      placeholder="Enter Your Shop Name"
                      label="Shop Name"
                      type="text"
                      name={"shop_name"}
                      register={register}
                      error={errors.shop_name}
                      onChange={(e)=>setValue("shop_name",e.target.value)}
                    />
                  </div>
                  <div className="md:flex gap-2">
                    <div className="input-item mb-5 flex-1">
                      <Textinput
                        placeholder="Enter Your Bussiness Email"
                        label="Bussiness Email"
                        type="text"
                        name={"shop_email"}
                        register={register}
                        error={errors.shop_email}
                        onChange={(e)=>setValue("shop_email",e.target.value)}
                      />
                    </div>
                    <div className="input-item mb-5 flex-1">
                      <Textinput
                        placeholder="Enter Your Bussiness Phone "
                        label="Bussiness Phone #"
                        type="number"
                        name={"shop_phone"}
                        register={register}
                        error={errors.shop_phone}
                        onChange={(e)=>setValue("shop_phone",e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-item mb-5  ">
                    <Textinput
                      placeholder="Enter Your Bussiness Address"
                      label="Bussiness Address"
                      type="text"
                      name={"shop_address"}
                      register={register}
                      error={errors.shop_address}
                      onChange={(e)=>setValue("shop_address",e.target.value)}
                    />
                  </div>

                  <div className="md:flex gap-2">
                    <div className="input-item mb-5 flex-1 ">
                      <Textinput
                        placeholder="Enter Your NTN Number"
                        label="National Tax Number "
                        type="number"
                        name={"ntn"}
                        register={register}
                        error={errors.ntn}
                        min={"0"}
                        onChange={(e)=>setValue("ntn",e.target.value)}
                      />
                    </div>
                    <div className="input-item mb-5 flex-1">
                      <Textinput
                        placeholder="Confirm Your STN Number"
                        label="Sales Tax Number"
                        type="number"
                        name={"stn"}
                        register={register}
                        error={errors.stn}
                        onChange={(e)=>setValue("stn",e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="input-area" data-aos="fade-up">
                  <div className="flex  flex-col items-center gap-4 mb-5">
                    <Fileinput
                      name={"cnicfront"}
                      placeholder="Select the CNIC Front"
                      label="CNIC Front"
                      onChange={(e) => setCnicFront(e.target.files[0])}
                      preview
                      className="w-full"
                      selectedFile={cnicFront}
                    />
                    {!cnicFront && <img src={CNICFront} alt="" className="w-full md:w-[40%]" />}
                  </div>
                  <div className="flex  flex-col items-center gap-4 mb-5">
                    <Fileinput
                      name={"cnicback"}
                      placeholder="Select the CNIC Front"
                      label="CNIC Front"
                      onChange={(e) => setCnicBack(e.target.files[0])}
                      preview
                      selectedFile={cnicBack}
                    />
                    {!cnicBack && <img src={CNICBack} alt="" className="w-full md:w-[40%]" />}
                  </div>
                </div>
              )}
              <div className="mb-3.5">
                <div className="flex gap-5 justify-end">
                  {step !== 0 && (
                    <Button text="prev" className="btn-primary" onClick={handlePrev} disabled={step === 1} />
                  )}
                  <Button
                    text={step !== 4 ? "next" : "submit"}
                    className="btn-primary"
                    type="submit"
                    // disabled={step === 4 ? isSubmitting : !isValid}
                    disabled={isSubmitting}
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

export default VendorSignup;
