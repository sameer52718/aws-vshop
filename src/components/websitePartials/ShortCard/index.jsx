import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const index = ({ imgBg, profileImg, name, follower, className }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${className} relative group overflow-hidden w-full  rounded-md shadow-sm group`}
    >
      {/* <div className="hidden group-hover:block z-30 bg-black-500 bg-opacity-30 h-full w-full absolute">
        <div className="flex justify-center items-center h-full">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-50 flex justify-center items-center">
            <Icon icon={"ion:expand-outline"} width={16} />
          </div>
        </div>
      </div> */}
      <div className="h-full">
        <div className="h-[100%] w-full ">
          {/* <ReactPlayer
            className={"video-wrapper relative"}
            url={"http://video.elliptical.website/video/1.mp4"}
            width={"100%"}
            height={"100%"}
            playIcon={
              <button className="absolute  bg-black-500 p-2 rounded-full bg-opacity-40">
                <Icon icon={"gravity-ui:play"} width={28} color="white" />
              </button>
            }
            playing={true}
            muted
            loop={true}
            onError={(e) => console.error(e)}
          /> */}
          <img src={imgBg} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="absolute bottom-0 text-black rounded-md w-[100%] bg-gradient-to-t from-black-500">
          <div className="px-[6px] sm:px-2 py-1 sm:py-3 w-full flex flex-col">
            <div className="flex justify-between flex-wrap w-full items-center relative">
              <div
                onClick={() => navigate("/short")}
                className="flex gap-2 items-end cursor-pointer"
              >
                <img
                  src={profileImg}
                  alt="profile image"
                  className="w-7 sm:w-8 h-7 sm:h-8 object-cover rounded-full "
                />

                <div className="text-left">
                  <p className="font-medium lg:font-semibold text-[10px] sm:text-xs flex flex-nowrap text-white">
                    {name}
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-white ">
                    {follower}K Followers
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 flex items-center gap-1 p-1 bg-red-500 bg-opacity-80 text-[10px] text-white rounded-full"
              >
                <Icon className="w-2 lg:w-3 h-2 lg:h-3" icon="fa-solid:plus" />
              </button>
              {/* <div>
                <button
                  type="button"
                  className="flex items-center gap-1 p-1 bg-red-500 bg-opacity-80 text-[10px] text-white rounded-full"
                >
                  <Icon
                    className="w-2 lg:w-3 h-2 lg:h-3"
                    icon="fa-solid:plus"
                  />
                </button>
              </div> */}
            </div>
            <div className="text-left pt-[6px] sm:pt-2">
              <p className="font-medium text-[9px] sm:text-[10px] flex text-white overflow-ellipsis line-clamp-2 ">
                Hi folks see our product by reels and hurry up buy it now
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
