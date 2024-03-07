import Textinput from "../../../components/ui/Textinput";
import Fileinput from "../../../components/ui/Fileinput";
import TextArea from "../../../components/ui/Textarea"
import { useState , useEffect  } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import {bannerRoute,getSellerProfile,logoRoute,updateSellerShop} from "@/constant/apiRoutes";
import { useSelector } from "react-redux";
const shopSchema = yup.object({
  name: yup.string().required("Shop Name is Required"),
  email: yup.string().email().required("Shop Email is Required"),
  phone: yup
    .number()
    .typeError("Shop Phone Shouid be Number ")
    .required("Shop Phone is Required"),
  address: yup.string(),
  description:yup.string(),
  ntn: yup
    .number()
    .typeError("NTN Should be a Number")
    .required("NTN is Required"),
  stn: yup
    .number()
    .typeError("STN Should be a Number")
    .required("STN is Required"),
});
const Shop = () => {
  const auth = useSelector((state) => state.auth);
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [images, setImages] = useState({
    logo: null,
    banner: null,
  });
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(shopSchema), mode: "all" });

  const getData = async () => {
    try {
      const { data } = await axios.get(getSellerProfile, {
        headers: { Authorization: auth.token },
      });
      if (data.error === false) {
        reset(data.data.shop[0]);
        setImages((prev) => ({
          ...prev,
          logo: data.data.shop[0].logo,
          banner: data.data.shop[0].cover,
        }));
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
      const { data: res } = await axios.post(
        updateSellerShop,
        { ...data, cover: banner, logo },
        {
          headers: {
            Authorization: auth.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.error === false) {
        toast.success(res.message);
      } else if (res.error === true) {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4 ">
      <div className="input-area" data-aos="fade-up">
        <div className="input-area" data-aos="fade-up">
          <div className="input-item mb-5">
            <Textinput
              placeholder="Enter Your Shop Name"
              label="Shop Name"
              type="text"
              name={"name"}
              register={register}
              error={errors.name}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="input-item mb-5 flex-1">
              <Textinput
                placeholder="Enter Your Bussiness Email"
                label="Bussiness Email"
                type="text"
                name={"email"}
                register={register}
                error={errors.email}
              />
            </div>
            <div className="input-item mb-5 flex-1">
              <Textinput
                placeholder="Enter Your Bussiness Phone "
                label="Bussiness Phone #"
                type="number"
                name={"phone"}
                register={register}
                error={errors.phone}
              />
            </div>
          </div>

          <div className="input-item mb-5  ">
            <Textinput
              placeholder="Enter Your Bussiness Address"
              label="Bussiness Address"
              type="text"
              name={"address"}
              register={register}
              error={errors.address}
            />
          </div>
          <div className="input-item mb-5  ">
            <TextArea
              placeholder="Enter Your Bussiness Description"
              label="Description"
              type="text"
              name={"description"}
              register={register}
              error={errors.description}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <div className="input-item mb-5 flex-1 ">
              <Textinput
                placeholder="Enter Your NTN Number"
                label="National Tax Number "
                type="number"
                name={"ntn"}
                register={register}
                error={errors.ntn}
                min={"0"}
              />
            </div>
            <div className="input-item mb-5 flex-1">
              <Textinput
                placeholder="Confirm Your STN Number"
                label="Sales Tax Number"
                type="number"
                name={"stn"}
                register={register}
                error={errors.stn}
              />
            </div>
          </div>
          <div className="input-item mb-5  ">
            <label htmlFor="logo" className="form-label">
              Logo
            </label>
            <Fileinput
              placeholder="Add Your Store Logo"
              label="Logo"
              name={"logo"}
              id={"logo"}
              preview={true}
              selectedFile={logo}
              onChange={(e) => setLogo(e.target.files[0])}
              accept="image/*"
            />
            {!logo && images.logo && (
              <div className="w-[200px] h-[200px] mx-auto mt-6  ">
                <img
                  src={`${logoRoute}/${images.logo}`}
                  className="w-full  h-full block rounded object-contain border p-2  border-slate-200"
                  alt={"shop logo"}
                />
              </div>
            )}
          </div>
          <div className="input-item mb-5  ">
            <label htmlFor="banner" className="form-label">
              Banner
            </label>
            <Fileinput
              placeholder="Add Your Store Banner"
              label="banner"
              name={"banner"}
              id={"banner"}
              preview={true}
              selectedFile={banner}
              onChange={(e) => setBanner(e.target.files[0])}
              accept="image/*"
            />
            {images.banner && !banner && (
              <div className="w-[200px] h-[200px] mx-auto mt-6  ">
                <img
                  src={`${bannerRoute}/${images.banner}`}
                  className="w-full  h-full block rounded object-contain border p-2  border-slate-200"
                  alt={"shop logo"}
                />
              </div>
            )}
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

export default Shop;
