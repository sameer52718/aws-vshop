/* eslint-disable react/prop-types */
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { DashboardLinks, profileSwitchTypes } from "../../../constant/data";
import { userDashboardRoutes, websiteRoutes } from "../../../constant/routes";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../assets/images/icon/individual.png";
import switchProfile from "../../../assets/images/icon/switch.png";
import seller from "../../../assets/images/all-img/seller2.png";
import reseller from "../../../assets/images/all-img/reseller2.png";
import wishlist from "../../../assets/images/icon/wishlist.png";
import cart from "../../../assets/images/icon/cart-trail.png";
import compare from "../../../assets/images/icon/compare.png";
import delivery from "../../../assets/images/icon/delivery.png";
const ResponsiveSessionMenu = ({ setActive, handleSwitch, handleLogout }) => {
  const { products } = useSelector((state) => state.compare);
  const { userType } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const items = [
    { link: "/user/login", label: "Login As User", img: avatar },
    { link: "/seller/login", label: "Shop Login", img: seller },
    { link: "/reseller/login", label: "Login As Reseller", img: reseller },
  ];

  return (
    <>
      <Menu as="div" className="relative inline-block text-left z-[999]">
        <div>
          <Menu.Button className="inline-flex w-full text-black-500 justify-center rounded-md bg-black/20 mr-5 mt-2 text-sm font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <img
              className="w-5 h-5 object-cover rounded-full "
              src={avatar}
              alt="profile logo"
            />
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
          <Menu.Items className="absolute right-2 mt-2 w-44 px-2 py-4 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-black/5 focus:outline-none z-[99999999]">
            <div className="px-1 py-1 ">
              {userType ? (
                <>
                  <Menu.Item as="div">
                    <Link
                      to={DashboardLinks[parseInt(userType)].link}
                      className="flex items-center gap-1 text-[10px] p-2 hover:bg-black-100"
                    >
                      <Icon
                        className="w-4 h-4"
                        icon="ant-design:home-outlined"
                      />
                      {DashboardLinks[parseInt(userType)].name}
                    </Link>
                  </Menu.Item>

                  {parseInt(userType) === 1 && (
                    <Menu.Item as="div">
                      <div
                        onClick={
                          parseInt(userType) === 1
                            ? () => navigate(userDashboardRoutes.wishlist)
                            : () => setActive(true)
                        }
                        className="flex items-center gap-1 text-[10px]  p-2 hover:bg-black-100 cursor-pointer "
                      >
                        <img
                          className="w-[14px] h-[14px] "
                          src={wishlist}
                          alt=""
                        />
                        <span>Wishlist</span>
                      </div>
                    </Menu.Item>
                  )}

                  <Menu.Item as="div">
                    <Link
                      className="flex items-center gap-1 text-[10px] p-2 hover:bg-black-100 cursor-pointer"
                      to={websiteRoutes.compare}
                    >
                      <img
                        className="w-[14px] h-[14px] "
                        src={compare}
                        alt=""
                      />
                      <span className="text-[10px] relative">
                        Compare{" "}
                        <span className="bg-main rounded-full w-3 h-3 text-white text-[8px] absolute flex justify-center items-center -top-1 -right-2">
                          {products.length}
                        </span>
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item as="div">
                    <div className="flex gap-3 text-[10px] p-2 hover:bg-black-100 cursor-pointer">
                      <span className="inline-flex items-center gap-1">
                        <img className="w-[14px] h-[14px] " src={cart} alt="" />
                        <span>0.00 PKR</span>
                      </span>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="flex gap-3 text-[10px] p-2 hover:bg-black-100 cursor-pointer">
                      <span className="inline-flex items-center gap-1">
                        <img
                          className="w-[14px] h-[14px] "
                          src={delivery}
                          alt=""
                        />
                        <span>Track Your Order</span>
                      </span>
                    </div>
                  </Menu.Item>
                  <Menu.Item as="button" onClick={handleLogout}>
                    <div className="flex items-center gap-1 text-[10px] p-2 hover:bg-black-100 cursor-pointer">
                      <Icon className="w-4 h-4" icon={"line-md:logout"} />
                      <span type="button">Logout</span>
                    </div>
                  </Menu.Item>
                </>
              ) : (
                <>
                  {items.map((item) => (
                    <Menu.Item as="div" key={item.link}>
                      <div className="flex items-center gap-1 text-[10px] p-2 hover:bg-black-100 ">
                        <img
                          className="w-4 h-4 object-cover"
                          src={item.img}
                          alt=""
                        />
                        <Link className="" to={item.link}>
                          {item.label}
                        </Link>
                      </div>
                    </Menu.Item>
                  ))}
                  <Menu.Item as="div">
                    <div
                      onClick={
                        parseInt(userType) === 1
                          ? () => navigate(userDashboardRoutes.wishlist)
                          : () => setActive(true)
                      }
                      className="flex items-center gap-1 text-[10px] p-2 hover:bg-black-100 cursor-pointer "
                    >
                      <img
                        className="w-[14px] h-[14px] "
                        src={wishlist}
                        alt=""
                      />
                      <span>Wishlist</span>
                    </div>
                  </Menu.Item>
                  <Menu.Item as="div">
                    <Link
                      className=" flex items-center gap-1 text-[10px] p-2 hover:bg-black-100 cursor-pointer"
                      to={websiteRoutes.compare}
                    >
                      <img
                        className="w-[14px] h-[14px] "
                        src={compare}
                        alt=""
                      />
                      <span className="text-[10px] relative">
                        Compare
                        <span className="bg-main rounded-full w-3 h-3 text-white text-[8px] absolute flex justify-center items-center -top-1 -right-2">
                          {products.length}
                        </span>
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item as="div">
                    <div className="flex gap-3 text-[10px] p-2 hover:bg-black-100 cursor-pointer">
                      <span className="inline-flex items-center gap-1">
                        <img className="w-[14px] h-[14px] " src={cart} alt="" />
                        <span>0.00 PKR</span>
                      </span>
                    </div>
                  </Menu.Item>
                  <Menu.Item as="div">
                    <div className="flex gap-3 text-[10px] p-2 hover:bg-black-100 cursor-pointer">
                      <span className="inline-flex items-center gap-1">
                        <img
                          className="w-[14px] h-[14px] "
                          src={delivery}
                          alt=""
                        />
                        <span>Track Your Order</span>
                      </span>
                    </div>
                  </Menu.Item>
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {userType && (
        <Menu as="div" className="relative inline-block text-left z-[999]">
          <div>
            <Menu.Button className="inline-flex w-full text-black-500 justify-center rounded-md bg-black/20 mr-5 mt-2 text-sm font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              <img
                className="w-5 h-5 object-cover"
                src={switchProfile}
                alt="switch profile logo"
              />
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
            <Menu.Items className="absolute right-2 mt-2 w-44 px-2 py-4 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-black/5 focus:outline-none z-[99999999]">
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
                    <div className="flex items-center gap-1 text-[10px] p-2 hover:bg-black-100 cursor-pointer">
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
                    <div className="flex items-center gap-1 text-[10px] p-2 hover:bg-black-100 cursor-pointer">
                      <img
                        className="w-4 h-4 object-cover"
                        src={seller}
                        alt=""
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
                    <div className="flex items-center gap-1 text-[10px] p-2 hover:bg-black-100 cursor-pointer">
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
      )}
    </>
  );
};

export default ResponsiveSessionMenu;
