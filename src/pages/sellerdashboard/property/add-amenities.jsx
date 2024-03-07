import Textinput from "../../../components/ui/Textinput";
import Select from "../../../components/ui/Select";
import BackButton from "../../../components/ui/BackButton";
import Card from "../../../components/ui/Card";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { numberInputs, propertyInputText, propertyCheckbox, selectBoxes } from "../../../constant/contants";
import { Checkbox } from "primereact/checkbox";
import { toast } from "react-toastify";
import axios from "axios";
import { getSellerPropertyinfo, insertSellerPropertyAmenities } from "../../../constant/apiRoutes";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

var schemaobject = {};

selectBoxes.forEach((item) => {
  schemaobject[item.key] = yup.string();
});

numberInputs.forEach((item) => {
  schemaobject[item.key] = yup
    .number()
    .typeError(`${item.name} Must be a Number`)
    .positive(`${item.name} Must be a Positive Number`);
});

propertyInputText.forEach((item) => {
  schemaobject[item.key] = yup.string();
});

const schema = yup.object(schemaobject);

const AddAmenities = () => {
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    reset,
    register,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.post(getSellerPropertyinfo, { id }, { headers: { Authorization: token } });
        if (data.error === false) {
          const amenities = data.data.property[0].amenities;
          const resetData = {};
          amenities.forEach((item) => {
            resetData[item.name] = item.value;
          });
          reset(resetData);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, [token, id, reset]);

  const onSubmit = async (data) => {
    try {
      propertyCheckbox.forEach((item) => {
        if (data[item.key] === undefined) {
          data[item.key] = false;
        }
      });
      selectBoxes.forEach((item) => {
        if (data[item.key] === "") {
          data[item.key] = "0";
        }
      });
      const { data: res } = await axios.post(
        insertSellerPropertyAmenities,
        { id, ...data },
        { headers: { Authorization: token } }
      );
      if (res.error === false) {
        toast.success(res.message);
        navigate("/dashboard/seller/property");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Card title={"Select Amenities"} headerslot={<BackButton />}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {selectBoxes.map((item, index) => (
              <div className="p-2" key={index}>
                <Select
                  label={item.name}
                  placeholder={`Select ${item.name}`}
                  name={item.key}
                  register={register}
                  error={errors[item.key]}
                  options={item.options}
                />
              </div>
            ))}
            {numberInputs.map((item, index) => (
              <div className="p-2" key={index}>
                <Textinput
                  label={item.name}
                  placeholder={`Number of ${item.name}`}
                  name={item.key}
                  register={register}
                  error={errors[item.key]}
                  type={item.type}
                />
              </div>
            ))}
            {propertyInputText.map((item, index) => (
              <div className="p-2 " key={index}>
                <Textinput
                  label={item.name}
                  placeholder={`Select ${item.name}`}
                  name={item.key}
                  register={register}
                  error={errors[item.key]}
                  type={item.type}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-2 md:gap-4 mt-4">
            {propertyCheckbox.map((item, index) => (
              <div
                className="col-span-12 xs:col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2 flex items-center text-xs md:text-xm xl:text-base truncate"
                key={index}
              >
                <Controller
                  name={item.key}
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center md:gap-1">
                      <Checkbox
                        inputId={field.name}
                        checked={field.value}
                        inputRef={field.ref}
                        onChange={(e) => field.onChange(e.checked)}
                        pt={{
                          input: {
                            className: "w-4 h-4 md:w-5 md:h-5 self-center",
                          },
                        }}
                      />
                      <label htmlFor={field.name}>{item.name}</label>
                    </div>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};
export default AddAmenities;
