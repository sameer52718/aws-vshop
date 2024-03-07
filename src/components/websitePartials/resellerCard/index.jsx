import { Rating } from "primereact/rating";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Proptypes from "prop-types";
// import useWidth from "../../../hooks/useWidth";
import { resellerProfileRoute } from "../../../constant/apiRoutes";
import LoginModal from "../../../components/websitePartials/loginmodal";
import { useState } from "react";
import { useSelector } from "react-redux";
import PlaceholderLogo from "@/assets/images/vectors/reseller-avatar.png";

const ShopCard = ({ data, rounded, allData, handleFollow }) => {
  const { token, user, userType } = useSelector((state) => state.auth);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const handleHire = () => {
    if (token && user && parseInt(userType) === 1) {
      navigate(`reseller/${data.url}/hire`);
    } else {
      setActive(true);
    }
  };

  return (
    <div className="relative">
      <button
        className={`w-[70px] xs:w-[80px] font-normal tracking-wide text-[8px] xs:text-[10px] lg:text-xs inline-flex items-center justify-center rounded-md text-white px-2 py-1 ${
          data?.follow
            ? "bg-green-500 md:w-[90px] gap-[2px]"
            : "bg-main md:w-[80px] gap-1"
        } absolute right-2 md:right-4 top-2 md:top-4`}
        type="button"
        onClick={() =>
          handleFollow({
            url: data.url,
            data: allData,
            type: 3,
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
        <div className={`col-span-12 md:col-span-4 md:px-4`}>
          <img
            src={
              data?.profile
                ? `${resellerProfileRoute}/${data?.profile}`
                : PlaceholderLogo
            }
            alt="Shop"
            className={`w-full   ${
              rounded
                ? "h-[80px] md:h-[170px] rounded-md md:rounded-full object-contain"
                : "h-[80px] md:md:h-[200px] rounded-md object-contain"
            }`}
          />
        </div>
        <div className="col-span-12 md:col-span-8 flex flex-col gap-1 xs:gap-[10px]">
          <h6 className="text-sm xs:text-base lg:text-lg overflow-ellipsis line-clamp-1">{`${data?.first_name} ${data?.last_name}`}</h6>
          <Rating
            value={parseInt(data?.rating)}
            readOnly
            cancel={false}
            className="flex gap-1 text-xs"
            size={6}
          />
          {data?.about && (
            <p className="md:text-sm text-xs text-gray-500">{data?.about}</p>
          )}
          <Link
            to={`/reseller/${data?.url}`}
            className="flex items-center gap-2 self-start text-[10px] xs:text-xs lg:text-sm transition-all ease-in hover:ml-4"
          >
            View Profile <Icon icon={"teenyicons:arrow-right-outline"} />{" "}
          </Link>
          <button
            type="button"
            onClick={handleHire}
            className={`btn btn-primary w-max py-0 xs:py-1 pl-1 text-[10px] xs:text-xs lg:text-sm xs:pl-3 pr-2 xs:pr-4 flex items-center`}
          >
            <Icon
              icon={"fluent:ribbon-star-24-filled"}
              className="w-3 xs:w-5 mr-1"
            />{" "}
            Hire Me
          </button>
        </div>
      </div>
      <LoginModal active={active} handleClose={() => setActive(false)} />
    </div>
  );
};

export default ShopCard;

ShopCard.propTypes = {
  data: Proptypes.object.isRequired,
  rounded: Proptypes.bool,
  allData: Proptypes.array.isRequired,
  handleFollow: Proptypes.func.isRequired,
};
