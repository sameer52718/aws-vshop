import Textinput from "../../../components/ui/Textinput";
import TextArea from "../../../components/ui/Textarea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Breadcrumbs from "../../../components/websitePartials/breadcrumb";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone is required"),
  message: yup.string().required("Message is required"),
});

const HelpCenter = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const onSubmit = (data) => {};

  return (
    <div className="container my-8">
      <Breadcrumbs currentLink="help centre" />
      <div className="xs:w-[80%] md:w-[70%] lg:w-[60%] mx-auto bg-white rounded-lg py-8 md:px-8 px-4">
        <h1 className="text-center text-main text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4">
          Help Centre
        </h1>
        <form
          className="flex flex-col gap-4 my-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Textinput
            name={"name"}
            register={register}
            type={"text"}
            label={"Name"}
            placeholder="Enter your Name"
            error={errors.name}
          />
          <Textinput
            name={"email"}
            register={register}
            type={"text"}
            label={"Email"}
            placeholder="Enter your Email"
            error={errors.email}
          />
          <Textinput
            name={"phone"}
            register={register}
            type={"text"}
            label={"Phone #"}
            placeholder="Enter your Phone #"
            error={errors.phone}
          />
          <TextArea
            label={"Message"}
            register={register}
            name={"message"}
            placeholder={"Enter your Message Here"}
            error={errors.message}
            row={5}
          />
          <button
            type="submit"
            className="btn btn-primary w-max"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpCenter;
