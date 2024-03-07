import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import Textinput from "../../../components/ui/Textinput";
import TextArea from "../../../components/ui/Textarea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { insertContactData } from "../../../constant/apiRoutes";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone is required"),
  message: yup.string().required("Message is required"),
});

const Contact = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });

  const onSubmit = async (data) => {
    try {
      const { data: res } = await axios.post(insertContactData, data);
      if (res.error === false) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="container mt-12 mb-24">
        <div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
          <ul className="breadcrumbs">
            <li className="text-main">
              <NavLink to="/" className="text-lg">
                <Icon icon="heroicons-outline:home" />
              </NavLink>
              <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                <Icon icon="heroicons:chevron-right" />
              </span>
            </li>
            <li className="capitalize text-slate-500 dark:text-slate-400">Contact us</li>
          </ul>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className=" flex flex-col gap-6">
            <a
              href="mailto:hello@gmail.com"
              className="flex items-center gap-2 md:text-lg text-sm bg-white py-4 px-4 rounded-lg transition-all ease-in-out text-main hover:bg-main hover:text-white"
            >
              <Icon icon={"material-symbols:mail-outline"} className="text-2xl" />
              Mail : demo@gmail.com
            </a>
            <a className="flex items-center gap-2 md:text-lg text-sm bg-white py-4 px-4 rounded-lg transition-all ease-in-out text-main hover:bg-main hover:text-white">
              <Icon icon={"mdi:location"} className="text-2xl" />
              Address : Shahrah-e-Faisal, Karachi
            </a>
            <a className="flex items-center gap-2 md:text-lg text-sm bg-white py-4 px-4 rounded-lg transition-all ease-in-out text-main hover:bg-main hover:text-white">
              <Icon icon={"mingcute:phone-fill"} className="text-2xl" />
              Phone : +92 310 0000000
            </a>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198611.966356061!2d-100.95967641530703!3d38.47276784647828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87a31771717c016b%3A0x68c2b4a94b3e095f!2sKansas%2C%20USA!5e0!3m2!1sen!2s!4v1689230574779!5m2!1sen!2s"
              width="100%"
              className="rounded-lg"
              height="350"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="bg-white rounded-lg py-8 md:px-8 px-4">
            <h5 className="text-main font-semibold ">Contact Us</h5>
            <form className="flex flex-col gap-4 my-4" onSubmit={handleSubmit(onSubmit)}>
              <Textinput
                name={"name"}
                register={register}
                type={"text"}
                label={"Name"}
                placeholder="Enter your Name"
                error={errors.name}
                onChange={(e) => setValue("name", e.target.value)}
              />
              <Textinput
                name={"email"}
                register={register}
                type={"text"}
                label={"Email"}
                placeholder="Enter your Email"
                error={errors.email}
                onChange={(e) => setValue("email", e.target.value)}
              />
              <Textinput
                name={"phone"}
                register={register}
                type={"text"}
                label={"Phone #"}
                placeholder="Enter your Phone #"
                error={errors.phone}
                onChange={(e) => setValue("phone", e.target.value)}
              />
              <TextArea
                label={"Message"}
                register={register}
                name={"message"}
                placeholder={"Enter your Message Here"}
                error={errors.message}
                row={5}
                onChange={(e) => setValue("message", e.target.value)}
              />
              <button type="submit" className="btn btn-primary w-max" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
