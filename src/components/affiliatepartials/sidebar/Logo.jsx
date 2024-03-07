import { Link } from "react-router-dom";
import useSidebar from "@/hooks/useSidebar";
import useSkin from "@/hooks/useSkin";

// import images
import MobileLogo from "@/assets/images/logo/logo.svg";
import MobileLogoWhite from "@/assets/images/logo/logo.svg";

const SidebarLogo = ({ menuHover }) => {
  const [collapsed, setMenuCollapsed] = useSidebar();
  // semi dark
  // skin
  const [skin] = useSkin();
  return (
    <div
      className={` logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  px-4 
      ${menuHover ? "logo-hovered" : ""}
      ${
        skin === "bordered"
          ? " border-b border-r-0 border-slate-200 dark:border-slate-700"
          : " border-none"
      }
      
      `}
    >
      <Link to="/">
        <div className="flex items-center space-x-4">
          <div className="logo-icon">
            {!collapsed || menuHover ? (
              <img className="w-[160px]" src={MobileLogo} alt="" />
            ) : (
              <img className="w-[160px]" src={MobileLogoWhite} alt="" />
            )}
          </div>
          {/* {(!collapsed || menuHover) && (
            <span className="pr-8 font-bold">{"View'N'Shop"}</span>
          )} */}
        </div>
      </Link>

      {(!collapsed || menuHover) && (
        <div
          onClick={() => setMenuCollapsed(!collapsed)}
          className={`h-4 w-4 border-[1.5px] border-slate-900 dark:border-slate-700 rounded-full transition-all duration-150
          ${
            collapsed
              ? ""
              : "ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-slate-400 bg-slate-900 dark:bg-slate-400 dark:ring-offset-slate-700"
          }
          `}
        ></div>
      )}
    </div>
  );
};

export default SidebarLogo;
