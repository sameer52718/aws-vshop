import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Textinput from "../../../components/ui/Textinput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import imgthumb from "../../../assets/images/vectors/log-in.png";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/auth/store";
import { toast } from "react-toastify";
import axios from "axios";
import { sellerDashboardRoutes, websiteRoutes } from "../../../constant/routes";
import { sellerLogin } from "../../../constant/apiRoutes";

const schema = yup.object({
  email: yup.string().email().required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.token && auth.user && auth.userType === 2) {
      navigate(`${sellerDashboardRoutes.dashboard}/${sellerDashboardRoutes.home}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });

  const onSubmit = async (data) => {
    try {
      const { data: res } = await axios.post(sellerLogin, { ...data, join: 1 });

      if (res.error === false) {
        if (res.verified === true) {
          dispatch(
            setAuth({
              token: res.token,
              user: res.data.account[0],
              userType: 2,
            })
          );
          navigate(`${sellerDashboardRoutes.dashboard}/${sellerDashboardRoutes.home}`);
        } else if (res.verified === false) {
          navigate(websiteRoutes.sellerOtp);
          dispatch(
            setAuth({
              token: res.token,
              user: res.data.account[0],
              userType: 2,
            })
          );
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  const [checked, setChecked] = useState(false);

  const rememberMe = () => {
    setChecked(!checked);
  };

  return (
    <div className="container mx-auto my-12">
      <div className="lg:flex items-center relative">
        <div className="lg:w-[572px] w-full h-[650px] bg-white flex flex-col justify-center sm:p-10 md:p-5 border border-[#E0E0E0]">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                  {"Seller Log In"}
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
              <div className="input-area">
                <div className="input-item mb-5">
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
                <div className="input-item mb-5">
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
                <div className="forgot-password-area flex justify-between items-center mb-7">
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
                  <Link to={websiteRoutes.sellerForgotPassword}>
                    <a>
                      <span className="md:text-base text-qyellow cursor-pointer text-[13px]">
                        {"Forgot password"}?
                      </span>
                    </a>
                  </Link>
                </div>
                <div className="signin-area mb-3.5">
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className={`rounded-md mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-main items-center ${
                        isSubmitting && "cursor-not-allowed"
                      }`}
                      disabled={isSubmitting}
                    >
                      <span>{"Login"}</span>
                    </button>
                  </div>
                </div>
                
                <div className="signup-area flex justify-center">
                  <p className="md:text-base text-qgraytwo font-normal text-sm">
                    {"Dont have an account"} ?
                    <Link to={websiteRoutes.sellerSignup}>
                      <span className="ml-2 text-qblack cursor-pointer capitalize">
                        {"sign up"}
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
          <div
            className="absolute ltr:xl:-right-20 ltr:-right-[138px] rtl::xl:-left-20 rtl:-left-[138px]"
            style={{ top: "calc(50% - 258px)" }}
          >
            {imgthumb && (
              <img width={608} height={480} src={imgthumb} alt="login" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
