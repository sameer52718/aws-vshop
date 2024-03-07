import Textinput from "../../../components/ui/Textinput";
import Select from "../../../components/ui/Select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getSellerProfile, updateSellerBank } from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const bank = [{ name: "Meezan", id: 1 }];

const schema = yup.object({
  bank_id: yup.string().required("Bank is Required"),
  iban: yup
    .number()
    .typeError("IBAN must be a number")
    .required("IBAN is Required"),
  title: yup.string().required("Account Title is Required"),
});
const Bank = () => {
  const auth = useSelector(state => state.auth)
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const getData = async () => {
    try {
      const { data } = await axios.get(getSellerProfile, {
        headers: { Authorization: auth.token },
      });
      if (data.error === false) {
        reset(data.data.bank);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    try {
      const {data:res} = await axios.post(updateSellerBank,data, {headers:{Authorization:auth.token}})
      if (res.error === false) {
        toast.success(res.message)
      }else if (res.error === true) {
        toast.error(res.message)
      } 
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4 ">
      <div className="input-area" data-aos="fade-up">
        <div className="mb-5">
          <Select
            label="Bank"
            name={"bank"}
            register={register}
            error={errors.country}
            options={bank}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="input-item mb-5 flex-1 ">
            <Textinput
              placeholder="Enter Your IBAN Number"
              label="Account IBAN Number (24 Characters)"
              type="number"
              name={"iban"}
              register={register}
              error={errors.iban}
              min={0}
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

export default Bank;
