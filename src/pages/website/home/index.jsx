/* eslint-disable react/prop-types */
import VehicleCard from "../../../components/websitePartials/vehiclecard";
import ResellerCard from "@/components/websitePartials/resellerCard";
import ProductCard from "@/components/websitePartials/productCard";
import ProductList from "./product-list";
import ShortCard from "@/components/websitePartials/ShortCard";
import ShopCard from "@/components/websitePartials/shopCard";
import LiveCard from "@/components/websitePartials/livecard";
import Loading from "@/components/Loading";
import Hero from "@/components/websitePartials/hero";

import useWidth from "@/hooks/useWidth";
import { services, shorts } from "@/constant/data";

import { Fragment, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  brandLogoRoute,
  followApi,
  getHomeData,
} from "../../../constant/apiRoutes";
import sampleVideo from "../../../assets/video/sample.mp4";
import sampleVideoThumb from "../../../assets/images/banner/video-thumbnail.png";
import NoLogo from "../../../assets/images/vectors/no-logo.png";
import PropertyCard from "../../../components/websitePartials/propertycard";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { optimisticUpdateFollow } from "../../../utils/function";
import { websiteRoutes } from "../../../constant/routes";

const tabs = [
  { key: "all", query: "" },
  { key: "featured", query: "featured=true" },
  { key: "topRated", query: "toprated=true" },
  { key: "popular", query: "popular=true" },
  { key: "newArrival", query: "newarrival=true" },
];

const buttons = [
  { title: "All" },
  { title: "Featured" },
  { title: "Top Rated" },
  { title: "Popular" },
  { title: "New Arrival" },
];

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const {
    width,
    breakpoints: { xs, sm, md, lg },
  } = useWidth();
  // const [playing, setPlaying] = useState(false);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [data, setData] = useState({
    all: [],
    featured: [],
    topRated: [],
    popular: [],
    newArrival: [],
    seller: [],
    reseller: [],
    forYou: [],
    streaming: [],
    brand: [],
    vehicle: [],
    property: [],
  });
  const [loading, setLoading] = useState({
    isLoading: true,
    tabLoading: false,
  });
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading((prev) => ({ ...prev, isLoading: true }));

        const { data } = await axios.get(getHomeData, {
          headers: { Authorization: token },
        });
        if (data.error === false) {
          const {
            all_product,
            top_rated,
            new_arrival,
            popular,
            seller,
            reseller,
            behaviour_product,
            featured_product,
            streaming,
            brand,
            vehicle,
            property,
          } = data.data;

          setData((prev) => ({
            ...prev,
            all: all_product,
            topRated: top_rated,
            newArrival: new_arrival,
            popular,
            featured: featured_product,
            seller,
            reseller,
            forYou: behaviour_product,
            brand,
            streaming,
            vehicle,
            property,
          }));
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, isLoading: false }));
      }
    };
    getData();
  }, [token]);

  const handleFollow = async ({ url, type, data, follow }) => {
    try {
      if (!token) {
        toast.error("You Have to Login First");
        return;
      }
      const body = {
        followed_type: type,
        followed_url: url,
      };

      const updatedData = optimisticUpdateFollow(url, follow, data);
      switch (type) {
        case 3:
          setData((prev) => ({ ...prev, reseller: updatedData }));
          break;
        case 2:
          setData((prev) => ({ ...prev, seller: updatedData }));
          break;
        default:
          break;
      }
      const { data: res } = await axios.post(followApi, body, {
        headers: { Authorization: token },
      });
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
      {loading.isLoading ? (
        <Loading />
      ) : (
        <>
          <Hero />

          {/* View shop shorts section start */}
          <div className="container my-5 xs:my-8 overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-gray-700 text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-[35px] leading-none">
                Reels & Feel
              </h1>
              <Link
                to={"/short"}
                className="mb-0 pt-1 text-main text-xs xs:text-sm font-medium inline-flex items-center gap-1 justify-end"
              >
                See All <Icon icon={"material-symbols:arrow-right-alt"} />
              </Link>
            </div>
            <Swiper
              breakpoints={{
                320: { slidesPerView: 2 },
                350: { slidesPerView: 2.1 },
                425: { slidesPerView: 2.3 },
                640: { slidesPerView: 2.5 },
                768: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4.5 },
                1280: { slidesPerView: 5 },
              }}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              data-aos="fade-up"
            >
              {shorts.map((item) => (
                <SwiperSlide key={item.id}>
                  <ShortCard
                    imgBg={item.imageBg}
                    profileImg={item.imageProfile}
                    name={item.name}
                    follower={item.follower}
                    className="h-[200px] xs:h-[250px] sm:h-[350px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* View shop shorts section end */}

          {/*Products section start  */}
          <div className="w-full flex container flex-col md:flex-row md:justify-between flex-wrap md:items-center font-quick mt-5 md:mt-8 overflow-hidden">
            <div className="">
              <h1 className=" text-gray-700 flex flex-wrap text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-[35px] leading-none">
                Products
              </h1>
            </div>

            <Tab.Group>
              <Tab.List className="flex justify-between items-center gap-2 md:gap-4 lg:gap-8">
                <div className="flex items-center gap-2 md:gap-4 lg:gap-8">
                  {buttons.map((item, i) => (
                    <Tab as={Fragment} key={i}>
                      {({ selected }) => (
                        <button
                          className={`text-[9px] xs:text-xs lg:text-base font-medium mb-0 capitalize dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-0 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-1px] before:h-[1.5px] before:bg-main before:-translate-x-1/2 ${
                            selected
                              ? "text-main before:w-full"
                              : "text-slate-500 before:w-0 dark:text-slate-300"
                          }`}
                        >
                          {item.title}
                        </button>
                      )}
                    </Tab>
                  ))}
                </div>
                <Link
                  to={"/product"}
                  className="text-main text-xs xs:text-sm font-medium inline-flex items-center gap-1 justify-end"
                >
                  See All <Icon icon={"material-symbols:arrow-right-alt"} />
                </Link>
              </Tab.List>
              <Tab.Panels className="w-full">
                {tabs.map((tab, index) => (
                  <Tab.Panel key={index}>
                    <ProductList
                      products={data[tab.key]}
                      loading={loading.tabLoading}
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
          {/*Products section end  */}

          {/* Video section start */}
          <div
            className={`container ${
              width <= 320 ? "h-[150px]" : "h-[180px]"
            } xs:h-[240px] md:h-[300px] lg:h-[400px]`}
          >
            <div className="h-full relative rounded-lg">
              <ReactPlayer
                className={"video-wrapper"}
                url={sampleVideo}
                style={{ borderRadius: "20px" }}
                playIcon={
                  <button
                    className={`w-8 xs:w-10 xl:w-20 h-8 xs:h-10 xl:h-20 flex justify-center items-center absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  p-2 rounded-full z-50 before:w-8 before:xs:w-10 before:xl:w-20 before:h-8 before:xs:h-10 before:xl:h-20 before:bg-white before:animate-ping before:transition-all before:duration-75 before:rounded-full before:absolute right-0 before:z-0 before:opacity-40`}
                  >
                    <Icon
                      icon="solar:play-bold"
                      className="w-[55%] xl:w-[40%] h-[55%] xl:h-[40%] text-main"
                    />
                  </button>
                }
                width={"100%"}
                height={"100%"}
                controls={true}
                playing={true}
                onError={(e) => console.error(e)}
                light={
                  <img
                    src={sampleVideoThumb}
                    alt="placeholder"
                    className="h-full w-full object-cover rounded-lg"
                  />
                }
              />
            </div>
          </div>
          {/* Video section end */}

          {/* LIVE STREMING CARD SECTION WITH SLIDER start */}
          {data.streaming.length > 0 && (
            <>
              <div className="container flex justify-between items-center mt-5 md:mt-8 py-3 font-bold overflow-hidden">
                <h2 className="text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-[35px] font-quick font-inter">
                  Sunday Bazar
                </h2>
                <Link
                  to={"/sunday-bazar"}
                  className="mb-0 pt-1 text-main text-xs xs:text-sm font-medium inline-flex items-center gap-1 justify-end"
                >
                  See All <Icon icon={"material-symbols:arrow-right-alt"} />
                </Link>
              </div>
              <div className="container  py-2  ">
                <Swiper
                  breakpoints={{
                    320: { slidesPerView: 1.2 },
                    350: { slidesPerView: 1.4 },
                    425: { slidesPerView: 1.7 },
                    640: { slidesPerView: 2.5 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 3.5 },
                    1280: { slidesPerView: 4.5 },
                  }}
                  spaceBetween={5}
                  className="mySwiper"
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  loop={true}
                >
                  {data?.streaming?.map((item, index) => (
                    <SwiperSlide className=" gap-3 cursor-grab" key={index}>
                      <LiveCard data={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
          {/* LIVE STREMING CARD SECTION WITH SLIDER end */}

          {/* Just for you section start */}
          {data.forYou.length > 0 && (
            <div className="container my-5 xs:my-8 overflow-hidden">
              <h1 className="w-[98%] text-gray-700 flex flex-wrap text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-[35px] mb-5 md:mb-8 leading-none">
                Just For you
              </h1>
              <Swiper
                breakpoints={{
                  280: { slidesPerView: 1.5 },
                  350: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 5 },
                }}
                spaceBetween={10}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                loop={true}
                data-aos="fade-up"
              >
                {data.forYou.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard data={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {/* Just for you section end */}

          {/* seller section start */}
          {data.seller.length > 0 && (
            <div className="container my-5 xs:my-8 overflow-hidden">
              <div className="flex flex-col xs:flex-row justify-between xs:items-center mb-2">
                <h1 className="text-gray-700 text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-[35px] leading-none">
                  Prefered Shop
                </h1>
                <div className="flex flex-row justify-between items-center text-xs xs:text-sm mb-0 pt-1 text-secondary-800 xs:gap-4">
                  <Link to="/pricing-plans">Become a Prefered Shop</Link>
                  <Link to={"/seller"} className="text-main text-xs xs:text-sm font-medium inline-flex items-center gap-1">
                    See All <Icon icon={"material-symbols:arrow-right-alt"} />
                  </Link>
                </div>
              </div>
              <Swiper
                // slidesPerView={width < xs ? 2 : width < lg ? 1.5 : 2}
                breakpoints={{
                  320: { slidesPerView: 1.5 },
                  350: { slidesPerView: 2 },
                  // 768: { slidesPerView: 1.5 },
                  // 768: { slidesPerView: 3 },
                  // 1024: { slidesPerView: 3.5 },
                  // 1280: { slidesPerView: 4.5 },
                }}
                spaceBetween={10}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                loop={true}
                data-aos="fade-up"
              >
                {data.seller.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ShopCard
                      data={item}
                      allData={data.seller}
                      handleFollow={handleFollow}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {/* seller section end */}

          {/* reseller section start */}
          {data.reseller.length > 0 && (
            <div className="container my-5 xs:my-8 overflow-hidden">
              <div className="w-[100%] flex flex-col xs:flex-row justify-between xs:items-center mb-2">
                <h1 className="text-gray-700 text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-[35px] leading-none">
                  Prefered Reseller
                </h1>
                <div className="flex justify-between items-center text-xs xs:text-sm mb-0 pt-1 text-secondary-800 xs:gap-4">
                  <Link to="/pricing-plans">Become a Prefered Reseller</Link>
                  <Link
                    to={"/reseller"}
                    className="text-main text-xs xs:text-sm font-medium inline-flex items-center gap-1 justify-end"
                  >
                    See All <Icon icon={"material-symbols:arrow-right-alt"} />
                  </Link>
                </div>
              </div>

              <Swiper
                // slidesPerView={width < xs ? 2 : width < lg ? 1.5 : 2}
                breakpoints={{
                  320: { slidesPerView: 1.5 },
                  350: { slidesPerView: 2 },
                  // 768: { slidesPerView: 1.5 },
                  // 768: { slidesPerView: 3 },
                  // 1024: { slidesPerView: 3.5 },
                  // 1280: { slidesPerView: 4.5 },
                }}
                spaceBetween={10}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                loop={true}
                data-aos="fade-up"
              >
                {data.reseller.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ResellerCard
                      data={item}
                      rounded={true}
                      allData={data.reseller}
                      handleFollow={handleFollow}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {/* seller section end */}

          {/* property section start */}
          {data.property.length > 0 && (
            <div className="container my-5 xs:my-8 overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-gray-700 text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-[35px] lg:mb-0 mb-0  leading-none">
                  Best Property View
                </h1>
                <div className="flex items-center mb-0 pt-1 text-secondary-800 gap-4">
                  <Link
                    to={websiteRoutes.properties}
                    className="text-main text-xs xs:text-sm font-medium inline-flex items-center gap-1 justify-end"
                  >
                    See All <Icon icon={"material-symbols:arrow-right-alt"} />
                  </Link>
                </div>
              </div>
              <Swiper
                breakpoints={{
                  320: { slidesPerView: 1.6 },
                  350: { slidesPerView: 2 },
                  425: { slidesPerView: 2.3 },
                  640: { slidesPerView: 2.5 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 3.5 },
                  1280: { slidesPerView: 4 },
                }}
                spaceBetween={10}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                loop={true}
                data-aos="fade-up"
              >
                {data.property.map((item, index) => (
                  <SwiperSlide key={index}>
                    <PropertyCard
                      className="bg-white"
                      data={item}
                      cardType={"home"}
                      addressClass="lg:text-sm"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* property section end */}

          {/* Vehicles section start */}
          <div className="container my-5 xs:my-8 overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-gray-700 text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-[35px] leading-none">
                Best Car View
              </h1>
              <div className="flex items-center mb-0 pt-1 text-secondary-800 gap-4">
                <Link
                  to={"/vehicle"}
                  className="text-main text-xs xs:text-sm font-medium inline-flex items-center gap-1 justify-end"
                >
                  See All <Icon icon={"material-symbols:arrow-right-alt"} />
                </Link>
              </div>
            </div>

            <Swiper
              breakpoints={{
                320: { slidesPerView: 1.6 },
                350: { slidesPerView: 2 },
                425: { slidesPerView: 2.3 },
                640: { slidesPerView: 2.5 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 3.5 },
                1280: { slidesPerView: 4 },
              }}
              spaceBetween={10}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              loop={true}
              data-aos="fade-up"
            >
              {data.vehicle.map((item, index) => (
                <SwiperSlide key={index}>
                  <VehicleCard
                    className="h-[230px] sm:h-[320px] lg:h-[380px] xl:h-[400px]"
                    data={item}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Vehicles section end */}

          {/* brands section start */}
          {data.brand.length > 0 && (
            <div className="container my-5 xs:my-8 flex flex-col">
              <div className=" mb-2">
                <h1 className="text-gray-700 text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-[35px] leading-none">
                  Our Brands
                </h1>
              </div>
              <div className="bg-white rounded-lg py-2 md:py-5">
                <Swiper
                  className="w-full self-center"
                  spaceBetween={10}
                  loop="true"
                  slidesPerView={
                    width < xs
                      ? 3
                      : width < sm
                      ? 5
                      : width < md
                      ? 6
                      : width < lg
                      ? 7
                      : 9
                  }
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                  }}
                  modules={[Autoplay, Navigation]}
                >
                  {data.brand.map((item, index) => (
                    <SwiperSlide
                      className="flex justify-center items-center"
                      key={index}
                    >
                      <img
                        className="w-[90px] h-[60px] md:h-[110px] object-contain rounded-md"
                        src={
                          item?.logo
                            ? `${brandLogoRoute}/${item?.logo}`
                            : NoLogo
                        }
                        alt={item?.name}
                      />
                    </SwiperSlide>
                  ))}
                  <div className="absolute top-1/2 transform -translate-y-1/2 w-full z-50 px-1 flex justify-between items-center">
                    <div
                      ref={navigationPrevRef}
                      className="w-[30px] z-50 xs:w-[30px] h-[30px] xs:h-[60px] bg-secondary-200 text-black-500 cursor-pointer flex justify-center items-center rounded"
                    >
                      <Icon
                        className="w-[20px] h-[20px]"
                        icon="mingcute:left-fill"
                      />
                    </div>
                    <div
                      ref={navigationNextRef}
                      className="w-[30px] xs:w-[30px] h-[30px] xs:h-[60px] bg-secondary-200 text-black-500 cursor-pointer flex justify-center items-center rounded"
                    >
                      <Icon
                        className="w-[20px] h-[20px]"
                        icon="mingcute:right-fill"
                      />
                    </div>
                  </div>
                </Swiper>
              </div>
            </div>
          )}
          {/* brands section end */}

          <div className="container my-8 overflow-hidden">
            <div
              data-aos="fade-up"
              className="best-services w-full grid grid-cols-2 bg-white lg:flex gap-y-2 gap-x-2 lg:space-y-0 lg:justify-between lg:items-center lg:h-[110px] px-2 xs:px-10 lg:py-0 py-5 xs:py-10"
            >
              {services.map((service) => (
                <div key={service.id} className="item col-span-1 ">
                  <div className="flex space-x-[2px] xs:space-x-5 rtl:space-x-reverse items-center">
                    <div>
                      <span className="w-5 sm:w-7 lg:w-10 h-5 sm:h-7 lg:h-10 text-main">
                        <Icon
                          className="w-6 sm:w-8 lg:w-12 h-5 sm:h-7 lg:h-10"
                          icon={service.icon}
                        />
                      </span>
                    </div>
                    <div>
                      <p className="text-black-500 text-[10px] sm:text-sm lg:text-base font-bold xs:tracking-wide ">
                        {service.title}
                      </p>
                      <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 line-clamp-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
