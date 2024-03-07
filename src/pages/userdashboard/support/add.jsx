import Textinput from "@/components/ui/Textinput";
import Card from "@/components/ui/Card";
import Textarea from "../../../components/ui/Textarea";
import Fileinput from "../../../components/ui/Fileinput"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { insertUserSupport } from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/ui/BackButton";

const FormValidationSchema = yup
  .object({
    subject: yup.string().required("subject is Required"),
    message: yup.string().required("message is Required"),
  })
  .required();

const Support = () => {
  const navigate = useNavigate()
  const {token} = useSelector(state => state.auth)
  const [file,setFile] = useState(null)

  const {
    register,
    formState: { errors,isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const {data:res} = await axios.post(insertUserSupport,{...data,file},{headers:{Authorization:token,"Content-Type":"multipart/form-data"}})
      if (res.error === false) {
        toast.success(res.message);
        navigate(-1)
      }else{
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file.size > 20000000) {
      toast.error("File Must be at least 20MB");
    }else{
      setFile(file)
    }
  }
  return (
    <div className="flex justify-center">
      <div className="w-full ">
        <Card title="Post Your Concerns" headerslot={<BackButton/>}>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" block space-y-4 "
            >
              <Textinput
                name="subject"
                label="Subject"
                type="text"
                register={register}
                error={errors.subject}
                placeholder={"Enter Subject ..."}
              />
              <Textarea
                name="message"
                label={"Message"}
                register={register}
                error={errors.message}
                placeholder={"Enter Message ..."}
              />
              <Fileinput
                selectedFile={file}
                placeholder="upload Any Attachment of Query..."
                onChange={handleFileChange}
              />
              <div className="lg:col-span-2 col-span-1">
                <div className="ltr:text-right rtl:text-left">
                  <button className="btn btn-primary  text-center" type="submit" disabled={isSubmitting}>Submit</button>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Support;
