import Loading from "@/components/Loading";
import VehicleCard from "@/components/websitePartials/vehiclecard";
import Breadcrumbs from "@/components/websitePartials/breadcrumb";

import {
  getVehicleDetail,
  logoRoute,
  vehicleFilesRoute,
} from "@/constant/apiRoutes";
import { getExtension, removeUnderscoreAndCapitalize } from "@/utils/function";
import { websiteRoutes } from "@/constant/routes";
import useWidth from "@/hooks/useWidth";
import profile from "@/assets/images/avatar/NoProfile.png";

import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

import axios from "axios";
import moment from "moment";
import ReactPlayer from "react-player";
import ReviewModal from "../../../components/websitePartials/reviewModal";
import { insertReview } from "../../../constant/apiRoutes";

const CarDetail = () => {
  const { id } = useParams();
  const { token ,userType} = useSelector((state) => state.auth);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [active,setActive] = useState(false)
  const [data, setData] = useState({
    related: [],
    vehicle: {},
  });

  const {
    width,
    breakpoints: { xs, sm, md, lg, xl },
  } = useWidth();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          getVehicleDetail,
          { id },
          { headers: { Authorization: token } }
        );
        if (data.error === false) {
          const { related, vehicle } = data.data;
          setData((prev) => ({ ...prev, vehicle: vehicle[0], related }));
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [id, token]);


  const handleSubmit = async (data) => {
    try {
      const { data: res } = await axios.post(
        insertReview,
        { ...data, content_type: 4, id },
        { headers: { Authorization: token } }
      );
      if (res.error === false) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-8">
          <Breadcrumbs currentLink="vehicle" />
          <div className="grid grid-cols-1 lg:grid-cols-12 xs:pt-10 bg-white mt-8 rounded-lg border">
            <div className="col-span-1 lg:col-span-12 flex flex-col md:flex-row md:items-center p-3 xs:p-4 sm:px-8 gap-2 h-[300px]  md:h-[280px] lg:h-[420px] lg:pb-10">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                direction={`${width < md ? "horizontal" : "vertical"}`}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-[100%] md:w-[75%] h-[200px] md:h-full"
              >
                {data.vehicle?.files?.map((item) => (
                  <SwiperSlide className="w-full h-full" key={item}>
                    {getExtension(item).toLowerCase() === "mp4" ? (
                      <ReactPlayer
                        url={`${vehicleFilesRoute}/${item}`}
                        width={"100%"}
                        height={"100%"}
                        loop={true}
                        playing={true}
                        playIcon={true}
                        onError={(e) => console.error(e)}
                        controls={true}
                      />
                    ) : (
                      <img
                        className="w-full h-full object-cover"
                        src={`${vehicleFilesRoute}/${item}`}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                direction={`${width < md ? "horizontal" : "vertical"}`}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={`${width < xs ? 2.3 : 3.5}`}
                centeredSlides={false}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-[100%] md:w-[25%] h-[100px] md:h-[100%] relative"
              >
                {data.vehicle?.files?.map((item) => (
                  <SwiperSlide className="w-full h-full" key={item}>
                    {getExtension(item).toLowerCase() === "mp4" ? (
                      <ReactPlayer
                        url={`${vehicleFilesRoute}/${item}`}
                        width={"100%"}
                        height={"100%"}
                        loop={true}
                        playing={true}
                        playIcon={true}
                        onError={(e) => console.error(e)}
                        controls={true}
                      />
                    ) : (
                      <img
                        className={`w-full h-full object-cover ${
                          thumbsSwiper
                            ? "bg-black-500 bg-opacity-90"
                            : "bg-opacity-100"
                        }`}
                        src={`${vehicleFilesRoute}/${item}`}
                      />
                    )}
                  </SwiperSlide>
                ))}
                <div
                  ref={navigationPrevRef}
                  className="absolute left-1 bottom-[2rem] xs:bottom-[3.5rem] md:top-1 md:left-[4rem] lg:left-[6rem] xl:left-[8.5rem] z-50 w-[25px] xs:w-[40px] h-[25px] xs:h-[40px] bg-black-100 text-black-500 cursor-pointer flex justify-center items-center rounded"
                >
                  <Icon
                    className="w-[14px] xs:w-[20px] h-[14px] xs:h-[20px]"
                    icon={`${
                      width < md ? "ep:arrow-left-bold" : "ep:arrow-up-bold"
                    }`}
                  />
                </div>
                <div
                  ref={navigationNextRef}
                  className="absolute right-1 bottom-[2rem] xs:bottom-[3.5rem] md:bottom-1 md:right-[3.7rem] lg:right-[5.5rem] xl:right-[7.9rem] z-50 w-[25px] xs:w-[40px] h-[25px] xs:h-[40px] bg-black-100 text-black-500 cursor-pointer flex justify-center items-center rounded"
                >
                  <Icon
                    className="w-[14px] xs:w-[20px] h-[14px] xs:h-[20px]"
                    icon={`${
                      width < md ? "ep:arrow-right-bold" : "ep:arrow-down-bold"
                    }`}
                  />
                </div>
              </Swiper>
            </div>
            <div className="col-span-1 lg:col-span-12 grid grid-cols-2 lg:grid-cols-12">
              <div className="col-span-1 lg:col-span-3 flex justify-center items-center gap-2 border-t border-r py-5 xs:py-8">
                <div className="p-2 xs:p-3 rounded-full bg-black-200">
                  <Icon className="w-3 xs:w-5 h-3 xs:h-5" icon="bi:calendar" />
                </div>
                <div className="flex flex-col text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  <p className="text-xs lg:text-sm font-normal uppercase">
                    model
                  </p>
                  {data.vehicle?.year}
                </div>
              </div>

              <div className="col-span-1 lg:col-span-3 flex justify-center items-center gap-2 border-t border-r py-5 xs:py-8">
                <div className="p-2 xs:p-3 rounded-full bg-black-200">
                  <Icon
                    className="w-3 xs:w-5 h-3 xs:h-5"
                    icon="carbon:meter-alt"
                  />
                </div>
                <div className="flex flex-col text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  <p className="text-xs lg:text-sm font-normal uppercase">
                    Mileage
                  </p>
                  {new Intl.NumberFormat("en-PK", {
                    style: "unit",
                    unit: "kilometer",
                  }).format(data.vehicle?.mileage)}
                </div>
              </div>

              <div className="col-span-1 lg:col-span-3 flex justify-center items-center gap-2 border-t border-r py-5 xs:py-8">
                <div className="p-2 xs:p-3 rounded-full bg-black-200">
                  <Icon className="w-3 xs:w-5 h-3 xs:h-5" icon="mdi:color" />
                </div>
                <div className="flex flex-col text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  <p className="text-xs lg:text-sm font-normal uppercase">
                    color
                  </p>
                  {data.vehicle?.color}
                </div>
              </div>

              <div className="col-span-1 lg:col-span-3 flex justify-center items-center gap-2 border-t  py-5 xs:py-8">
                <div className="p-2 xs:p-3 rounded-full bg-black-200">
                  <Icon className="w-3 xs:w-5 h-3 xs:h-5" icon="mdi:car-door" />
                </div>
                <div className="flex flex-col text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  <p className="text-xs lg:text-sm font-normal uppercase">
                    doors
                  </p>
                  {data.vehicle?.door}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 mt-4 xs:mt-8 gap-5">
            <div className="lg:col-span-8 lg:row-span-4 px-3 xs:px-5 py-4 xs:py-8 bg-white rounded-lg flex flex-col gap-2 xs:gap-4">
              <p className="text-base xs:text-xl md:text-2xl lg:text-3xl font-semibold text-main">
                {new Intl.NumberFormat("ur-PK", {
                  style: "currency",
                  currency: "PKR",
                }).format(data.vehicle?.price)}
              </p>
              {/* <h3 className="text-base xs:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">{car.name}</h3> */}
              <p className="flex items-center gap-1 text-xs xs:text-sm md:text-base xl:text-lg">
                <Icon icon="ion:location-outline" />{" "}
                {`${data.vehicle?.country}, ${data.vehicle?.state}, ${data.vehicle?.city}`}
              </p>
              <p className="flex items-center gap-1 text-xs xs:text-sm lg:text-lg">
                <span className="font-medium">Uploaded:</span>{" "}
                {`${moment(data.vehicle?.time).fromNow(true)} ago`}
              </p>
              <div>
                <h4 className="text-sm xs:text-lg lg:text-2xl">Description</h4>
                <p className="text-xs xs:text-sm lg:text-base xs:leading-6">
                  {data.vehicle?.description}
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 bg-white rounded-lg p-5">
              <h4 className="flex justify-center items-center pb-5 text-base xs:text-2xl border-b">
                Seller details
              </h4>
              <div className="flex flex-col justify-center items-center gap-2 lg:gap-4 px-2 py-4 xs:py-8">
                <div className="flex gap-5 items-center">
                  <img
                    className="w-16 xs:w-20 h-16 xs:h-20"
                    src={
                      data.vehicle?.profile?.logo
                        ? `${logoRoute}/${data.vehicle?.profile?.logo}`
                        : profile
                    }
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-center mt-2 xs:mt-5">
                  <h3 className="text-base xs:text-lg font-semibold">
                    {data.vehicle?.profile?.name}
                  </h3>
                  <span className="text-xs xs:text-sm">
                    Member Since{" "}
                    {moment(data.vehicle?.profile?.time).format(
                      "MMM, DD, YYYY"
                    )}
                  </span>
                </div>
                {/* <a
                    href={`tel:${data.vehicle?.profile?.phone}`}
                    className="col-span-3 bg-main text-white py-2 flex justify-center items-center cursor-pointer rounded-lg gap-1"
                  >
                    <Icon className="" icon="maki:mobile-phone" /> Call
                  </a>
                  <a
                    href={`mailto:${data.vehicle?.profile?.email}`}
                    className="col-span-3 bg-main text-white py-2 flex justify-center items-center cursor-pointer rounded-lg gap-2"
                  >
                    <Icon className="" icon="ooui:message" /> Email
                  </a> */}
                <p className=" text-ellipsis lg:text-clip line-clamp-2 lg:line-clamp-none text-center text-xs xs:sm lg:text-base leading-4 text-gray-500">
                  Excite and engage customers as an exclusive seller on
                  VIEWNSHOP – a dynamic video multi-vendor ecommerce platform.
                </p>
                <Link
                  to={`/seller/${data.vehicle?.profile?.url}`}
                  className="w-full bg-main text-white py-2 flex justify-center items-center cursor-pointer rounded-lg"
                >
                  View Shop
                </Link>
                <div className="flex flex-col items-center text-sm xs:text-base">
                  <p>
                    View Our{" "}
                    <Link
                      to={websiteRoutes.termsAndConditions}
                      className="text-blue-600"
                    >
                      Terms and Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg mt-4 xs:mt-8 p-4 xs:py-8 lg:px-7">
            <h1 className="w-full text-center text-gray-700 text-lg xs:text-xl md:text-2xl lg:text-3xl leading-none my-4 lg:mb-8">
              Features of Vehicle
            </h1>
            <div className="grid grid-cols-12 gap-4">
              {Object.keys(data.vehicle?.features)?.map((item) =>
                data.vehicle?.features[item] ? (
                  <div
                    className="col-span-12 xs:col-span-6 sm:col-span-4 md:col-span-3 flex gap-2 items-center pr-2 text-sm xs:text-base md::text-lg font-medium"
                    key={item.id}
                  >
                    <Icon
                      className={`w-6 lg:w-7 h-6 lg:h-7 rounded-full text-green-500 bg-green-100 p-[2px] font-normal flex-none`}
                      icon="dashicons:yes"
                    />
                    <span className="truncate">
                      {removeUnderscoreAndCapitalize(item)}
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </div>
          {/* <div className="mt-8 bg-white rounded-lg px-4 py-8 lg:px-7 lg:py-5">
        <h1 className="text-base xs:text-2xl text-black-500 font-semibold">View Shop Inspection Report</h1>
        <span className="text-xs lg:text-base font-medium">
          Inspection Date: <span className="font-normal">17/2/2024</span>
        </span>
        <div className="w-full flex flex-col mt-8">
          <div className="flex items-center justify-between pb-4 border-b text-sm lg:text-lg font-semibold">
            <span className="">Overall Rating:</span> <span className="text-main">7.7/10</span>
          </div>
          <div className="w-full flex flex-col mt-6 text-xs lg:text-base">
            <p className="flex items-center justify-between">
              <span>Exterior & Body</span>
              <span>45%</span>
            </p>
            <div className="w-full">
              <ProgressBar value={45} backClass="mt-2 h-1" className="bg-main" />
            </div>
          </div>
          <div className="w-full flex flex-col mt-6 text-xs lg:text-base">
            <p className="flex items-center justify-between">
              <span>Engine/Tramsmission/Clutch</span>
              <span>60%</span>
            </p>
            <div className="w-full">
              <ProgressBar value={60} backClass="mt-2 h-1" className="bg-main" />
            </div>
          </div>
          <div className="w-full flex flex-col mt-6 text-xs lg:text-base">
            <p className="flex items-center justify-between">
              <span>Suspension/Steering</span>
              <span>80%</span>
            </p>
            <div className="w-full">
              <ProgressBar value={80} backClass="mt-2 h-1" className="bg-main" />
            </div>
          </div>
          <div className="w-full flex flex-col mt-6 text-xs lg:text-base">
            <p className="flex items-center justify-between">
              <span>Interior</span>
              <span>55%</span>
            </p>
            <div className="w-full">
              <ProgressBar value={55} backClass="mt-2 h-1" className="bg-main" />
            </div>
          </div>
          <div className="w-full flex flex-col mt-6 text-xs lg:text-base">
            <p className="flex items-center justify-between">
              <span>AC/Heater</span>
              <span>45%</span>
            </p>
            <div className="w-full">
              <ProgressBar value={45} backClass="mt-2 h-1" className="bg-main" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-base xs:text-2xl  mt-8 text-black-500 font-medium">
        Honda Civic 2024 Specifications
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 bg-white rounded-lg mt-2">
        <div className="col-span-1 md:col-span-6 flex flex-col">
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Price
            <span className="text-black-500"> {car.price}</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            <span className="w-[50%] truncate"> Dimensions (Length x Width x Height)</span>{" "}
            <span className="w-[50%] truncate text-black-500 text-end"> 4687 x 1802 x 1432 mm</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Displacement <span className="text-black-500"> 1498 cc</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Horse Power <span className="text-black-500"> 127 - 176 hp</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Boot Space <span className="text-black-500">409 L</span>
          </p>{" "}
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Fuel Type <span className="text-black-500">Petrol</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Fuel Tank Capacity <span className="text-black-500">47 L</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Top Speed <span className="text-black-500">220 KM/H</span>
          </p>
        </div>
        <div className="col-span-1 md:col-span-6 flex flex-col">
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Body Type
            <span className="text-black-500"> Sedan</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Ground Clearence
            <span className="text-black-500"> 0 - 175 mm</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Transmission <span className="text-black-500"> Manual Automatic</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Torque <span className="text-black-500"> 121 - 173 Nm</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Kerb Weight <span className="text-black-500">0 - 1320Kg</span>
          </p>{" "}
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Mileage <span className="text-black-500">8 - 16 KM/L</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Seating Capacity <span className="text-black-500">% Person</span>
          </p>
          <p className="text-xs xs:text-sm  lg:text-base flex justify-between py-6 px-5 text-black-400 border-b">
            Tyre Siza <span className="text-black-500">195/65/R15</span>
          </p>
        </div>
      </div> */}
          {data.related.length > 0 && (
            <div className="flex flex-col border-t-2 border-black-500 mt-10 pt-5">
              <h6 className="text-lg font-bold">Related Cars</h6>
              <div className="w-full mt-5 ">
                <Swiper
                  className=""
                  spaceBetween={20}
                  slidesPerView={
                    width < sm
                      ? 1.2
                      : width < md
                      ? 1.5
                      : width < lg
                      ? 2
                      : width < xl
                      ? 3.5
                      : 4
                  }
                  loop="true"
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  navigation={true}
                  modules={[Autoplay, Navigation]}
                >
                  {data.related.map((item, index) => (
                    <SwiperSlide key={index}>
                      <VehicleCard
                        className="h-[380px] xl:h-[400px]"
                        data={item}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
          <ReviewModal active={active} handleClose={() => setActive(false)} submitData={handleSubmit} />
        </div>
      )}
      {userType && (
            <button type="button" className="btn btn-primary fixed bottom-8 left-8" onClick={() => setActive(true)}>
              Write Review
            </button>
          )}
    </>
  );
};

export default CarDetail;
