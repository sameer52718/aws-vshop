/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { NavLink, useLocation ,useNavigate} from "react-router-dom";
import { Collapse } from "react-collapse";
import Icon from "@/components/ui/Icon";
import { sellerLogout, switchProfile } from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearAuth, setAuth } from "../../../store/auth/store";
import { toast } from "react-toastify";
import axios from "axios";
import { websiteRoutes } from "../../../constant/routes";
import reseller from "../../../assets/images/all-img/reseller2.png";
import userIcon from "../../../assets/images/icon/individual.png";
import { profileSwitchTypes } from "../../../constant/data";

const Navmenu = ({ menus }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (i) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const location = useLocation();
  const locationName = location.pathname.replaceAll("/", " ");
  const locationtester = location.pathname;
  useEffect(() => {
    let submenuIndex = null;
    menus.map((item, i) => {
      if (!item.child) return;
      if (item.link === locationName) {
        submenuIndex = null;
      } else {
        const ciIndex = item.child.findIndex(
          (ci) => ci.childlink === locationName
        );
        if (ciIndex !== -1) {
          submenuIndex = i;
        }
      }
    });
    document.title = `VIEW'N'SHOP  | ${locationName}`;
    setActiveSubmenu(submenuIndex);
  }, [location]);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(sellerLogout, {
        headers: { Authorization: auth.token },
      });
      if (data.error === false) {
        dispatch(clearAuth());
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClick = (link) => {
    if (auth.user.approval === 1) {
      navigate(link);
    } else {
      toast.warn("Waiting for Shop Approval");
    }
  };

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
        { headers: { Authorization: auth.token } }
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
          navigate(`/dashboard/${switchTo}/home`);
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
      <ul>
        {menus.map((item, i) => (
          <li
            key={i}
            className={` single-sidebar-menu 
              ${item.child ? "item-has-children" : ""}
              ${activeSubmenu === i ? "open" : ""}
              ${locationtester === item.link ? "menu-item-active" : ""}`}
          >
            {/* single menu with no childred*/}

            {!item.child && !item.isHeadr && item.restricted && (
              <div className="menu-link" onClick={() => handleClick(item.link)}>
                <span className="menu-icon flex-grow-0">
                  <Icon icon={item.icon} />
                </span>
                <div className="text-box flex-grow">{item.title}</div>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </div>
            )}

            {!item.child && !item.isHeadr && !item.restricted && (
              <NavLink className="menu-link" to={item.link}>
                <span className="menu-icon flex-grow-0">
                  <Icon icon={item.icon} />
                </span>
                <div className="text-box flex-grow">{item.title}</div>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </NavLink>
            )}
            {/* only for menulabel */}
            {item.isHeadr && !item.child && (
              <div className="menulabel">{item.title}</div>
            )}
            {/*    !!sub menu parent   */}
            {item.child && (
              <div
                className={`menu-link ${
                  activeSubmenu === i
                    ? "parent_active not-collapsed"
                    : "collapsed"
                }`}
                onClick={() => toggleSubmenu(i)}
              >
                <div className="flex-1 flex items-start">
                  <span className="menu-icon">
                    <Icon icon={item.icon} />
                  </span>
                  <div className="text-box">{item.title}</div>
                </div>
                <div className="flex-0">
                  <div
                    className={`menu-arrow transform transition-all duration-300 ${
                      activeSubmenu === i ? " rotate-90" : ""
                    }`}
                  >
                    <Icon icon="heroicons-outline:chevron-right" />
                  </div>
                </div>
              </div>
            )}
            <Collapse isOpened={activeSubmenu === i}>
              <ul className="sub-menu ">
                {item.child?.map((subItem, j) => (
                  <li key={j} className="block pl-4 pr-1 mb-4 first:mt-4">
                    <NavLink to={subItem.childlink}>
                      {({ isActive }) => (
                        <span
                          className={`${
                            isActive
                              ? " text-black dark:text-white font-medium"
                              : "text-slate-600 dark:text-slate-300"
                          } text-sm flex space-x-3 items-center transition-all duration-150`}
                        >
                          <span
                            className={`${
                              isActive
                                ? " bg-slate-900 dark:bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20"
                                : ""
                            } h-2 w-2 rounded-full border border-slate-600 dark:border-white inline-block flex-none`}
                          ></span>
                          <span className="flex-1">{subItem.childtitle}</span>
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Collapse>
          </li>
        ))}
        <li
          className="single-sidebar-menu"
          onClick={() =>
            handleSwitch({ switchTo: profileSwitchTypes.user, type: 1 })
          }
        >
          <div className="menu-link">
            <span className="menu-icon flex-grow-0">
              <Icon icon="mdi:user" />
            </span>
            <div className="text-box flex-grow">Switch to User</div>
          </div>
        </li>
        <li
          className="single-sidebar-menu"
          onClick={() =>
            handleSwitch({ switchTo: profileSwitchTypes.reseller, type: 3 })
          }
        >
          <div className="menu-link">
            <span className="menu-icon flex-grow-0">
              <Icon icon="iconoir:verified-user" />
            </span>
            <div className="text-box flex-grow">Switch to Reseller</div>
          </div>
        </li>
        <li
          className="single-sidebar-menu "
          onClick={() => navigate(websiteRoutes.home)}
        >
          <div className="menu-link">
            <span className="menu-icon flex-grow-0">
              <Icon icon={"tabler:logout"} />
            </span>
            <div className="text-box flex-grow">Go to Website</div>
          </div>
        </li>

        <li className="single-sidebar-menu " onClick={handleLogout}>
          <div className="menu-link">
            <span className="menu-icon flex-grow-0">
              <Icon icon={"line-md:logout"} />
            </span>
            <div className="text-box flex-grow">Logout</div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Navmenu;
