/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import verifyImg from "../../../assets/images/all-img/approved.png";
import { AreaUnit, propertyPurpose } from "../../../constant/contants";
import Thumbnail from "../../../assets/images/vectors/thumbnail.png";
import moment from "moment";
import {
  propertyThumbnailRoute,
  propertyVideoRoute,
} from "../../../constant/apiRoutes";
import ReactPlayer from "react-player";
import { Icon } from "@iconify/react";
import useWidth from "../../../hooks/useWidth";

const PropertyCard = ({
  data,
  imgClass,
  addressClass,
  className,
  cardType,
}) => {
  const navigate = useNavigate();
  const {
    width,
    breakpoints: { xs, lg, xl },
  } = useWidth();

  const Rupees = new Intl.NumberFormat("ur-PK", {
    style: "currency",
    currency: "PKR",
  });

  const genDescription = () => {
    const unit = AreaUnit.find(
      (item) => parseInt(item.id) === parseInt(data?.unit)
    );
    const purpose = propertyPurpose.find(
      (item) => parseInt(item.id) === parseInt(data?.purpose)
    );
    return `${data?.area} ${unit?.name} ${data?.subtype} for ${purpose?.name} in ${data?.city}, ${data?.state}, ${data?.country}`;
  };

  const handleError = (e) => {
    e.target.src = Thumbnail;
  };

  return (
    <div className={`relative p-2 xl:p-4 rounded-md ${className}`}>
      <div className="grid sm:gap-4 lg:gap-2 grid-cols-1 ">
        <div className="relative col-span-1 lg:grid-cols-2 cursor-pointer">
          <ReactPlayer
            className={`video-wrapper relative !rounded-md`}
            url={`${propertyVideoRoute}/${data?.video}`}
            width={"100%"}
            height={
              cardType === "home" &&
              (width >= xs
                ? "150px"
                : width >= lg
                ? "120px"
                : width >= xl
                ? "200px"
                : "100px")
            }
            playIcon={
              <button className="absolute  bg-black-500 p-2 rounded-full bg-opacity-40">
                <Icon icon={"gravity-ui:play"} width={28} color="white" />
              </button>
            }
            playing={true}
            muted
            loop={true}
            onError={(e) => console.error(e)}
            light={
              <img
                className={`w-full h-full object-cover rounded-md ${imgClass}`}
                src={`${propertyThumbnailRoute}/${data?.thumbnail}`}
                alt="property image"
                onError={handleError}
              />
            }
          />

          {Math.round(Math.random) > 0.5 && (
            <div className="absolute top-1 right-1 flex items-center bg-white text-[10px] text-main rounded-md px-2 py-[2px] gap-1 font-medium">
              <img className="w-3 h-3" src={verifyImg} alt="verify badge" />
              Verified
            </div>
          )}
        </div>
        <div className="relative flex flex-col mt-2">
          <span
            className={`badge text-[8px] sm:text-sm absolute -right-1 -top-1 flex items-center text-black-500 gap-1 before:w-1 before:h-1 before:mb[2px] before:bg-black-500 before:rounded-full`}
          >
            {data?.subtype}
          </span>
          <div
            className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-black-500 cursor-pointer"
            onClick={() => navigate(`/property/${data.id}`)}
          >
            {Rupees.format(data?.price)}
          </div>
          <div
            className={`lg:w-[80%] text-[9px] xs:text-xs text-gray-500 py-[6px] cursor-pointer overflow-ellipsis line-clamp-2 ${addressClass}`}
            onClick={() => navigate(`/property/${data.id}`)}
          >
            {genDescription()}
          </div>
          <div className="text-[9px] xs:text-xs xl:text-sm xs:my-2 text-black-500 font-medium">
            Added: {moment(data?.time).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
