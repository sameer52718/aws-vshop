import Textinput from "../../../components/ui/Textinput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { getUserProfile, updateUserProfile, userProfile } from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/auth/store";
import { useNavigate } from "react-router-dom";
import { websiteRoutes } from "../../../constant/routes";
import NoProfile from "../../../assets/images/avatar/NoProfile.png";
import { Icon } from "@iconify/react";
import FormLoader from "../../../components/FormLoader";
const schema = yup.object({
  first_name: yup.string().required("First Name is Requied"),
  last_name: yup.string().required("Last Name is Requied"),
  email: yup.string().email().required("Email is Required"),
  phone: yup.number(),
});
const Personal = () => {
  const auth = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState({ profile: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(getUserProfile, {
        headers: { Authorization: auth.token },
      });
      if (data.error === false) {
        reset(data.data.profile[0]);
        setImages((prev) => ({
          ...prev,
          profile: data.data.profile[0].profile,
        }));
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    try {
      const { data: res } = await axios.post(
        updateUserProfile,
        { ...data, profile },
        {
          headers: { Authorization: auth.token, "Content-Type": "multipart/form-data" },
        }
      );
      if (res.error === false) {
        if (res.verified === true) {
          toast.success(res.message);
          dispatch(setAuth({ ...auth, user: { ...auth.user, ...data } }));
        } else if (res.verified === false) {
          toast.success(res.message);
          dispatch(setAuth({ token: null, userType: null, user: null }));
          navigate(websiteRoutes.userLogin);
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4 ">
          <div className="input-area">
            <div className="relative mb-5">
              <div
                className="absolute bg-gray-100 xs:h-8 w-5 h-5 xs:w-8 rounded-full bottom-0 left-8 xs:left-[70px] grid place-items-center cursor-pointer"
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
                      ? `${userProfile}/${images.profile}`
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
