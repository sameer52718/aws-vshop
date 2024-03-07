/* eslint-disable react/prop-types */
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { DashboardLinks, profileSwitchTypes } from "../../../constant/data";
import { userDashboardRoutes, websiteRoutes } from "../../../constant/routes";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import LoginMenu from "./login-menu";
import avatar from "../../../assets/images/icon/individual.png";
import switchProfile from "../../../assets/images/icon/switch.png";
import seller from "../../../assets/images/all-img/seller2.png";
import reseller from "../../../assets/images/all-img/reseller2.png";
import wishlist from "../../../assets/images/icon/wishlist.png";
import cart from "../../../assets/images/icon/cart-trail.png";

const SessionMenu = ({ setActive, handleSwitch, handleLogout }) => {
  const { subtotal } = useSelector((state) => state.cart);
  const { userType, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end xl:gap-6 lg:gap-1 gap-3 w-full">
      {userType ? (
        <>
          {/* profile dropdown start */}
          <Menu as="div" className="relative inline-block text-left z-[9]">
            <div>
              <Menu.Button className="inline-flex w-full gap-1 text-black-500 justify-center items-center rounded-md bg-black/20 mr-5 mt-2 text-sm font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                <img
                  className="w-5 h-5 object-cover rounded-full"
                  src={avatar}
                  alt=""
                />
                <div className="flex flex-col items-start">
                  <span>
                    {userType === 4
                      ? "Guest"
                      : user?.first_name + " " + user?.last_name}
                  </span>
                  <span
                    className={`text-[10px] capitalize text-gray-500 rounded-md tracking-wide -mt-2`}
                  >
                    {userType === 1
                      ? "User"
                      : userType === 2
                      ? "Shop"
                      : userType === 3
                      ? "Reseller"
                      : ""}
                  </span>
                </div>
              </Menu.Button>
            </div>
            <Transition
              as="div"
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-2 mt-0 w-60 p-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-black/5 focus:outline-none z-[99999999999999999999999999999999999999]">
                <div className="px-1 py-1 ">
                  {userType === 4 ? (
                    <Link
                      to="/user/login"
                      className="text-[10px] p-2 hover:bg-black-100 sm:text-sm "
                    >
                      Profile Registration
                    </Link>
                  ) : (
                    <Menu.Item as="div">
                      <Link
                        to={DashboardLinks[parseInt(userType)].link}
                        className="flex items-center gap-1 text-[10px] p-2 hover:bg-black-100 sm:text-sm"
                      >
                        <Icon
                          className="w-4 h-4"
                          icon="ant-design:home-outlined"
                        />
                        Dashboard
                      </Link>
                    </Menu.Item>
                  )}

                  {parseInt(userType) === 1 && (
                    <>
                      <Menu.Item as="button" className={"w-full"}>
                        <div
                          onClick={
                            parseInt(userType) === 1
                              ? () => navigate(userDashboardRoutes.wishlist)
                              : () => setActive(true)
                          }
                          className="flex items-center gap-1 text-[10px] sm:text-sm  p-2 hover:bg-black-100 cursor-pointer "
                        >
                          <img
                            className="w-[14px] h-[14px] "
                            src={wishlist}
                            alt=""
                          />
                          <span>Wishlist</span>
                        </div>
                      </Menu.Item>
                    </>
                  )}

                  <Menu.Item
                    as="button"
                    onClick={handleLogout}
                    className={"w-full"}
                  >
                    <div className="flex items-center gap-1 text-[10px] sm:text-sm p-2 hover:bg-black-100 cursor-pointer">
                      <Icon className="w-4  h-4 " icon={"line-md:logout"} />
                      <span>Logout</span>
                    </div>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* profile dropdown end */}
          {/* profile swith start */}
          <Menu as="div" className="relative inline-block text-left z-[9]">
            <div>
              <Menu.Button className="inline-flex w-full gap-1 text-black-500 justify-center rounded-md bg-black/20 mr-5 mt-2 text-sm font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                <img
                  className="w-4 h-4 object-cover  "
                  src={switchProfile}
                  alt=""
                />
                <span>Switch To</span>
              </Menu.Button>
            </div>
            <Transition
              as="div"
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-2 mt-0 w-60 p-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-black/5 focus:outline-none z-[99999999999999999999999999999999999999]">
                <div className="px-1 py-1 ">
                  {(parseInt(userType) === 2 || parseInt(userType) === 3) && (
                    <Menu.Item
                      as="button"
                      className={"w-full"}
                      onClick={() =>
                        handleSwitch({
                          switchTo: profileSwitchTypes.user,
                          type: 1,
                        })
                      }
                    >
                      <div className="flex items-center gap-1 text-[10px] sm:text-sm p-2 hover:bg-black-100 cursor-pointer">
                        <img
                          className="w-[14px] h-[14px] object-cover"
                          src={avatar}
                          alt="User Icon"
                        />
                        <span>Switch to User</span>
                      </div>
                    </Menu.Item>
                  )}
                  {(parseInt(userType) === 1 || parseInt(userType) === 3) && (
                    <Menu.Item
                      as="button"
                      className={"w-full"}
                      onClick={() =>
                        handleSwitch({
                          switchTo: profileSwitchTypes.seller,
                          type: 2,
                        })
                      }
                    >
                      <div className="flex items-center gap-1 text-[10px] sm:text-sm p-2 hover:bg-black-100 cursor-pointer">
                        <img
                          className="w-4 h-4 object-cover"
                          src={seller}
                          alt="Seller Icon"
                        />
                        <span>Switch to Shop</span>
                      </div>
                    </Menu.Item>
                  )}
                  {(parseInt(userType) === 1 || parseInt(userType) === 2) && (
                    <Menu.Item
                      as="button"
                      className={"w-full"}
                      onClick={() =>
                        handleSwitch({
                          switchTo: profileSwitchTypes.reseller,
                          type: 3,
                        })
                      }
                    >
                      <div className="flex items-center gap-1 text-[10px] sm:text-sm p-2 hover:bg-black-100 cursor-pointer">
                        <img
                          className="w-4 h-4 object-cover"
                          src={reseller}
                          alt="Reseller Icon"
                        />
                        <span>Switch to Reseller</span>
                      </div>
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </>
      ) : (
        <div className="flex items-center justify-end xl:gap-6 lg:gap-1 gap-3 ">
          <LoginMenu />
          <Link
            to={"/login"}
            className="flex items-center text-xs xl:text-sm gap-1 ml-2 px-2 xl:px-4 rounded-full border-2 xl:border-[3px] border-main font-semibold"
          >
            <Icon className="w-3 h-3" icon="fa6-solid:plus" /> Sell
          </Link>
          <div
            onClick={
              parseInt(userType) === 1
                ? () => navigate(userDashboardRoutes.wishlist)
                : () => setActive(true)
            }
            className="flex items-center gap-1 ml-2 cursor-pointer"
          >
            <img className="w-3 xl:w-4 h-3 xl:h-4 " src={wishlist} alt="" />
            <h1 className="text-xs xl:text-sm">Wishlist</h1>
          </div>
        </div>
      )}

      <div
        onClick={
          parseInt(userType) === 1 || parseInt(userType) === 4
            ? () => navigate(websiteRoutes.cart)
            : () => setActive(true)
        }
        className="flex gap-1 rounded-3xl items-center text-base p-2 cursor-pointer"
      >
        <img className="w-4 h-4 " src={cart} alt="" />
        <p className="text-xs xl:text-sm font-bold truncate">{`${parseInt(
          subtotal
        ).toFixed(2)} PKR`}</p>
      </div>
    </div>
  );
};

export default SessionMenu;
