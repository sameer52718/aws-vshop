import { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import ShortCard from "@/components/websitePartials/ShortCard";

import { bannerRoute, categoryIcon, logoRoute, shopDetail } from "@/constant/apiRoutes";
import { productData } from "@/constant/data";
import Loading from "@/components/Loading";
import PlaceholderBanner from "@/assets/images/vectors/bannar-placeholder.png";
import PlaceholderLogo from "@/assets/images/vectors/logo-placeholder.png";
import ProgressBar from "@/components/ui/ProgressBar";
import ReviewCard from "@/components/websitePartials/reviewCard";
import Breadcrumbs from "@/components/websitePartials/breadcrumb";
import useWidth from "@/hooks/useWidth";
import avatar from "../../../assets/images/avatar/NoProfile.png";
import { useSelector } from "react-redux";
import { followApi, insertReview } from "../../../constant/apiRoutes";
import individual from "../../../assets/images/icon/individual.png";
import wishlist from "../../../assets/images/icon/wishlist.png";
import LiveCard from "../../../components/websitePartials/livecard";
import moment from "moment";
import PropertyCard from "../../../components/websitePartials/propertycard";
import CarCard from "../../../components/websitePartials/vehiclecard";
import ProductCard from "../../../components/websitePartials/productCard"
import ReviewModal from "../../../components/websitePartials/reviewModal";
const buttons = [
  {
    title: "Bio",
    icon: "mdi:about-variant",
  },
  {
    title: "Product",
    icon: "icon-park-outline:ad-product",
  },
  {
    title: "Reviews",
    icon: "ic:outline-rate-review",
  },
  {
    title: "Reels",
    icon: "bi:camera-reels",
  },
  {
    title: "Streaming",
    icon: "fluent-mdl2:streaming",
  },
  {
    title: "Properties",
    icon: "mdi:house-city-outline",
  },
  {
    title: "Vehicle",
    icon: "raphael:car",
  },
];

const Shop = () => {
  const { token ,userType} = useSelector((state) => state.auth);
  const {
    width,
    breakpoints: { xs, sm, md, lg },
  } = useWidth();
  const { url } = useParams();
  const [isLoading, setIsLoading] = useState({
    product: false,
    page: true,
  });
  const [active, setActive] = useState(false)
  const [data, setData] = useState({});
 

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading((prev) => ({ ...prev, page: true }));
        const { data } = await axios.post(shopDetail, { url }, { headers: { Authorization: token } });
        if (data.error === false) {
          setData(data.data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading((prev) => ({ ...prev, page: false }));
      }
    };
    getData();
  }, [token, url]);

  
  const handleFollow = async ({ url }) => {
    try {
      if (!token) {
        toast.error("You Have to Login First");
        return;
      }
      const updatedData = { ...data };
      updatedData.shop[0].follow = !updatedData.shop[0].follow;
      setData(updatedData);
      const body = {
        followed_type: 2,
        followed_url: url,
      };
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
  const handleSubmit = async (data) => {
    try {
      const { data: res } = await axios.post(
        insertReview,
        { ...data, content_type: 2, url },
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
      {isLoading.page ? (
        <Loading />
      ) : (
        <div className="container my-12">
          <Breadcrumbs previosLinks={[{ name: "Shop", link: "/seller" }]} currentLink={data?.shop[0]?.name} />
          <div className="relative">
            <div className="p-2 xs:p-4 bg-white rounded-md flex flex-col gap-4 ">
              <div
                style={{
                  backgroundImage: data?.shop[0]?.cover
                    ? `url(${bannerRoute}/${data?.shop[0]?.cover})`
                    : `url(${PlaceholderBanner})`,
                }}
                className="relative h-[150px] md:h-[300px] bg-no-repeat bg-cover bg-center rounded-md"
              >
                <div className="absolute bg-white bottom-6 xs:bottom-8 md:bottom-12 lg:bottom-10 left-4 md:pl-6 px-6 xs:px-2 md:pr-28 md:py-4 py-2 rounded-md flex items-center gap-1 xs:gap-4">
                  <div className="">
                    <img
                      src={data?.shop[0]?.logo ? `${logoRoute}/${data?.shop[0]?.logo}` : PlaceholderLogo}
                      alt="logo"
                      className="w-10 h-10 md:w-24 md:h-24  object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="flex items-center gap-2 text-[10px] xs:text-xs font-bold md:text-xl ">
                      <Icon icon={"jam:store"} /> {data?.shop[0]?.name}
                    </h6>
                    <p className="flex items-center gap-2 text-[8px] sm:text-[12px] text-gray-400">
                      <Icon icon={"ooui:user-avatar-outline"} /> 2520 Followers
                    </p>
                    {/* <p className="text-[8px] sm:text-[12px] text-gray-400">
                      {" "}
                      {Math.round(Math.random() * 100)}% Positive Seller Rating
                    </p> */}
                    <button
                      className={`text-[8px] xs:text-[10px] lg:text-xs md:absolute top-3 right-3 font-normal tracking-wide inline-flex items-center justify-center rounded-md text-white px-1 md:px-2 py-[1px] md:py-1 ${
                        data?.shop[0]?.follow
                          ? "bg-green-500 w-[80px] md:w-[90px] gap-[2px]"
                          : "bg-main w-[60px] md:w-[80px] gap-1"
                      } `}
                      type="button"
                      onClick={() => handleFollow({ url: url })}
                    >
                      {data?.shop[0]?.follow ? (
                        <Icon className="w-3 md:w-5 h-3 md:h-5" icon="dashicons:yes" />
                      ) : (
                        <Icon className="w-2 md:w-3 h-2 md:h-3" icon="fa-solid:plus" />
                      )}
                      {data?.shop[0]?.follow ? "Followed" : "Follow"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col py-2 md:pt-4 gap-2">
                <h1 className="text-base xs:text-lg mg:text-xl">Categories</h1>
                <Swiper
                  className="mySwiper w-full h-full rounded-md bg-white"
                  slidesPerView={width < xs ? 2.5 : width < sm ? 3 : width < md ? 4 : width < lg ? 5 : 6}
                  spaceBetween={width <= sm ? 8 : 20}
                  autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  loop
                >
                  {data?.categories?.map((item) => (
                    <SwiperSlide key={item.url}>
                      <div className=" h-50px sm:h-[90px] bg-gray-50 p-4 flex flex-col justify-center items-center gap-0">
                        <img
                          className="w-[18px] sm:w-[30px] h-[18px] sm:h-[30px] object-contain "
                          src={`${categoryIcon}/${item.web_icon}`}
                          alt="category icon"
                        />
                        <span className="truncate w-[70px] sm:w-[100%] text-center text-[10px] sm:text-base">
                          {item.name}
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="grid grid-cols-12 gap-2 lg:gap-6 py-2 md:py-4 ">
                <div className="bg-gray-50 md:py-4 py-3 md:px-8 col-span-6 sm:col-span-4 lg:col-span-4 flex flex-col items-center">
                  <h6 className="flex items-center gap-1 text-xs md:text-lg lg:text-2xl">
                    <Icon icon={"mdi:clock-outline"} /> {moment(data?.shop[0]?.time).fromNow(true)}
                  </h6>
                  <p className="text-gray-500 md:text-[10px] text-[9px]">{"Time on Vshop".toUpperCase()}</p>
                </div>
                <div className="bg-gray-50 md:py-4 py-3 md:px-8 col-span-6 sm:col-span-4 lg:col-span-4 flex flex-col items-center">
                  <h6 className="flex items-center gap-1 text-xs md:text-lg lg:text-2xl">
                    <Icon icon={"mdi:truck-outline"} /> {`${Math.round(Math.random() * 100)}%`}
                  </h6>
                  <p className="text-gray-500 md:text-[10px] text-[9px]">{"Shipping on Time".toUpperCase()}</p>
                </div>
                <div className="bg-gray-50 md:py-4 py-3 md:px-8 col-span-12 sm:col-span-4 lg:col-span-4 flex flex-col items-center">
                  <h6 className="flex items-center gap-1 text-xs md:text-lg lg:text-2xl">
                    <Icon icon={"fluent:chat-12-regular"} /> {`${Math.round(Math.random() * 100)}%`}
                  </h6>
                  <p className="text-gray-500 md:text-[10px] text-[9px]">{"Chat Responses Rate".toUpperCase()}</p>
                </div>
              </div>
              <div className="p-2 xs:p-4 bg-gray-50">
                <Tab.Group >
                  <Tab.List>
                    <div className="w-[100%] flex overflow-x-scroll lg:overflow-x-clip scrollbar-none lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse mb-2 pb-2">
                      {buttons.map((item, i) => (
                        <Tab as={Fragment} key={i}>
                          {({ selected }) => (
                            <button
                              className={`min-w-[100px] truncate inline-flex justify-center rounded-full py-2 items-center text-[10px] xs:text-sm font-medium capitalize ring-0 foucs:ring-0 focus:outline-none px-[6px] xs:px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-main before:-translate-x-1/2 ${
                                selected ? "bg-main text-white" : "text-slate-500 before:w-0 dark:text-slate-300"
                              }`}
                            >
                              <span className="text-base relative top-[1px] ltr:mr-1 rtl:ml-1">
                                <Icon icon={item.icon} />
                              </span>
                              {item.title}
                            </button>
                          )}
                        </Tab>
                      ))}
                    </div>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <div className="flex flex-col gap-3 ml-2">
                        <p className="sm:text-[14px] text-[9px] whitespace-pre-wrap">{data?.shop[0]?.description}</p>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mt-5">
                        {data.product.map((item,index) => (
                          <ProductCard key={index} data={item} />
                        ))}
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 lg:col-span-4 lg:pl-3">
                          <div className="space-y-3">
                            <p className="text-sm font-semibold md:text-base">Positive Seller Ratings</p>
                            <h6 className="text-3xl md:text-4xl xl:text-5xl"> {Math.round(Math.random() * 100)}%</h6>
                            <p className="text-xs xs:text-sm">Positive Ratings</p>
                            <ProgressBar
                              title={"Positive"}
                              value={80}
                              titleClass="text-xs xs:text-sm md:text-base font-semibold"
                              className="bg-green-600"
                            />
                            <ProgressBar
                              title={"Neutral"}
                              titleClass="text-xs xs:text-sm md:text-base font-semibold"
                              value={60}
                              className="bg-yellow-400"
                            />
                            <ProgressBar
                              title={"Negative"}
                              value={40}
                              titleClass="text-xs xs:text-sm md:text-base font-semibold"
                              className="bg-red-500"
                            />
                            <p className="text-xs xs:text-sm text-gray-400">Based On 1406 Customer Reviews</p>
                          </div>
                        </div>
                        <div className="col-span-12 lg:col-span-8 flex flex-col gap-3">
                          {productData.slice(0, 3).map((_, index) => (
                            <ReviewCard key={index} />
                          ))}
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="w-full grid grid-cols-12  gap-4">
                        <div className="col-span-12 lg:col-span-4  ">
                          <div className="p-3 lg:p-4 bg-white rounded-md">
                            <div className="relative w-full flex items-center gap-2 my-5">
                              <img className="w-10 md:w-16 h-10 md:h-16 object-cover" src={avatar} alt="" />
                              <div className="flex flex-col">
                                <h4 className="text-base md:text-xl">Waleed Ali</h4>
                                <p className="text-[9px] xs:text-xs">
                                  Vibrant, engaging content creator sharing joy, trends, and creativity
                                </p>
                              </div>
                              <span className="absolute top-0 right-0 text-[8px] xs:text-[10px] sm:text-xs px-1 py-0 md:py-1 md:px-2  badge badge-primary">
                                verified
                              </span>
                            </div>
                            <div className="w-full flex flex-col gap-1 md:gap-2 mt-2 md:mt-4 text-[10px] xs:text-xs md:text-base px-2 md:px-4 py-2 rounded-md">
                              <div className="w-full flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                  <Icon className="w-3 md:w-4 h-3 md:h-4" icon="mdi:people-group" />
                                  Followers
                                </span>
                                <span className="">3.56k</span>
                              </div>
                              <div className="w-full flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                  <img className="w-3 md:w-4 h-3 md:h-4 object-cover" src={wishlist} alt="" />
                                  Likes
                                </span>
                                <span className="">6.36k</span>
                              </div>
                              <div className="w-full flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                  <img className="w-3 md:w-4 h-3 md:h-4 object-cover" src={individual} alt="" />
                                  Following
                                </span>
                                <span className="">1.7k</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-4">
                          {data?.reels?.map((item, index) => (
                            <div key={index} className="col-span-1 ">
                              <ShortCard
                                className="h-[220px] xs:h-[300px] sm:h-[370px] md:h-[300px]"
                                imgBg={item.imageBg}
                                profileImg={item.imageProfile}
                                name={item.name}
                                follower={item.follower}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="w-full grid grid-cols-12 gap-2 sm:gap-4">
                        {data?.streaming?.map((item, index) => (
                          <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3">
                            <LiveCard data={item}/>
                          </div>
                        ))}
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="w-full grid grid-cols-12 gap-2 sm:gap-4">
                        {data?.property?.map((item, index) => (
                          <div key={index} className="col-span-6 xs:col-span-6 md:col-span-4 lg:col-span-3">
                            <PropertyCard
                              className="bg-white xl:p-3 xl:pb-2"
                              data={item}
                              imgClass="h-[80px] xs:!h-[120px] sm:h-[150px] lg:[120px]  xl:!h-[180px]"
                              addressClass="!pt-[2px] pb-0 lg:text-[13px]"
                            />
                          </div>
                        ))}
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="w-full grid grid-cols-12 gap-2 sm:gap-4 xl:gap-2">
                        {data?.vehicle?.map((item, index) => (
                          <div className="col-span-6 lg:col-span-4 xl:col-span-3" key={index}>
                            <CarCard className="h-[240px] sm:h-[360px] lg:h-[400px] pb-0" data={item} />
                          </div>
                        ))}
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
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

export default Shop;
