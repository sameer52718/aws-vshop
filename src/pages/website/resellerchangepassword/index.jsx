import Textinput from "../../../components/ui/Textinput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import imgthumb from "../../../assets/images/vectors/change.png";
import { toast } from "react-toastify";
import axios from "axios";
import { resellerChangePassword} from "../../../constant/apiRoutes";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../../store/auth/store";
import { websiteRoutes } from "../../../constant/routes";

const schema = yup.object({
  password: yup
    .string()
    .required("Password is Required"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ChangePassword = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });

  const onSubmit = async (data) => {
    try {
      const { data: res } = await axios.post(
        resellerChangePassword,
        { password: data.password },
        { headers: { Authorization: auth.token } }
      );
      if (res.error === false) {
        toast.success(res.message);
        dispatch(setAuth({ token: null, user: null, userType: null }));
        navigate(websiteRoutes.resellerLogin);
      } else if (res.error === true) {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto my-12">
      <div className="lg:flex items-center relative">
        <div className="lg:w-[572px] w-full bg-white flex flex-col justify-center sm:p-10 md:p-5 p-2 border border-[#E0E0E0]">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                <h1 className="text-[28px] md:text-[34px] font-bold leading-[74px] text-qblack">
                  New Password
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
                    placeholder="Enter Your Password"
                    label="Password"
                    type="password"
                    name={"password"}
                    register={register}
                    error={errors.password}
                    hasicon
                    onChange={(e)=> setValue("password", e.target.value)}
                  />
                </div>
                <div className="input-item mb-5">
                  <Textinput
                    placeholder="Confirm Your Password"
                    label="Confirm Password"
                    type="password"
                    name={"cpassword"}
                    register={register}
                    error={errors.cpassword}
                    hasicon
                    onChange={(e)=> setValue("cpassword", e.target.value)}
                  />
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
                      <span>{"Update"}</span>
                    </button>
                  </div>
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

export default ChangePassword;
