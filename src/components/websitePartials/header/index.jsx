import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../../../assets/images/logo/logo.svg";
import compare from "../../../assets/images/icon/compare.png";
import delivery from "../../../assets/images/icon/delivery.png";
import shopping from "../../../assets/images/icon/cart-bag.png";
import { Dropdown } from "primereact/dropdown";
import useScrollHandler from "../../../hooks/useScrollHandler";
import { websiteRoutes } from "../../../constant/routes";
import { useSelector, useDispatch } from "react-redux";
import {
  resellerLogout,
  sellerLogout,
  switchProfile,
  userLogout,
} from "../../../constant/apiRoutes";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchCart } from "../../../store/cart/slice";
import LoginModal from "../loginmodal";
import BlinkerMenu from "./Blinker";
import axios from "axios";
import { clearAuth, setAuth } from "../../../store/auth/store";
import { toast } from "react-toastify";
import SessionMenu from "./session-menu";
import ResponsiveSessionMenu from "./responsive-session-menu";
import { ResponsiveCategoriesAside } from "./responsive-categories-aside";

const schema = yup.object({
  search: yup.string().required("Search is Required"),
  category: yup.object(),
});

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userType, token, user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.compare);
  const [sidebar, setSidebar] = useState(false);
  const [rightSidebar, setRightSidebar] = useState(false);
  const [active, setActive] = useState(false);
  const fixed = useScrollHandler();

  const { handleSubmit, register, control } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    let link = `/search-results?search=${data.search}`;
    if (data?.category?.category_id) {
      link = link + `&category=${data?.category?.category_id}`;
    }
    navigate(link);
  };

  useEffect(() => {
    if (token !== null && user !== null && parseInt(userType) === 1) {
      dispatch(fetchCart(token));
    }
  }, [dispatch, token, user, userType]);

  async function handleLogout() {
    try {
      const endpoint = new Map([
        [1, userLogout],
        [2, sellerLogout],
        [3, resellerLogout],
      ]);
      if (userType !== 4) {
        const { data } = await axios.get(endpoint.get(userType), {
          headers: { Authorization: token },
        });
        if (data.error === false) {
          dispatch(clearAuth());
          location.reload();
        } else {
          toast.error(data.message);
        }
      } else {
        dispatch(clearAuth());
        location.reload();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleSwitch = async ({ switchTo, type }) => {
    try {
      const endpoint = new Map([
        [1, `${websiteRoutes.userRegister}?switch=true`],
        [2, `${websiteRoutes.sellerSignup}?switch=true`],
        [3, `${websiteRoutes.resellerSignup}?switch=true`],
      ]);
      const { data } = await axios.post(
        switchProfile,
        { switch: switchTo },
        { headers: { Authorization: token } }
      );
      if (data.error === false) {
        if (data.found === true) {
          dispatch(
            setAuth({
              token: data.data.token,
              user: data.data.account[0],
              userType: type,
            })
          );
        } else if (data.found === false) {
          navigate(endpoint.get(type));
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <header className={`bg-black-50 pt-10 lg:pt-0`}>
        {/* Top Part Start */}
        <div className=" justify-between items-center hidden lg:flex px-2 py-3 ">
          <span className="text-xs xl:text-sm text-gray-600 font-semibold">
            Welcome to VIEWNSHOP Video E-commerce
          </span>
          <div className="flex items-center gap-5 ">
            <div className="relative">
              <BlinkerMenu />
            </div>
            <Link
              className="flex items-center gap-1 relative"
              to={websiteRoutes.compare}
            >
              <img className="w-4 h-4 " src={compare} alt="" />
              <h1 className="text-xs xl:text-sm text-gray-500">
                Compare{" "}
                <span className="bg-main rounded-full w-4 h-4 text-white text-xs absolute flex justify-center items-center -top-1 -right-3">
                  {products.length}
                </span>
              </h1>
            </Link>
            <div className="flex items-center gap-1">
              <img className="w-4 h-4 " src={delivery} alt="" />
              <h1 className="text-xs xl:text-sm text-gray-500">
                {" "}
                Track Your Order{" "}
              </h1>
            </div>
            <Link
              to={websiteRoutes.productListing}
              className="flex items-center gap-1"
            >
              <img className="w-4 h-4 " src={shopping} alt="" />
              <h1 className="text-gray-500 text-xs xl:text-sm ">Shoping</h1>
            </Link>
            <span className="text-xs xl:text-sm text-gray-600 font-semibold">
              Need help : +92 000 0000 000
            </span>
          </div>
        </div>

        {/* Responsive Header Start */}
        <div
          className={`lg:hidden flex justify-between px-2 items-center w-full fixed top-0 bg-black-50  z-[999999999999999]`}
        >
          <Link to={websiteRoutes.home} className="flex item items-center p-2">
            <img className="w-32" src={logo} alt="" />
          </Link>

          <div className="flex justify-end items-center">
            <Link
              to={"/login"}
              className="flex items-center text-[9px] xs:text-xs gap-1 px-2 py-[2px] rounded-full border-[1px] border-main font-semibold"
            >
              <Icon className="w-3 h-3" icon="fa6-solid:plus" /> Sell
            </Link>

            <div className="flex items-center p-2 gap-5 text-black ">
              <Icon
                onClick={() => setSidebar(true)}
                className=" w-6 h-6"
                icon="ion:menu-outline"
              />
            </div>

            <ResponsiveSessionMenu
              setActive={setActive}
              handleLogout={handleLogout}
              handleSwitch={handleSwitch}
            />
          </div>
        </div>
        {/* Responsive Header End*/}

        {/* Desktops HEADER Start*/}
        <div
          className={`w-full lg:flex hidden items-center px-2 py-3 z-[1000000000000] ${
            fixed ? "fixed top-0 z-30 w-[100vw] bg-black-50" : ""
          }`}
        >
          <div className="w-[20%]  flex items-center">
            <Link
              to={websiteRoutes.home}
              className=" flex items-center cursor-pointer "
            >
              <img className="w-40 xl:w-48" src={logo} alt="" />
            </Link>
          </div>

          <div className="w-[44%] xl:w-[48%]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative flex left-3 w-full ">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        options={categories}
                        optionLabel="name"
                        placeholder="Select Category"
                        className="min-w-[8rem] xl:min-w-[10rem] text-xs bg-gray-50 pt-0 pb-[2px] h-9 xl:h-11 rounded-none relative"
                        panelClassName="max-w-[14rem] fixed top-16"
                        pt={{
                          item: {
                            className: "text-xs xl:text-xs py-[0.4rem]",
                          },
                          input: {
                            className: "text-xs px-[0.4rem]",
                          },
                          wrapper: { className: "!max-h-[400px] scrollbar" },
                        }}
                      />
                    </div>
                  )}
                />
                <div className="relative items-center h-8 xl:h-10 w-full">
                  <input
                    type="text"
                    className="block p-3 w-[95%] z-20 h-9 xl:h-11 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300  outline-none    dark:placeholder-gray-400 dark:text-white "
                    placeholder="Search Products here..."
                    {...register("search")}
                    name="search"
                  />

                  <button
                    type="submit"
                    className="absolute top-0 right-[14px] end-0 py-[2px] xl:py-1 px-4 xl:px-6 text-sm font-medium h-9 xl:h-11 text-white bg-main rounded-e-lg border border-main  focus:outline-none focus:ring-main dark:bg-main dark:hover:bg-main dark:focus:ring-main"
                  >
                    <Icon
                      className="w-5 xl:w-6 h-5 xl:h-6"
                      icon="ic:outline-search"
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="w-[36%] xl:w-[32%]">
            <SessionMenu
              setActive={setActive}
              handleSwitch={handleSwitch}
              handleLogout={handleLogout}
            />
          </div>
        </div>
        {/* Desktops HEADER End*/}
      </header>
      <aside
        className={`fixed top-0 left-0 w-64 h-screen transition-transform z-[1000000000000] ${
          sidebar ? "-translate-x-0" : "-translate-x-full"
        }  `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <h4 className="px-2 py-3 text-xl font-bold flex justify-between">
            Categories{" "}
            <Icon
              icon={"charm:cross"}
              className="cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </h4>
          <ul className="space-y-2 font-medium">
            {/* <TreeMenu /> */}
            <ResponsiveCategoriesAside />
          </ul>
        </div>
      </aside>
      <aside
        className={`fixed top-0 right-0 z-40 w-64 h-screen transition-transform ${
          rightSidebar ? "translate-x-0" : "translate-x-full"
        }  `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <h4 className="px-2 py-3 text-xl font-bold flex justify-between">
            <Icon
              icon={"charm:cross"}
              className="cursor-pointer"
              onClick={() => setRightSidebar(false)}
            />{" "}
          </h4>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={websiteRoutes.userLogin}
                className="flex items-center p-1 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <Icon width={20} height={20} icon="line-md:account" />
                <span className="ms-3">LogIn</span>
              </Link>
            </li>
            <li>
              <Link
                to={websiteRoutes.userRegister}
                className="flex items-center p-1 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <Icon width={20} height={20} icon="line-md:account" />
                <span className="ms-3">SignUp</span>
              </Link>
            </li>
            <li>
              <Link
                to={websiteRoutes.compare}
                className="flex items-center p-1 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <Icon width={20} height={20} icon="uil:exchange" />
                <span className="ms-3">Compare</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <LoginModal active={active} handleClose={() => setActive(false)} />
    </>
  );
};

export default Header;
