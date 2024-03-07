import BackButton from "../../../components/ui/BackButton";
import Card from "../../../components/ui/Card";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { features } from "../../../constant/contants";
import { Checkbox } from "primereact/checkbox";
import { toast } from "react-toastify";
import axios from "axios";
import { getVehicleInfo, insertVehicleFeatures } from "../../../constant/apiRoutes";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
// import { off } from "video.js/dist/types/utils/events";
const schema = yup.object({});

const AddAmenities = () => {
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });
  const [renderAmneties, setRenderAmneties] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.post(
          getVehicleInfo,
          { id },
          { headers: { Authorization: token } }
        );
        if (data.error === false) {
          reset(data.data.vehicle[0].features);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
    handleAmnetiesLength();
  }, [token, id, reset]);

  const onSubmit = async (data) => {
    try {
      features.forEach((item) => {
        if (data[item.field] === undefined) {
          data[item.field] = false;
        }
      });
      const { data: res } = await axios.post(
        insertVehicleFeatures,
        { id, ...data },
        { headers: { Authorization: token } }
      );
      if (res.error === false) {
        toast.success(res.message);
        navigate("/dashboard/seller/vehicle");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAmnetiesLength = () => {
    if (renderAmneties.length < 18) {
      setRenderAmneties(features.slice(0, 18));
    } else {
      setRenderAmneties(features.slice(0, features.length));
    }
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <Card title={"Select Features"} headerslot={<BackButton />}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-12 gap-2 md:gap-4 mt-4"
          >
            {renderAmneties.map((item) => (
              <motion.div
                variants={item}
                className="col-span-12 xs:col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2 flex items-center text-xs md:text-xm xl:text-base truncate"
                key={item.id}
              >
                <Controller
                  name={item.field}
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
                      <label htmlFor={field.name}>{item.label}</label>
                    </div>
                  )}
                />
              </motion.div>
            ))}
            {renderAmneties.length < 19 && (
              <button
                className="w-[150px] text-sm text-blue-500 flex items-center gap-2 self-end"
                onClick={() => handleAmnetiesLength()}
              >
                See more
                <Icon className="w-4 h-4" icon="iconoir:nav-arrow-down" />
              </button>
            )}
          </motion.div>
          <div className="mt-4 flex justify-end">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};
export default AddAmenities;
