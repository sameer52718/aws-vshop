import LiveCard from "@/components/websitePartials/livecard";
import ShortCard from "@/components/websitePartials/ShortCard";
import ProductCard from "@/components/websitePartials/productCard";
import ProgressBar from "@/components/ui/ProgressBar";
import ReviewCard from "@/components/websitePartials/reviewCard";
import Breadcrumbs from "@/components/websitePartials/breadcrumb";
import Loading from "@/components/Loading";

import { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Tab } from "@headlessui/react";
import { Rating } from "primereact/rating";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { followApi, getResellerDetial } from "@/constant/apiRoutes";
import PlaceholderLogo from "@/assets/images/vectors/reseller-avatar.png";
import svgProducts from "@/assets/images/svg/order.svg";
import moment from "moment";
import individual from "@/assets/images/icon/individual.png";
import useWidth from "@/hooks/useWidth";
import { insertReview } from "../../../constant/apiRoutes";
import ReviewModal from "../../../components/websitePartials/reviewModal";

const buttons = [
  {
    title: "Reviews",
    icon: "ic:outline-rate-review",
  },
  {
    title: "Product",
    icon: "icon-park-outline:ad-product",
  },
  {
    title: "Reels",
    icon: "bi:camera-reels",
  },
  {
    title: "Streaming",
    icon: "fluent-mdl2:streaming",
  },
];

const ResellerProfile = () => {
  const { url } = useParams();
  const { userType, token } = useSelector((state) => state.auth);
  const {
    width,
    breakpoints: { md },
  } = useWidth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [active, setActive] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.post(getResellerDetial, { url }, { headers: { Authorization: token } });
        if (data.error === false) {
          setData(data.data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [url, token]);

  const handleFollow = async ({ url }) => {
    try {
      if (!token) {
        toast.error("You Have to Login First");
        return;
      }
      const updatedData = { ...data };
      updatedData.reseller[0].follow = !updatedData.reseller[0].follow;
      setData(updatedData);
      const body = {
        followed_type: 3,
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
        { ...data, content_type: 3, url },
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
        <div className="container  my-12">
          <Breadcrumbs
            previosLinks={[{ name: "reseller", link: "/reseller" }]}
            currentLink={`${data?.reseller[0].first_name} ${data?.reseller[0].last_name}`}
          />
          <div className="relative">
            <div className="p-2 xs:p-4 bg-white rounded-md flex flex-col gap-4 ">
              <div className="relative">
                <Link
                  to={`/reseller/${url}/hire`}
                  className={`absolute ${
                    width >= md ? "right-4 top-4" : "bottom-4 right-4"
                  } btn btn-primary w-max py-1 text-[10px] xs:text-sm pl-2 xs:pl-3 pr-3 xs:pr-4 flex items-center `}
                >
                  <Icon icon={"fluent:ribbon-star-24-filled"} className="mr-1 w-4 h-4 xs:w-5 xs:h-5" /> Hire Me
                </Link>
                <div className="bg-white rounded-lg md:px-4 py-4 gap-y-8 items-center grid grid-cols-12">
                  <div className={`col-span-12 md:col-span-6 lg:col-span-4 md:px-4`}>
                    <img
                      src={data?.reseller[0].profile ? data?.reseller[0].profile : PlaceholderLogo}
                      alt="Profile"
                      className={` sm:mt-0 md:mt-10 w-full  object-contain ${"h-[200px] md:h-[280px] rounded-md"}`}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-8 flex flex-col gap-[10px]">
                    <h6>{`${data?.reseller[0].first_name} ${data?.reseller[0].last_name}`}</h6>
                    <div className="flex gap-2">
                      <Rating
                        value={data?.reseller[0].rating}
                        readOnly
                        cancel={false}
                        className="flex gap-1 text-xs"
                        size={6}
                      />
                      <span className="text-gray-400 text-xs">({data?.review_count} reviews)</span>
                    </div>
                    <p className="md:text-sm text-xs text-gray-500">{data?.reseller[0].about}</p>
                    <button
                      className={`  font-normal tracking-wide text-[10px] md:text-xs inline-flex items-center justify-center rounded-md text-white px-2 py-1 ${
                        data?.reseller[0]?.follow
                          ? "bg-green-500 w-[80px] md:w-[90px] gap-[2px]"
                          : "bg-main w-[60px] md:w-[80px] gap-1"
                      }`}
                      type="button"
                      onClick={() => handleFollow({ url: url })}
                    >
                      {data?.reseller[0]?.follow ? (
                        <Icon className="w-3 md:w-5 h-3 md:h-5" icon="dashicons:yes" />
                      ) : (
                        <Icon className="w-3 h-3" icon="fa-solid:plus" />
                      )}
                      {data?.reseller[0]?.follow ? "Followed" : "Follow"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 lg:gap-6 py-2 md:p-4 lg:mx-4 rounded-md ">
                <div className="bg-gray-50 md:py-4 py-3 md:px-8 col-span-6 sm:col-span-4 lg:col-span-4 flex flex-col items-center">
                  <h6 className="flex items-center gap-1 text-xs md:text-lg lg:text-2xl">
                    <Icon icon="mdi:clock-outline" />
                    {moment(data?.reseller[0]?.time).fromNow(true)}
                  </h6>
                  <p className="text-gray-500 md:text-[10px] text-[9px]">Time on Vshop</p>
                </div>

                <div className="bg-gray-50 md:py-4 py-3 md:px-8 col-span-6 sm:col-span-4 lg:col-span-4 flex flex-col items-center">
                  <h6 className="flex items-center gap-1 text-xs md:text-lg lg:text-2xl">
                    <img className="w-[30px]" src={svgProducts} alt="svg logo" />
                    {data?.reseller[0]?.product_count}
                  </h6>
                  <p className="text-gray-500 md:text-[10px] text-[9px]">Total Products</p>
                </div>

                <div className="bg-gray-50 md:py-4 py-3 md:px-8 col-span-12 sm:col-span-4 lg:col-span-4 flex flex-col items-center">
                  <h6 className="flex items-center gap-1 text-xs md:text-lg lg:text-2xl">
                    <Icon icon="carbon:star-filled" color="yellow" />
                    {data?.reseller[0]?.review_count} (reviews)
                  </h6>
                  <p className="text-gray-500 md:text-[10px] text-[9px]">Rating</p>
                </div>
              </div>

              <div className="p-2 xs:p-4lg:mx-8 bg-gray-50">
                <Tab.Group>
                  <Tab.List>
                    <div className="w-[100%] flex overflow-x-scroll sm:overflow-x-clip scrollbar-none lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse mb-2 pb-2">
                      {buttons.map((item, i) => (
                        <Tab as={Fragment} key={i}>
                          {({ selected }) => (
                            <button
                              className={`min-w-[100px] truncate inline-flex justify-center rounded-full py-2 items-center text-[10px] xs:text-sm font-medium capitalize ring-0 foucs:ring-0 focus:outline-none px-[6px] xs:px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-main before:-translate-x-1/2 ${
                                selected ? "bg-main text-white" : "text-slate-500 before:w-0 dark:text-slate-300"
                              }`}
                            >
                              <span className="text-base relative top-[1px] ltr:mr-1 rtl:ml-1">
                                <Icon className="w-3 xs:w-4 3-2 xs:h-4" icon={item.icon} color={item.color} />
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
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 lg:col-span-4 lg:pl-3">
                          <div className="space-y-3">
                            <p className="text-sm font-semibold md:text-base">Overall Reseller Ratings</p>
                            <h6 className="flex items-center text-3xl md:text-4xl xl:text-5xl">{data?.reseller[0]?.rating} <Icon icon="carbon:star-filled" color="yellow" width={24} /> <span className="ml-2 text-lg">Rating</span></h6>
                            <p className="text-xs xs:text-sm">Positive Ratings</p>
                            <ProgressBar
                              title={"Positive"}
                              value={data?.reseller[0]?.positive_rating}
                              titleClass="text-xs xs:text-sm md:text-base font-semibold"
                              className="bg-green-600"
                            />
                            <ProgressBar
                              title={"Neutral"}
                              titleClass="text-xs xs:text-sm md:text-base font-semibold"
                              value={data?.reseller[0]?.neutral_rating}
                              className="bg-yellow-400"
                            />
                            <ProgressBar
                              title={"Negative"}
                              value={data?.reseller[0]?.neutral_rating}
                              titleClass="text-xs xs:text-sm md:text-base font-semibold"
                              className="bg-red-500"
                            />
                            <p className="text-xs xs:text-sm text-gray-400">
                              Based On {data?.reseller[0]?.review_count} Customer Reviews
                            </p>
                          </div>
                        </div>
                        <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-5">
                          {data?.reviews?.map((item, index) => (
                            <ReviewCard key={index} data={item}/>
                          ))}
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                        {data?.product?.map((item, index) => (
                          <ProductCard key={index} data={item} />
                        ))}
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-12 lg:col-span-4  ">
                          <div className="p-3 lg:p-4 bg-white rounded-md">
                            <div className="relative w-full flex items-center gap-2 my-5">
                              <img
                                src={data?.reseller[0].profile ? data?.reseller[0].profile : PlaceholderLogo}
                                alt="Profile"
                                className={`w-10 md:w-16 h-10 md:h-16 object-cover rounded-full`}
                              />

                              <div className="flex flex-col">
                                <h4 className="text-base md:text-xl">{`${data?.reseller[0].first_name} ${data?.reseller[0].last_name}`}</h4>
                                <p className="text-[9px] xs:text-xs">
                                  Vibrant, engaging content creator sharing joy, trends, and creativity
                                </p>
                              </div>
                            </div>
                            <div className="w-full flex flex-col gap-1 md:gap-2 mt-2 md:mt-4 text-[10px] xs:text-xs md:text-base px-2 md:px-4 py-2 rounded-md">
                              <div className="w-full flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                  <Icon className="w-3 md:w-4 h-3 md:h-4" icon="mdi:people-group" />
                                  Followers
                                </span>
                                <span className="">{data?.followers}</span>
                              </div>
                              <div className="w-full flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                  <img className="w-3 md:w-4 h-3 md:h-4 object-cover" src={individual} alt="" />
                                  Following
                                </span>
                                <span className="">{data?.following}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                          {data?.reels?.map((item, index) => (
                            <div key={index} className="col-span-1 ">
                              <ShortCard
                                className="h-[200px] xs:h-[300px] sm:h-[370px] md:h-[300px]"
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
                          <div key={index} className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3">
                            <LiveCard data={item} />
                          </div>
                        ))}
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
            <ReviewModal active={active} handleClose={() => setActive(false)} submitData={handleSubmit} />
          </div>
          {userType === 1 && (
            <Link
              className="fixed bottom-2 right-2 font-light text-secondary-200 tracking-wide z-50 py-2 px-4 rounded-md bg-primary-900 flex items-center gap-2"
              to="/dashboard/user/chat"
            >
              Chat <Icon className="w-[20px] h-[20px]" icon="bi:chat-dots" />
            </Link>
          )}
          {userType && (
            <button type="button" className="btn btn-primary fixed bottom-8 left-8" onClick={() => setActive(true)}>
              Write Review
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ResellerProfile;
