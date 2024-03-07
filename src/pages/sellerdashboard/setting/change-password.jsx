import Textinput from "@/components/ui/Textinput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { websiteRoutes } from "@/constant/routes";
import axios from "axios";
import { sellerChangePassword } from "@/constant/apiRoutes";
import { setAuth } from "@/store/auth/store";

const schema = yup.object({
    current_password:yup.string().required("Current password is Required"),
    password:yup.string().required("New password is Required"),
    cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const ChangePassword = () => {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });
  const onSubmit = async (data) => {
    try {
        const  {data:res} = await axios.post(sellerChangePassword, data, {headers:{Authorization:auth.token}})
        if (res.error === false) {
            toast.success(res.message)
            dispatch(setAuth({token:null,user:null , userType:null}))
            navigate(websiteRoutes.sellerLogin)
        }else if (res.error === true) {
            toast.error(res.message)
        }
    } catch (error) {
        toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4 ">
      <div className="input-area">
        <div className="input-item mb-5 flex-1 ">
          <Textinput
            placeholder="Enter Your Current Password"
            label="Current Password"
            type="password"
            name={"current_password"}
            register={register}
            error={errors.current_password}
            hasicon
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="input-item mb-5 flex-1 ">
            <Textinput
              placeholder="Enter Your Password"
              label="New Password"
              type="password"
              name={"password"}
              register={register}
              error={errors.password}
              hasicon
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
  );
};

export default ChangePassword;
