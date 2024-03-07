import {
  SellerProfile,
  getCity,
  getSellerProfile,
  getState,
  updateSellerPersonal,
} from "../../../constant/apiRoutes";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import * as yup from "yup";
import { websiteRoutes } from "../../../constant/routes";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { setAuth } from "../../../store/auth/store";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

import Textinput from "../../../components/ui/Textinput";
import Select from "../../../components/ui/Select";

import NoProfile from "../../../assets/images/avatar/NoProfile.png";
import FormLoader from "../../../components/FormLoader";

const schema = yup.object({
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
});
const Personal = () => {
  const auth = useSelector((state) => state.auth);
  const { options } = useSelector((state) => state.country);
  const [isLoading , setIsLoading] = useState(true)
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState({ profile: null });
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const getData = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(getSellerProfile, {
        headers: { Authorization: auth.token },
      });
      if (data.error === false) {
        const values = data.data.profile[0];
        const [stateRes, cityRes] = await Promise.all([
          axios.post(getState, { country_id: values.country_id }),
          axios.post(getCity, { state_id: values.state_id }),
        ]);
        let states = stateRes?.data?.data?.state ?? [];
        setState(states.map((item) => ({ id: item.state_id, name: item.name })));
        let cities = cityRes?.data?.data?.city ?? [];
        setCity(cities.map((item) => ({ id: item.city_id, name: item.name })));
        reset(values);
        setImages((prev) => ({
          ...prev,
          profile: values.profile,
        }));
      }
    } catch (error) {
      toast.error(error.message);
    } finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    try {
      const { data: res } = await axios.post(
        updateSellerPersonal,
        { ...data, profile },
        {
          headers: {
            Authorization: auth.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.error === false) {
        if (res.verified === true) {
          toast.success(res.message);
          dispatch(setAuth({ ...auth, user: { ...auth.user, ...data } }));
        } else if (res.verified === false) {
          toast.success(res.message);
          dispatch(setAuth({ token: null, userType: null, user: null }));
          navigate(websiteRoutes.sellerLogin);
        }
      } else if (res.error === true) {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <FormLoader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] p-4 ">
          <div className="input-area">
            <div className="relative mb-5">
              <div
                className="absolute bg-gray-100 xs:h-8 w-6 h-6 xs:w-8 rounded-full bottom-0 left-8 xs:left-[70px] grid place-items-center cursor-pointer"
                onClick={() => inputRef.current.click()}
              >
                <Icon icon={"bx:edit"} />
                <input
                  type="file"
                  ref={inputRef}
                  hidden
                  onChange={(e) => setProfile(e.target.files[0])}
                  accept="image/*"
                />
              </div>
              <div className="h-[50px] xs:h-[100px] w-[50px] xs:w-[100px] ">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : images.profile
                      ? `${SellerProfile}/${images.profile}`
                      : NoProfile
                  }
                  alt="Profile"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="input-item mb-5 flex-1">
                <Textinput
                  mainClassName={"w-[100%]"}
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
                  mainClassName={"w-[100%]"}
                  placeholder="Enter Your Last Name"
                  label="Last Name"
                  type="text"
                  name={"last_name"}
                  register={register}
                  error={errors.last_name}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
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
            <div className="mb-5">
              <Select
                label="Country"
                name={"country_id"}
                register={register}
                error={errors.country_id}
                options={options}
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
                />
              </div>{" "}
              <div className="mb-5 flex-1">
                <Select
                  label="City"
                  name={"city_id"}
                  register={register}
                  error={errors.city_id}
                  options={city}
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
              />
            </div>
            <div className="signin-area mb-3.5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={"btn btn-primary"}
                  disabled={isSubmitting}
                >
                  <span>{"Update"}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Personal;
