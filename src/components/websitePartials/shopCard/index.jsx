import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";
import Badge from "../../../assets/images/badges/verified.png";
import PlaceholderLogo from "@/assets/images/vectors/shop-thumbnail.jpeg";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import { logoRoute } from "../../../constant/apiRoutes";

const ShopCard = ({ data, allData, handleFollow }) => {
  return (
    <div className="relative">
      {data?.verified === 1 && (
        <div className="absolute top-4 right-4">
          <img src={Badge} alt="badge" className="w-28" />
        </div>
      )}
      <button
        className={`w-[70px] xs:w-[80px] font-normal tracking-wide text-[8px] xs:text-[10px] lg:text-xs absolute top-2 md:top-4 right-2 md:right-4 inline-flex items-center justify-center rounded-md text-white px-2 py-1 ${
          data?.follow
            ? "bg-green-500 md:w-[90px] gap-[2px]"
            : "bg-main md:w-[80px] gap-1"
        }`}
        type="button"
        onClick={() =>
          handleFollow({
            url: data.url,
            data: allData,
            type: 2,
            follow: !data?.follow,
          })
        }
      >
        {data?.follow ? (
          <Icon className="w-3 md:w-5 h-3 md:h-5 " icon="dashicons:yes" />
        ) : (
          <Icon className="w-2 lg:w-3 h-2 lg:h-3" icon="fa-solid:plus" />
        )}
        {data?.follow ? "Followed" : "Follow"}
      </button>
      <div className="bg-white rounded-lg p-2 xs:p-4 gap-2 items-center grid grid-cols-12">
        <div className="col-span-12 md:col-span-4 md:p-4">
          <img
            src={data?.logo ? `${logoRoute}/${data.logo}` : PlaceholderLogo}
            alt="Shop"
            className="h-[80px] sm:h-[120px] md:h-[130px] w-full object-contain"
          />
        </div>
        <div className="col-span-12 md:col-span-8 flex flex-col gap-1 xs:gap-[10px]">
          <h6 className="text-sm xs:text-base lg:text-lg xl:text-xl overflow-ellipsis line-clamp-1">
            {data?.name}
          </h6>
          <div className="flex gap-2">
            <Rating
              value={data?.rating}
              readOnly
              cancel={false}
              className="flex gap-1"
              size={6}
              pt={{
                onIcon: { className: "w-5 h-5" },
                offIcon: { className: "w-5 h-5" },
              }}
            />
            {/* <span className="text-gray-400 text-xs">(5 reviews)</span> */}
          </div>
          <p className="text-ellipsis line-clamp-2 text-[9px] xs:text-[10px] lg:text-xs text-gray-500">
            Excite and engage customers as an exclusive seller on VIEWNSHOP – a
            dynamic video multi-vendor ecommerce platform.
          </p>
          <div className="flex justify-between">
            <Link
              to={`/seller/${data?.url}`}
              className="flex items-center gap-2 self-start text-[10px] xs:text-xs lg:text-sm transition-all ease-in hover:ml-4"
            >
              View Seller <Icon icon={"teenyicons:arrow-right-outline"} />{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;

ShopCard.propTypes = {
  data: PropTypes.object.isRequired,
  allData: PropTypes.array.isRequired,
  handleFollow: PropTypes.func.isRequired,
};
