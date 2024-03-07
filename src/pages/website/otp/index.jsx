import { useState, useEffect } from "react";
import imgthumb from "../../../assets/images/vectors/otp.png";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import axios from "axios";
import { userOtpResend, userVerifyOtp } from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";
import { userDashboardRoutes } from "../../../constant/routes";
import { useNavigate } from "react-router-dom";
const Otp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seconds, setSeconds] = useState(59);
  const handleSubmit = async () => {
    try {
      if (otp.length < 6) {
        toast.error("Please Completely Fill the Otp");
        return;
      }
      setIsSubmitting(true);
      const { data } = await axios.post(
        userVerifyOtp,
        { otp },
        { headers: { Authorization: auth.token } }
      );
      if (data.error === false) {
        toast.success(data.message);
        navigate(`${userDashboardRoutes.dashboard}/${userDashboardRoutes.home}`);
      } else if (data.error === true) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const handleResendOtp = async () => {
    setSeconds(59);
    try {
      const { data } = await axios.get(userOtpResend, {
        headers: { Authorization: auth.token },
      });
      if (data.error === false) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto my-24">
      <div className="lg:flex items-center relative">
        <div className="lg:w-[572px] w-full  bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
          <div className="container">
            <form className="w-full">
              <div className="title-area flex flex-col justify-center items-center relative text-center mb-5">
                <h1 className="text-[28px] md:text-[34px] font-bold leading-[74px] text-qblack">
                  {"Verification"}
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
              <p className="text-gray-400 text-center mb-5 text-sm md:text-base">
                Lorem, ipsum dolor sit amet consectetur adipisicing !
              </p>
              <div className="input-area">
                <div className="input-item mb-5 flex justify-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputStyle={
                      "form-control dark:bg-gray !w-[2em] md:!w-[2.5em] h-12 p-0 text-lg dark:text-secondary-500 rounded-md"
                    }
                    renderSeparator={<span> - </span>}
                    renderInput={(props) => <input {...props} />}
                    inputType="tel"
                    placeholder="******"
                  />
                </div>

                <div className="signin-area ">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`rounded-md mb-6 text-sm text-white h-[50px] font-semibold flex justify-center bg-main items-center w-full md:w-[75%] ${
                        isSubmitting && "cursor-not-allowed"
                      }`}
                    >
                      <span>{"Verify"}</span>
                    </button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <p className="text-gray-400 md:text-sm text-xs">
                    Didnt Recieved your Otp ?{" "}
                    {seconds > 0 ? (
                      <span>You Can Resend Otp In {seconds} seconds</span>
                    ) : (
                      <span
                        onClick={handleResendOtp}
                        className="text-main cursor-pointer font-semibold"
                      >
                        Resend
                      </span>
                    )}
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
              <img width={608} height={440} src={imgthumb} alt="login" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
