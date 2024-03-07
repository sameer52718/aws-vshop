import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import verifyImg from "../../../assets/images/all-img/approved.png";
import PropTypes from "prop-types";
import { vehicleThumbnailRoute } from "../../../constant/apiRoutes";
import moment from "moment";
const VehicleCard = ({ data, className }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`relative w-[100%] bg-white py-2 sm:py-0 sm:px-4 rounded-md flex flex-col sm:justify-center ${className}`}
    >
      {Math.round(Math.random()) > 0.5 && (
        <div className="absolute top-2 right-2 flex items-center bg-black-100 text-[10px] text-main rounded-md px-2 py-[2px] gap-1 font-medium">
          <img className="w-3 h-3" src={verifyImg} alt="verified logo" />
          Verified
        </div>
      )}
      <div className="grid grid-cols-1 w-[100%]">
        <div
          onClick={() => navigate(`/vehicle/${data?.id}`)}
          className="w-full col-span-1 lg:grid-cols-2 cursor-pointer"
        >
          <img
            className="w-full h-[100px] sm:h-[150px] lg:h-[200px] object-contain  rounded-md"
            src={
              data?.thumbnail
                ? `${vehicleThumbnailRoute}/${data?.thumbnail}`
                : data?.thumbnail
            }
            alt="car photo"
          />
        </div>
        <div className="flex flex-col pt-2 gap-1 sm:gap-0 items-center text-black-500">
          <p className="text-[11px] sm:text-sm lg:text-base xl:text-lg font-semibold text-black-800 sm:mt-2">
            {new Intl.NumberFormat("ur-PK", {
              style: "currency",
              currency: "PKR",
            }).format(data?.price)}
          </p>
          <h3 className="text-xs sm:text-base lg:text-xl font-bold">
            {`${data?.make} ${data?.model}`}
          </h3>
          <div className="w-[100%] flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-2 sm:gap-4 lg:gap-6 text-[9px] sm:text-xs lg:text-sm sm:mt-2 sm:px-3">
            <p className="flex items-center justify-center flex-grow-1 gap-1">
              <Icon className="w-2 sm:w-3 h-2 sm:h-3" icon="bi:calendar" />{" "}
              {data?.year}
            </p>
            <p className="flex items-center justify-center flex-grow-1 gap-1">
              <Icon className="w-4 sm:w-5 h-4 sm:h-5" icon="carbon:meter-alt" />{" "}
              <span className=" truncate">
                {" "}
                {new Intl.NumberFormat("en-PK", {
                  style: "unit",
                  unit: "kilometer",
                }).format(data?.mileage)}
              </span>
            </p>
            <p className="flex items-center justify-center flex-grow-1 gap-1">
              <Icon className="w-3 sm:w-4 h-3 sm:h-4" icon="mdi:color" />{" "}
              <span className="w-[80%] truncate">{data?.color}</span>
            </p>
            {/* <p className="flex items-center justify-center flex-grow-1 gap-1">
              <Icon icon="mdi:car-door" /> {data?.door}
            </p> */}
          </div>
          <p className="flex items-start sm:mt-2 text-[9px] sm:text-xs lg:text-sm">
            <Icon
              className="w-3 sm:w-4  h-3 sm:h-4 "
              icon="ion:location-outline"
            />{" "}
            <span className="w-full text-ellipsis line-clamp-1 sm:line-clamp-none sm:text-clip xl:text-ellipsis xl:line-clamp-1">{`${data?.country}, ${data?.state}, ${data?.city}`}</span>
          </p>
          <p className="flex items-center gap-1 sm:mt-2 text-[10px] sm:text-xs lg:text-sm">
            <span className="font-medium">Uploaded:</span>{" "}
            <span className=" text-ellipsis line-clamp-1">
              {`${moment(data?.time).fromNow(true)} ago`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;

VehicleCard.propTypes = {
  data: PropTypes.object.isRequired,
};
