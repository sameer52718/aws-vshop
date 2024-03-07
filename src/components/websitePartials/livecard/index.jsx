import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Thumbnail from "../../../assets/images/vectors/streaming-thumbnail.png"
import { SellerProfile, streamingThumbnail } from "../../../constant/apiRoutes";
import { useDispatch } from "react-redux";
import { setConfig } from "../../../store/streaming/slice";
import { Constants } from "@videosdk.live/react-sdk";
import Avatar from "../../../assets/images/avatar/avatar.png"

const LiveCard = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
const handleClick = () => {
  dispatch(setConfig({
    meetingId:data?.meeting_id,
    micEnabled: true,
    webcamEnabled: true,
    name: `Guest`,
    mode: Constants.modes.CONFERENCE,
  }))
  navigate(`/sunday-bazar/${data?.meeting_id}`)
}


const handleProfileClick = (e,type) => {
  e.stopPropagation()
  switch (type) {
    case 2:
      navigate(`/seller/${data?.url}`)
      break;
    case 3:
      navigate(`/reseller/${data?.url}`)
      break;
    default:
      break;
  }
}

  return (
    <div className="h-[160px] lg:h-[180px]" onClick={handleClick}>
      <div className="sm:w-[98%] rounded-xl  shadow-md">
        <div className="flex flex-col w-full rounded-xl bg-gray-100 h-full ">
          <div className="relative rounded-xl lg:h-[180px] h-[160px] w-full">
            <img
              src={
                data?.thumbnail
                  ? `${streamingThumbnail}/${data?.thumbnail}`
                  : Thumbnail
              }
              alt={data?.title}
              className="w-full h-full rounded-xl object-cover shadow-md"
            />

            {/* <div className=" absolute top-2 left-2 text-[10px] text-white flex items-center gap-1  bg-red-500 rounded-xl px-2 py-1">
              <Icon
                icon="carbon:dot-mark"
                color="white"
                hFlip={true}
                vFlip={true}
              />

              <p className="font-bold">Live</p>
            </div> */}

            <div className="absolute bottom-0 text-black rounded-2xl w-[100%] bg-gradient-to-t from-black-500 ">
              <div className="px-5 py-3 w-full">
                <div className="flex  justify-between flex-wrap  w-full  ">
                  <div className="flex gap-2 items-end ">
                    <img
                      src={
                        data?.profile
                          ? `${SellerProfile}/${data?.profile}`
                          : Avatar
                      }
                      alt={`${data?.name} Profile`}
                      className="w-10 h-10 object-cover rounded-full"
                      onClick={(e) => handleProfileClick(e, data.type)}
                    />

                    <div className="text-left ">
                      <h1 className="font-bold  text-[12px] flex flex-nowrap  text-white">
                        {data?.name}
                      </h1>
                      <p className="text-[10px] text-white ">
                        {data?.shop_name}
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex justify-center items-center text-white  ">
                    <Icon
                      width={16}
                      height={16}
                      icon="ph:eye"
                      color="white"
                      hFlip={true}
                      vFlip={true}
                    />
                    <button className=" px-2  rounded-md py-1 text-[12px] flex items-center gap-1 ">
                      1.3K Watching
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LiveCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LiveCard;
