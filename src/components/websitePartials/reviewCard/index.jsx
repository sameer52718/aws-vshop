import moment from "moment";
import Avatar1 from "../../../assets/images/avatar/NoProfile.png";
import { Rating } from "primereact/rating";
import PropTypes from "prop-types";
import { imgUrl } from "../../../constant/apiRoutes";
const ReviewCard = ({ data }) => {
  return (
    <div className="relative col-span-12 lg:col-span-6 flex flex-col gap-4 bg-white rounded-md p-4 lg:p-10">
      <div className="flex flex-col justify-between ">
        <div className="flex gap-4 items-start">
          <img
            src={
              data?.profile?.profile
                ? `${imgUrl}${data?.profile?.profile}`
                : Avatar1
            }
            alt={`${data?.profile?.name} Profile`}
            className="w-8 xs:w-14 h-8 xs:h-14 rounded-full"
          />
          <div className="flex flex-col items-start">
            <p className="font-medium md:text-lg text-xs xs:text-sm">
              {data?.profile?.name}
            </p>
            <p className="text-xs  text-gray-400">
              Date: {moment(data?.time).format("DD/MM/YY")}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex">
            <Rating
              value={data?.rating}
              readOnly
              cancel={false}
              pt={{ onIcon: { className: "!text-yellow-400" } }}
            />
            <span className="ml-4 text-gray-400 text-xs ">
              ({Number(data?.rating).toFixed(1)})
            </span>
          </div>
        </div>
      </div>
      <p className="text-gray-400 md:text-sm text-[10px]">{data?.review}</p>
    </div>
  );
};

export default ReviewCard;

ReviewCard.propTypes = {
  data: PropTypes.object.isRequired,
};
