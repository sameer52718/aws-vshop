/* eslint-disable react/prop-types */
import approvedImg from "../../../assets/images/all-img/approved.png";
import { Icon } from "@iconify/react";
import { AreaUnit, propertyPurpose } from "../../../constant/contants";
import { useNavigate } from "react-router-dom";
import Thumbnail from "../../../assets/images/vectors/thumbnail.png";
import moment from "moment";
import ReactPlayer from "react-player";
import {
  propertyThumbnailRoute,
  propertyVideoRoute,
} from "../../../constant/apiRoutes";
import useWidth from "../../../hooks/useWidth";
const PropertyLongCard = ({ data }) => {
  const navigate = useNavigate();
  const {
    width,
    breakpoints: { sm },
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
    <div className="col-span-1 bg-white rounded-md overflow-hidden sm:h-[270px]">
      <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2">
        <div className="col-span-1 lg:grid-cols-2 cursor-pointer">
          <ReactPlayer
            className={"video-wrapper relative"}
            url={`${propertyVideoRoute}/${data?.video}`}
            width={"100%"}
            height={width >= sm ? "270px" : "200px"}
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
                className="w-full h-full object-cover rounded-t-md sm:rounded-tr-none sm:rounded-l-md"
                src={`${propertyThumbnailRoute}/${data?.thumbnail}`}
                alt="property image"
                onError={handleError}
              />
            }
          />
        </div>
        <div className=" relative flex items-center p-2 xs:p-4 lg:!pl-0">
          <span
            className={`badge absolute right-2 top-2 flex items-center text-black-500 gap-1 before:w-1 before:h-1 before:mb[2px] before:bg-black-500 before:rounded-full`}
          >
            {data.subtype}
          </span>
          <div className=" flex flex-col gap-2">
            {Math.round(Math.random()) > 0.5 && (
              <p className="flex items-center gap-1 text-xs xs:text-sm lg:text-base  text-gray-400">
                <img
                  className="w-3 xs:w-4 lg:w-5"
                  src={approvedImg}
                  alt="verified badge"
                />
                Verified by ViewNShop
              </p>
            )}

            <div
              className="text-sm xs:lg lg:text-xl font-semibold text-black-500 cursor-pointer"
              onClick={() => navigate(`/property/${data.id}`)}
            >
              {Rupees.format(data?.price)}
            </div>
            <div
              className="w-[100%] text-[10px] xs:text-xs lg:text-sm text-black-500 cursor-pointer"
              onClick={() => navigate(`/property/${data.id}`)}
            >
              {genDescription()}
            </div>
            <div className="flex items-center gap-4 text-[10px] xs:text-xs lg:text-sm text-black-500 font-medium">
              <div className="flex flex-col gap-1">
                Bedrooms
                <span className="flex items-end gap-1">
                  <Icon
                    className="w-6 h-6 text-gray-500"
                    icon="cbi:roomsbedroom"
                  />{" "}
                  {data?.bedroom}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                Bathrooms
                <span className="flex items-end gap-1">
                  <Icon className="w-6 h-6 text-gray-500" icon="fa:shower" />{" "}
                  {data?.bathroom}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                Area
                <span className="flex items-end gap-1 truncate w-[100%]">
                  <Icon className="w-6 h-6 text-gray-500" icon="carbon:area" />{" "}
                  {`${data?.area} ${
                    AreaUnit.find(
                      (item) => parseInt(item.id) === parseInt(data?.unit)
                    )?.name
                  }`}
                </span>
              </div>
            </div>
            <div className="text-[10px] xs:text-xs lg:text-sm text-black-500 font-medium">
              Added: {moment(data?.time).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyLongCard;
