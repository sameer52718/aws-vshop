import BackButton from "../../../components/ui/BackButton";
import Textinput from "../../../components/ui/Textinput";
import Textarea from "../../../components/ui/Textarea";
import Select from "../../../components/ui/Select";
import Card from "../../../components/ui/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AreaUnit, bodyCondition, propertyPurpose } from "../../../constant/contants";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchState } from "../../../store/state/slice";
import { fetchCity } from "../../../store/city/slice";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSubType } from "../../../store/propertySubType/slice";
import { editSellerProperty, getSellerPropertyinfo } from "../../../constant/apiRoutes";
import DashboardLoader from "../../../components/DashboardLoader";
const schema = yup.object({
  type_id: yup.string().required("Property Type is required"),
  subtype_id: yup.string().required("Property Sub Type is required"),
  purpose: yup.string().required("Property Purpose is required"),
  price: yup
    .number()
    .typeError("Price Must be a Number")
    .positive("Price Must be a Positive Number")
    .required("Property price is required"),
  location: yup.string().required("Property Location is Required"),
  bathroom: yup
    .number()
    .typeError("bathroom count Must be a Number")
    .positive("bathroom count Must be a Positive Number")
    .required("Property bathroom count is required"),
  bedroom: yup
    .number()
    .typeError("bedroom count Must be a Number")
    .positive("bedroom count Must be a Positive Number")
    .required("Property bedroom count is required"),
  area: yup
    .number()
    .typeError("Area Must be a Number")
    .positive("Area Must be a Positive Number")
    .required("Property Area is required"),
  unit: yup.string().required("Area Unit is Required"),
  condition: yup.string().required("Property Condition is Required"),
  country_id: yup.string().required("Property Country is required"),
  state_id: yup.string().required("Property State is required"),
  city_id: yup.string().required("Property City is required"),
  description: yup.string().required("Property description is required"),
  longitude: yup.number().typeError("longitude Must be a Number").required("Property longitude is required"),
  latitude: yup.number().typeError("latitude Must be a Number").required("Property latitude is required"),
});

const AddProperty = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { options: country } = useSelector((state) => state.country);
  const { options: state, isLoading: stateLoading } = useSelector((state) => state.state);
  const { options: city, isLoading: cityLoading } = useSelector((state) => state.city);
  const { options: type } = useSelector((state) => state.propertyType);
  const { options: subType, isLoading: subtypeLoading } = useSelector((state) => state.subType);
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const country_id = watch("country_id");
  const state_id = watch("state_id");
  const type_id = watch("type_id");

  useEffect(() => {
    if (country_id) {
      dispatch(fetchState(country_id));
    }
  }, [country_id, dispatch]);
  useEffect(() => {
    if (state_id) {
      dispatch(fetchCity(state_id));
    }
  }, [state_id, dispatch]);
  useEffect(() => {
    if (type_id) {
      dispatch(fetchSubType(type_id));
    }
  }, [type_id, dispatch]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(getSellerPropertyinfo, { id }, { headers: { Authorization: token } });
        if (data.error === false) {
          const property = data.data.property;
          if (property.length > 0) {
            delete property[0].amenities;
            setData(property[0]);
          }
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, [token, id]);

  const onSubmit = async (data) => {
    try {
      const body = {
        ...data,
        id,
      };
      const { data: res } = await axios.post(editSellerProperty, body, { headers: { Authorization: token } });
      if (res.error === false) {
        toast.success(res.message);
        navigate(`/dashboard/seller/property`);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setValue("longitude", position.coords.longitude);
        setValue("latitude", position.coords.latitude);
        console.log(position.coords.latitude);
      });
    } else {
      toast.error("Geolocation is not available in your browser.");
    }
  };

  useEffect(() => {
    if (!stateLoading && !cityLoading && !subtypeLoading && Object.keys(data).length > 0) {
      reset(data);
      setIsLoading(false);
    }
  }, [stateLoading, cityLoading, data, reset, subtypeLoading]);

  return (
    <>
      {isLoading ? (
        <DashboardLoader />
      ) : (
        <Card title={"Add Property"} headerslot={<BackButton />}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-6">
                <Select
                  name={"type_id"}
                  register={register}
                  label={"Property Type"}
                  error={errors.type_id}
                  placeholder="Select Your Property Type"
                  options={type}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <Select
                  name={"subtype_id"}
                  register={register}
                  label={"Property Sub Type"}
                  error={errors.subtype_id}
                  placeholder="Select Your Property Sub Type"
                  options={subType}
                  disabled={subType.length === 0}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <Select
                  name={"purpose"}
                  register={register}
                  label={"purpose"}
                  error={errors.purpose}
                  placeholder="Select Your Purpose"
                  options={propertyPurpose}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <Textinput
                  name={"price"}
                  type={"number"}
                  register={register}
                  label={"Price"}
                  error={errors.price}
                  placeholder="Enter Your Property Price"
                />
              </div>

              <div className="col-span-12 sm:col-span-3">
                <Select
                  name={"unit"}
                  register={register}
                  label={"Area Unit"}
                  error={errors.unit}
                  placeholder="Select Your Area Unit"
                  options={AreaUnit}
                />
              </div>
              <div className="col-span-12 sm:col-span-3">
                <Textinput
                  name={"area"}
                  type={"number"}
                  register={register}
                  label={"area"}
                  error={errors.area}
                  placeholder="Enter Your Property area"
                />
              </div>
              <div className="col-span-12 sm:col-span-3">
                <Textinput
                  name={"bathroom"}
                  type={"number"}
                  register={register}
                  label={"bathroom"}
                  error={errors.bathroom}
                  placeholder="Enter Your Property Bathroom Count"
                />
              </div>
              <div className="col-span-12 sm:col-span-3">
                <Textinput
                  name={"bedroom"}
                  type={"number"}
                  register={register}
                  label={"bedroom"}
                  error={errors.bedroom}
                  placeholder="Enter Your Property Bedroom Count"
                />
              </div>
              <div className="col-span-12 sm:col-span-3">
                <Select
                  name={"condition"}
                  register={register}
                  label={"Condition"}
                  error={errors.condition}
                  placeholder="Select your Property Condition"
                  options={bodyCondition}
                />
              </div>
              <div className="col-span-12 sm:col-span-3">
                <Select
                  name={"country_id"}
                  register={register}
                  label={"Country"}
                  error={errors.country_id}
                  placeholder="Select Country Where Property Exist"
                  options={country}
                />
              </div>
              <div className="col-span-12 sm:col-span-3">
                <Select
                  name={"state_id"}
                  register={register}
                  label={"State"}
                  error={errors.state_id}
                  placeholder="Select State Where Property Exist"
                  options={state}
                  disabled={state.length === 0}
                />
              </div>
              <div className="col-span-12 sm:col-span-3">
                <Select
                  name={"city_id"}
                  register={register}
                  label={"City"}
                  error={errors.city_id}
                  placeholder="Select City Where Property Exist"
                  options={city}
                  disabled={city.length === 0}
                />
              </div>
              <div className="col-span-12 ">
                <Textinput
                  name={"location"}
                  type={"text"}
                  register={register}
                  label={"location"}
                  error={errors.location}
                  placeholder="Enter Your Property location"
                />
              </div>
              <div className="col-span-12 sm:col-span-5">
                <Textinput
                  name={"longitude"}
                  type={"number"}
                  register={register}
                  label={"longitude"}
                  error={errors.longitude}
                  placeholder="Enter Your Property longitude"
                  step="0.0000001"
                />
              </div>
              <div className="col-span-12 sm:col-span-5">
                <Textinput
                  name={"latitude"}
                  type={"number"}
                  register={register}
                  label={"latitude"}
                  error={errors.latitude}
                  placeholder="Enter Your Property latitude"
                  step="0.0000001"
                />
              </div>
              <div className="col-span-12 sm:col-span-2 flex flex-col justify-end ">
                <button className="btn btn-primary py-2" type="button" onClick={handleGetLocation}>
                  Current Location
                </button>
              </div>
              <div className="col-span-12 ">
                <Textarea
                  name={"description"}
                  register={register}
                  label={"Description"}
                  error={errors.description}
                  placeholder="Enter Your Property Description"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};
export default AddProperty;
