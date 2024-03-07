import { useEffect, useState, Fragment } from "react";
import Card from "@/components/ui/Card";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { getUserFollow, imgUrl } from "@/constant/apiRoutes";
import { Tab } from "@headlessui/react";
import DashboardLoader from "@/components/DashboardLoader";
import NoProfile from "@/assets/images/avatar/NoProfile.png";
import userIcon from "../../../assets/images/avatar/NoProfile.png";
import sellerIcon from "../../../assets/images/all-img/seller.png";
import resellerIcon from "../../../assets/images/all-img/reseller.png";
import moment from "moment";
import { Icon } from "@iconify/react";
const Follow = () => {
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(getUserFollow, {
          headers: { Authorization: token },
        });
        if (data.error === false) {
          console.log(data.data);
          setData(data.data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [token]);

  return (
    <>
      {isLoading ? (
        <DashboardLoader />
      ) : (
        <Tab.Group>
          <Tab.List className="lg:space-x-8 md:space-x-4 space-x-2 flex justify-end mb-4">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`text-[9px] xs:text-sm font-medium mb-0 capitalize dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-0 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-1px] before:h-[1.5px] before:bg-main before:-translate-x-1/2 ${
                    selected
                      ? "text-main before:w-full"
                      : "text-slate-500 before:w-0 dark:text-slate-300"
                  }`}
                >
                  Followers
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`text-[9px] xs:text-sm font-medium mb-0 capitalize dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-0 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-1px] before:h-[1.5px] before:bg-main before:-translate-x-1/2 ${
                    selected
                      ? "text-main before:w-full"
                      : "text-slate-500 before:w-0 dark:text-slate-300"
                  }`}
                >
                  Followings
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="w-full">
            <Tab.Panel>
              <Card title={"Followers"}>
                <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {data?.followers?.map((item) => (
                    <Card className="!bg-gray-50 col-span-1" key={item.url}>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 md:w-14 h-10 md:h-14 ">
                            <img
                              className="w-full h-full object-cover rounded-full"
                              src={
                                item.image
                                  ? `${imgUrl}${item.image}`
                                  : NoProfile
                              }
                              alt={item.name}
                            />
                          </div>
                          <div>
                            <p className="text-[10px] xs:text-sm md:text-base font-semibold">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-1 text-[10px] xs:text-xs md:text-sm font-semibold">
                              <Icon className="" icon="mdi:clock-outline" />{" "}
                              {moment(item.time).fromNow(true)} ago
                            </div>
                            <button className="mt-1 bg-main text-white rounded-md text-[8px] xs:text-[10px] md:text-xs py-1 px-2 flex items-center w-max gap-1">
                              <Icon
                                icon="material-symbols:chat-outline"
                                className="w-3"
                              />{" "}
                              Chat{" "}
                            </button>
                          </div>
                        </div>
                        <div
                          className={`${
                            item.desgnation === "shop"
                              ? "bg-green-600 bg-opacity-80"
                              : item.desgnation === "user"
                              ? "bg-orange-600 bg-opacity-70"
                              : "bg-blue-700 bg-opacity-80"
                          } flex items-start gap-1 text-xs px-2 pt-1 capitalize text-white rounded-md tracking-wide absolute top-1 right-1`}
                        >
                          <img
                            className="w-3  h-3  object-contain"
                            src={
                              item.desgnation === "shop"
                                ? sellerIcon
                                : item.desgnation === "user"
                                ? userIcon
                                : resellerIcon
                            }
                            alt={
                              item.desgnation === "shop"
                                ? "seller Icon"
                                : "reseller Icon"
                            }
                          />
                          <span>{item.desgnation}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </Tab.Panel>
            <Tab.Panel>
              <Card title={"following"}>
                <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-baseline gap-4">
                  {data?.following?.map((item) => (
                    <Card
                      className="!bg-gray-100 col-span-1 relative"
                      key={item.url}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 md:w-14 h-10 md:h-14 ">
                            <img
                              className="w-full h-full object-cover rounded-full"
                              src={
                                item.image
                                  ? `${imgUrl}${item.image}`
                                  : NoProfile
                              }
                              alt={item.name}
                            />
                          </div>
                          <div>
                            <p className="text-[10px] xs:text-sm md:text-base font-semibold">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-1 text-[10px] xs:text-xs md:text-sm font-semibold">
                              <Icon className="" icon="mdi:clock-outline" />{" "}
                              {moment(item.time).fromNow(true)} ago
                            </div>
                            <button className="mt-1 bg-main text-white rounded-md text-[8px] xs:text-[10px] md:text-xs py-1 px-2 flex items-center w-max gap-1">
                              <Icon
                                icon="material-symbols:chat-outline"
                                className="w-3"
                              />{" "}
                              Chat{" "}
                            </button>
                          </div>
                        </div>
                        <div
                          className={`${
                            item.desgnation === "shop"
                              ? "bg-green-600 bg-opacity-80"
                              : item.desgnation === "user"
                              ? "bg-orange-600 bg-opacity-70"
                              : "bg-blue-700 bg-opacity-80"
                          } flex items-start gap-1 text-xs px-2 pt-1 capitalize text-white rounded-md tracking-wide absolute top-1 right-1`}
                        >
                          <img
                            className="w-3  h-3  object-contain"
                            src={
                              item.desgnation === "shop"
                                ? sellerIcon
                                : item.desgnation === "user"
                                ? userIcon
                                : resellerIcon
                            }
                            alt={
                              item.desgnation === "shop"
                                ? "seller Icon"
                                : "reseller Icon"
                            }
                          />
                          <span>{item.desgnation}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </>
  );
};

export default Follow;
