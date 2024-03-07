import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import img1 from "../../../assets/images/shorts/1.jpg";
import img2 from "../../../assets/images/shorts/2.webp";
import img3 from "../../../assets/images/shorts/3.jfif";
import img4 from "../../../assets/images/shorts/4.jfif";
import img5 from "../../../assets/images/shorts/5.jfif";
import img6 from "../../../assets/images/shorts/6.jfif";
import ShortProfile1 from "../../../assets/images/avatar/1.jpg";
import ShortProfile2 from "../../../assets/images/avatar/2.jpg";
import ShortProfile3 from "../../../assets/images/avatar/3.jpg";
import ShortProfile4 from "../../../assets/images/avatar/4.jpg";
import ShortProfile5 from "../../../assets/images/avatar/5.jpg";
import { Icon } from "@iconify/react";
import useWidth from "../../../hooks/useWidth";
import ReactPlayer from "react-player";
import { useState } from "react";

const data = [
  {
    name: "Sameer Shaikh",
    imageProfile: ShortProfile1,
    follower: 234.4,
    video: "https://video.elliptical.website/video/1.mp4",
  },
  {
    name: "Khadim Hussain",
    imageProfile: ShortProfile2,
    follower: 421.2,
    video: "https://video.elliptical.website/video/2.mp4",
  },
  {
    name: "Yazdan Shaikh",
    imageProfile: ShortProfile3,
    follower: 514.3,
    video: "https://video.elliptical.website/video/3.mp4",
  },
  {
    name: "Bilal Ajmery",
    imageProfile: ShortProfile4,
    follower: 865.1,
    video: "https://video.elliptical.website/video/4.mp4",
  },
  {
    name: "Haseeb Ali",
    imageProfile: ShortProfile5,
    follower: 543.1,
    video: "https://video.elliptical.website/video/5.mp4",
  },
  {
    name: "Huzaifa Ali",
    imageProfile: ShortProfile1,
    follower: 214.1,
    video: "https://video.elliptical.website/video/6.mp4",
  },
  {
    name: "Nafay Ali",
    imageProfile: ShortProfile2,
    follower: 654.1,
    video: "https://video.elliptical.website/video/7.mp4",
  },
  {
    name: "Hashi Bhai",
    imageProfile: ShortProfile3,
    follower: 865.1,
    video: "https://video.elliptical.website/video/8.mp4",
  },
];

const imgData = [img1, img2, img3, img4, img5, img6];

const ShortListing = () => {
  const {
    width,
    breakpoints: { md, sm },
  } = useWidth();

  const [seeMore, setSeeMore] = useState(false);

  return (
    <div className="container my-6 flex flex-col gap-10">
      {/* <Breadcrumbs currentLink="Short" /> */}

      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{ clickable: true }}
        modules={[Mousewheel]}
        className="w-[100%] h-[520px]"
      >
        {data.map((item, index) => (
          <SwiperSlide
            className="relative border border-black-400 xs:h-[550px] text-center rounded-md !flex justify-center items-start py-3 px-3 sm:py-5"
            key={index}
          >
            <div className="relative group overflow-hidden w-full xs:w-[300px] h-full bg-secondary-200 rounded-md shadow-sm group cursor-pointer">
              {/* <div className="hidden group-hover:block z-30 bg-white md:bg-black-500 bg-opacity-30 md:bg-opacity-30 h-full w-full absolute">
                <div className="flex justify-center items-center h-full">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-50 flex justify-center items-center">
                    <Icon icon={"ion:expand-outline"} width={16} />
                  </div>
                </div>
              </div> */}
              <div className="h-full">
                <div className="h-[100%] w-full">
                  <ReactPlayer
                    className={"video-wrapper relative"}
                    url={item.video}
                    width={"100%"}
                    height={"100%"}
                    playIcon={
                      <button className="absolute  bg-black-500 p-2 rounded-full bg-opacity-40">
                        <Icon
                          icon={"gravity-ui:play"}
                          width={28}
                          color="white"
                        />
                      </button>
                    }
                    playing={true}
                    muted
                    loop={true}
                    onError={(e) => console.error(e)}
                    // light={
                    //   <img
                    //     src={
                    //       data?.thumbnail
                    //         ? `${productThumbnailRoute}/${data?.thumbnail}`
                    //         : Thumbnail
                    //     }
                    //     alt="placeholder"
                    //     className="h-full w-full object-cover "
                    //   />
                    // }
                  />
                </div>
                {/* <div className="absolute bottom-0 text-black rounded-2xl w-[100%] bg-gradient-to-t from-black-500 ">
                  <div className="px-5 py-3 w-full">
                    <div className="flex  justify-between flex-wrap  w-full items-center  ">
                      <div className="flex gap-2 items-end ">
                        <img
                          src="https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg"
                          alt="...!"
                          className="w-8 h-8 lg:w-10 lg:h-10 object-cover rounded-full "
                        />

                        <div className="text-left ">
                          <p className="font-bold  text-[12px] flex flex-nowrap  text-white">
                            Fall Guys
                          </p>
                          <p className="text-[10px] text-white ">
                            257.2K Followers{" "}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="flex items-center gap-1 py-[3px] px-2 bg-red-500 bg-opacity-80 text-xs text-white rounded-sm"
                        >
                          Follow
                        </button>
                      </div>
                    </div>
                    <div className="text-left pt-4">
                      <p className="font-bold  text-[12px] flex flex-nowrap  text-white">
                        Lorem ipsum dolor, sit amet consectetur adipisicing ...
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="absolute bottom-3 sm:static text-black w-[93%] h-full xs:w-[300px] px-[10px] pb-[10px] rounded-md md:w-[340px] sm:pl-8 bg-gradient-to-t from-black-500 flex flex-col justify-end sm:justify-start sm:bg-none">
              <div className=" py-3 w-full ">
                <div className="flex justify-between flex-wrap gap-2 w-full items-center relative">
                  <div className="flex gap-2 items-end">
                    <img
                      src={item.imageProfile}
                      alt="...!"
                      className="w-8 h-8 lg:w-10 lg:h-10 object-cover rounded-full "
                    />

                    <div className="text-left text-white sm:text-black-500">
                      <p className="font-bold text-[12px] flex flex-nowrap ">
                        {item.name}
                      </p>
                      <p className="text-[10px]  ">
                        {item.follower}K Followers{" "}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 flex items-center gap-1 p-1 bg-red-500 bg-opacity-80 text-[10px] text-white rounded-full"
                  >
                    <Icon
                      className="w-2 lg:w-3 h-2 lg:h-3"
                      icon="fa-solid:plus"
                    />
                  </button>
                  {/* <div>
                    <button
                      type="button"
                      className="flex items-center gap-1 py-[3px] px-2 bg-red-500 bg-opacity-80 text-xs text-white rounded-sm"
                    >
                      Follow
                    </button>
                  </div> */}
                </div>
                <div className="flex flex-col gap-2 text-left pt-2 sm:pt-4">
                  <div>
                    {" "}
                    <p
                      className={`font-medium text-[10px] flex flex-nowrap text-white sm:text-black-500 ${
                        width < 640 && !seeMore ? "truncate" : ""
                      } `}
                    >
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English.
                    </p>
                    {width < 640 && (
                      <button
                        onClick={() => setSeeMore(!seeMore)}
                        className="self-start text-white text-[10px]"
                      >
                        see {seeMore ? "less" : "more"}...
                      </button>
                    )}{" "}
                  </div>
                  {/* <div>
                    {" "}
                    <p
                      className={`font-medium text-[10px] flex flex-nowrap text-white sm:text-black-500 ${
                        width < 640 && !seeMore ? "truncate" : ""
                      } `}
                    >
                      Many desktop publishing packages and web page editors now
                      use Lorem Ipsum as their default model text.
                    </p>
                    {width < 640 && (
                      <button
                        onClick={() => setSeeMore(!seeMore)}
                        className="self-start text-white text-[10px]"
                      >
                        see more...
                      </button>
                    )}{" "}
                  </div> */}
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3 sm:mb-4 text-white sm:text-black-500">
                <button className="bg-white sm:bg-black-500 bg-opacity-20 sm:bg-opacity-20 p-[6px] sm:p-2 rounded-full">
                  <Icon className="w-3 h-3 sm:w-5 sm:h-5" icon="bxs:like" />
                </button>
                <button className="bg-white sm:bg-black-500 bg-opacity-20 sm:bg-opacity-20 p-[6px] sm:p-2 rounded-full">
                  <Icon className="w-3 h-3 sm:w-5 sm:h-5" icon="bxs:dislike" />
                </button>
                <button className="bg-white sm:bg-black-500 bg-opacity-20 sm:bg-opacity-20 p-[6px] sm:p-2 rounded-full">
                  <Icon className="w-3 h-3 sm:w-5 sm:h-5" icon="bxs:comment" />
                </button>
                <button className="bg-white sm:bg-black-500 bg-opacity-20 sm:bg-opacity-20 p-[6px] sm:p-2 rounded-full">
                  <Icon
                    className="w-3 h-3 sm:w-5 sm:h-5"
                    icon="majesticons:share"
                  />
                </button>
              </div>
              <div>
                <Swiper
                  slidesPerView={width < sm ? 5 : width < md ? 4 : 5}
                  spaceBetween={15}
                  pagination={{
                    clickable: true,
                  }}
                  className="h-[45px] mx-5"
                >
                  {imgData.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      className="w-[60px] sm:w-[80px] h-[100%] rounded-lg"
                    >
                      <img
                        className="w-[100%] h-[100%] rounded-lg object-cover"
                        src={item}
                        alt="product image"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            {/* <video
              autoPlay
              loop
              muted
              className="w-[25%] h-full object-cover rounded-md "
            >
              <source src={item} type="video/mp4" />
            </video> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShortListing;
