import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { userLogin } from "@/constant/apiRoutes";
import { websiteRoutes } from "@/constant/routes";
import { setAuth } from "@/store/auth/store";

import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import GuestAvatar from "../../../assets/images/avatar/NoProfile.png"
import { guestLogin } from "../../../constant/apiRoutes";
const schema = yup.object({
  email: yup.string().email().required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const LoginModal = ({ handleClose, active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });

  const onSubmit = async (data) => {
    try {
      const { data: res } = await axios.post(userLogin, { ...data, join: 1 });

      if (res.error === false) {
        if (res.verified === true) {
          dispatch(
            setAuth({
              token: res.token,
              user: res.data.account[0],
              userType: 1,
            })
          );
          handleClose();
        } else if (res.verified === false) {
          dispatch(
            setAuth({
              token: res.token,
              user: res.data.account[0],
              userType: 1,
            })
          );
          navigate(websiteRoutes.userOtp);
          handleClose();
        }
      } else {
        toast.error(res.message);
        handleClose()
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const rememberMe = () => {
    setChecked(!checked);
  };

  

  const handleGuestLogin = async () => {
    try {
      const {data} =  await axios.get(guestLogin)
      if (data.error === false) {
        dispatch(
          setAuth({
            token: data.token,
            user: null,
            userType: 4,
          })
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Modal
      title="Login"
      label="Login Form"
      labelClass="btn-outline-dark"
      activeModal={active}
      onClose={handleClose}
      themeClass="bg-main"
      centered={true}
      noFade={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center text-base text-slate-600 dark:text-slate-300">
          <div className="w-full input-item mb-5">
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
          <div className="w-full input-item mb-5">
            <Textinput
              placeholder="Enter Your Password"
              label="Password"
              type="password"
              name={"password"}
              register={register}
              error={errors.password}
              hasicon
              onChange={(e) => setValue("password" , e.target.value)}
            />
          </div>
          <div className="w-full forgot-password-area flex justify-between items-center mb-5">
            <div className="remember-checkbox flex items-center space-x-2.5 rtl:space-x-reverse">
              <button
                onClick={rememberMe}
                type="button"
                className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
              >
                {checked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <span
                onClick={rememberMe}
                className="md:text-base text-black cursor-pointer text-[13px]"
              >
                {"Remember Me"}
              </span>
            </div>
            <Link to="/forgot-password">
              <a>
                <span className="md:text-base text-qyellow cursor-pointer text-[13px]">
                  {"Forgot password"}?
                </span>
              </a>
            </Link>
          </div>
          <div className="mb-5 flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Login
            </button>
          </div>

          <div className="inline-flex self-center justify-center my-2 p-2 rounded-md bg-secondary-100">
            <button
              className="flex gap-2 items-center"
              type="button"
              onClick={() => {
                handleClose();
                handleGuestLogin();
              }}
            >
              <img className="w-8 h-8" src={GuestAvatar} alt="Guest" />
              <p>Continue As Guest</p>
            </button>
          </div>

          <div className="signup-area flex justify-center">
            <p className="md:text-base text-qgraytwo font-normal text-sm">
              {"Dont have an account"} ?
              <span
                onClick={() => {
                  handleClose();
                  navigate(websiteRoutes.userRegister);
                }}
              >
                <span className="ml-2 text-qblack cursor-pointer capitalize">
                  {"sign up"}
                </span>
              </span>
            </p>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;

LoginModal.propTypes = {
  active: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
