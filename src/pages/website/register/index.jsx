import { Link, useNavigate, redirect, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Textinput from "../../../components/ui/Textinput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import imgthumb from "../../../assets/images/vectors/sign-up.png";
import { toast } from "react-toastify";
import axios from "axios";
import { registerUser } from "@/constant/apiRoutes";
import { setAuth } from "../../../store/auth/store";
import { useDispatch } from "react-redux";
import { userDashboardRoutes, websiteRoutes } from "../../../constant/routes";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
// import fbLogo from "../../../assets/images/logo/facebook.png";
// import googleLogo from "../../../assets/images/logo/google.png";

const schema = yup.object({
  first_name: yup.string().required("First Name is Requied"),
  last_name: yup.string().required("Last Name is Requied"),
  email: yup.string().email().required("Email is Required"),
  phone: yup.number(),
  password: yup.string().required("Password is Required"),
  // .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
  // .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
  // .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
  // .matches(/^(?=.*[!@#$%^&*])/, "  Must Contain  One Special Case Character")
  // .test("len", "Must be greater than 8 Characters", (val) => val.length >= 8)
  cpassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.token && auth.user && parseInt(auth.userType) === 1) {
      redirect(`${userDashboardRoutes.dashboard}/${userDashboardRoutes.home}`);
    }
  }, [auth.token, auth.user, auth.userType]);

 

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });
  useEffect(() => {
    if (searchParams.get("switch")) {
      reset({...auth.user})
    }
  }, [auth.user, reset, searchParams]);
  const onSubmit = async (data) => {
    try {
      if (!checked) {
        toast.error("You have to agree Terms and Condition");
        return;
      }
      const { data: res } = await axios.post(registerUser, {
        ...data,
        join: 1,
      });
      if (res.error === false) {
        toast.success(res.message);
        dispatch(setAuth({ token: res.token, user: res.data.account[0], userType: 1 }));
        navigate(websiteRoutes.userOtp);
      } else if (res.error === true) {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const loginWithGoogle = async (data) => {
  //   try {
  //     const nameArray = data.name.split(" ");
  //     const { data: res } = await axios.post(registerUser, {
  //       first_name: nameArray.slice(0, nameArray.length - 1).join(" "),
  //       last_name: nameArray[nameArray.length - 1],
  //       email: data.email,
  //       profile: data.picture,
  //       join: 2,
  //     });
  //     if (res.error === false) {
  //       toast.success(res.message);
  //       dispatch(
  //         setAuth({ token: res.token, user: res.data.account[0], userType: 1 })
  //       );
  //       navigate(userDashboardRoutes.home);
  //     } else if (res.error === true) {
  //       toast.error(res.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const [checked, setChecked] = useState(false);
  const rememberMe = () => {
    setChecked(!checked);
  };
  return (
    <div className="container mx-auto my-12">
      <div className="flex justify-center items-center relative">
        <div className="lg:w-[700px] w-full bg-white flex flex-col justify-center md:p-10 p-5 border border-[#E0E0E0]">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                <h1 className="text-[34px] font-bold leading-[74px] text-qblack">{"User Sign Up"}</h1>
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
                <div className="md:flex gap-2">
                  <div className="input-item mb-5 flex-1">
                    <Textinput
                      placeholder="Enter Your First Name"
                      label="First Name"
                      type="text"
                      name={"first_name"}
                      register={register}
                      error={errors.first_name}
                      onChange={(e) => setValue("first_name", e.target.value)}
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
                      onChange={(e) => setValue("last_name", e.target.value)}
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
                      onChange={(e) => setValue("email", e.target.value)}
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
                      onChange={(e) => setValue("phone", e.target.value)}
                    />
                  </div>
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
                      onChange={(e) => setValue("password", e.target.value)}
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
                      onChange={(e) => setValue("cpassword", e.target.value)}
                    />
                  </div>
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
                      // onClick={rememberMe}
                      className="text-[13px] md:text-base text-black cursor-pointer"
                    >
                      I agree all{" "}
                      <Link to={websiteRoutes.termsAndConditions} className="text-primary-700 ">
                        Terms and Condition
                      </Link>{" "}
                      in View n shop
                    </span>
                  </div>
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
                      <span>{"Signup"}</span>
                    </button>
                  </div>
                </div>

                {/* <div className="input-item flex justify-center items-center gap-5 mb-4">
                  <img className="w-8" src={fbLogo} alt="facebook logo" />
                  <img className="w-8" src={googleLogo} alt="google logo" />
                </div> */}

                {/* <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential != null) {
                      const USER_CREDENTIAL = jwtDecode(
                        credentialResponse.credential
                      );
                      loginWithGoogle(USER_CREDENTIAL);
                    }
                  }}
                  onError={() => {
                    console.error("Login Failed");
                  }}
                />
                <>
                  <a
                    href={`#`}
                    className=" rounded-md w-full border border-qgray-border text-white h-[50px] flex space-x-3  justify-center bg-[#38599A] items-center mb-2"
                  >
                    <svg
                      className="fill-current w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.4024 21V14.0344H17.7347L18.0838 11.3265H15.4024V9.59765C15.4024 8.81364 15.62 8.27934 16.7443 8.27934L18.1783 8.27867V5.85676C17.9302 5.82382 17.0791 5.75006 16.0888 5.75006C14.0213 5.75006 12.606 7.01198 12.606 9.32952V11.3265H10.2677V14.0344H12.606V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15.4024Z"></path>
                    </svg>

                    <span className="text-sm md:text-[18px] font-normal text-white">
                      Sign In with Facebook
                    </span>
                  </a>
                </> */}

                <div className="signup-area flex justify-center">
                  <p className="text-sm md:text-base text-qgraytwo font-normal">
                    {"Already have an Account"} ?
                    <Link to={websiteRoutes.userLogin}>
                      <span className="ml-2 text-qblack cursor-pointer capitalize">{"log in"}</span>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
          <div
            className="absolute ltr:xl:-right-20 ltr:-right-[138px] rtl::xl:-left-20 rtl:-left-[138px]"
            style={{ top: "calc(50% - 258px)" }}
          >
            {imgthumb && (
              <img width={608} height={480} src={imgthumb} alt="login" />
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Register;
