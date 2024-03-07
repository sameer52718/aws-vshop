import BackButton from "@/components/ui/BackButton";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bodyCondition, bodyType, doors } from "@/constant/contants";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getVehicleInfo } from "@/constant/apiRoutes";
import { fetchState } from "@/store/state/slice";
import { fetchCity } from "@/store/city/slice";
import DashboardLoader from "../../../components/DashboardLoader";
import { fetchModel } from "../../../store/model/slice";
import { sellerVehicleEdit } from "../../../constant/apiRoutes";

const schema = yup.object({
  make_id: yup.string().required("Vehicle Make is required"),
  model_id: yup.string().required("Vehicle Model is required"),
  year: yup
    .string()
    .test("valid-model-year", "Vehicle Model Year cannot be in the future", function (value) {
      const currentYear = new Date().getFullYear();
      if (!value) return true;
      const currentValue = new Date(value).getFullYear();
      return currentValue <= currentYear;
    })
    .required("Vehicle Model Year is required"),
  body_type_id: yup.string().required("Body Type is required"),
  price: yup
    .number()
    .typeError("Price Must be a Number")
    .positive("Price Must be a Positive Number")
    .required("Vehicle price is required"),
  mileage: yup
    .number()
    .typeError("Mileage Must be a Number")
    .positive("Mileage Must be a Positive Number")
    .required("Vehicle Mileage is required"),
  color: yup.string().required("Vehicle Color is required"),
  door: yup.string().required("Vehicle Doors is required"),
  country_id: yup.string().required("Vehicle Country is required"),
  state_id: yup.string().required("Vehicle State is required"),
  city_id: yup.string().required("Vehicle City is required"),
  insured: yup.string().default("false"),
  description: yup.string().required("Vehicle description is required"),
});

const EditVehicle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { options: country } = useSelector((state) => state.country);
  const { options: state, isLoading: stateLoading } = useSelector((state) => state.state);
  const { options: city, isLoading: cityLoading } = useSelector((state) => state.city);
  const { options: make } = useSelector((state) => state.make);
  const { options: model, isLoading: modelLoading } = useSelector((state) => state.model);
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  useEffect(() => {
    const getData = async () => {
      try {
        setIsloading(true);
        const { data } = await axios.post(getVehicleInfo, { id }, { headers: { Authorization: token } });
        if (data.error === false) {
          const res = data.data.vehicle[0];
          delete res.features;
          setData({...res, year: new Date(`01-01-${res.year}`)});
          dispatch(fetchState(res.country_id));
          dispatch(fetchCity(res.state_id));
          dispatch(fetchModel(res.make_id));
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, [token, id, dispatch]);

  useEffect(() => {
    if (!stateLoading && !cityLoading && !modelLoading && Object.keys(data).length > 0) {
      reset(data);
      setIsloading(false);
    }
  }, [stateLoading, cityLoading, data, reset, modelLoading]);

  const onSubmit = async (data) => {
    try {
      const body = {
        ...data,
      };
      body.year = new Date(data.year).getFullYear();
      body.insured = Boolean(data.insured);
      body.id = id
      const {data:res} = await axios.post(sellerVehicleEdit,body,{headers:{Authorization:token}})
      if (res.error === false) {
        toast.success(res?.message)
        navigate(-1)
      }else{
        toast.error(res?.message)
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <DashboardLoader />
      ) : (
        <Card title={"Edit Vehicle"} headerslot={<BackButton />}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-6">
                <Select
                  name={"make_id"}
                  register={register}
                  label={"Make"}
                  error={errors.make_id}
                  placeholder="Select Your Vehicle Make"
                  options={make}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Select
                  name={"model_id"}
                  register={register}
                  label={"Model"}
                  error={errors.model_id}
                  placeholder="Select Your Vehicle Model"
                  options={model}
                  disabled={model.length === 0}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="form-label" htmlFor={field.name}>
                        Model Year
                      </label>
                      <Calendar
                        inputId={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        view="year"
                        dateFormat="yy"
                        placeholder="Select Vehicle Model Year"
                      />
                      {errors.year && (
                        <div className={` mt-2 text-danger-500 block text-sm`}>{errors.year.message}</div>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Select
                  name={"body_type_id"}
                  register={register}
                  label={"Body Type"}
                  error={errors.body_type_id}
                  placeholder="Select Your Vehicle Body Type"
                  options={bodyType}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Textinput
                  name={"price"}
                  type={"number"}
                  register={register}
                  label={"Price"}
                  error={errors.price}
                  placeholder="Enter Your Vehicle Price"
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Textinput
                  name={"mileage"}
                  type={"number"}
                  register={register}
                  label={"Mileage"}
                  error={errors.mileage}
                  placeholder="Enter Your Vehicle Mileage"
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Textinput
                  name={"color"}
                  type={"text"}
                  register={register}
                  label={"Color"}
                  error={errors.color}
                  placeholder="Enter Your Vehicle Color"
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Select
                  name={"door"}
                  register={register}
                  label={"Doors"}
                  error={errors.door}
                  placeholder="Select Your Vehicle Doors"
                  options={doors}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Select
                  name={"country_id"}
                  register={register}
                  label={"Country"}
                  error={errors.country_id}
                  placeholder="Select Country Where Vehicle Exist"
                  options={country}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Select
                  name={"state_id"}
                  register={register}
                  label={"State"}
                  error={errors.state_id}
                  placeholder="Select State Where Vehicle Exist"
                  options={state}
                  disabled={state.length === 0}
                />
              </div>

              <div className="col-span-12 lg:col-span-6">
                <Select
                  name={"city_id"}
                  register={register}
                  label={"City"}
                  error={errors.city_id}
                  placeholder="Select City Where Vehicle Exist"
                  options={city}
                  disabled={city.length === 0}
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Select
                  name={"condition"}
                  register={register}
                  label={"Condition"}
                  error={errors.condition}
                  placeholder="Select your Vehicle Condition"
                  options={bodyCondition}
                />
              </div>
              <div className="col-span-12 ">
                <Textarea
                  name={"description"}
                  register={register}
                  label={"Description"}
                  error={errors.description}
                  placeholder="Enter Your Product Description"
                />
              </div>
              <div className="col-span-12">
                <Controller
                  name="insured"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Checkbox
                        inputId={field.name}
                        checked={field.value}
                        inputRef={field.ref}
                        onChange={(e) => field.onChange(e.checked)}
                      />
                      <label htmlFor={field.name} className="form-label inline ml-4">
                        is Your Car insured
                      </label>
                    </>
                  )}
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

export default EditVehicle;
