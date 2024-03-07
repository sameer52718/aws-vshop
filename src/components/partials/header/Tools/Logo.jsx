import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import MobileLogo from "@/assets/images/logo/logo.svg";
import MobileLogoWhite from "@/assets/images/logo/logo-white.svg";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="/">
        {width >= breakpoints.xl ? (
          <img
            className="w-20 xs:w-32 md:w-40"
            src={isDark ? LogoWhite : MainLogo}
            alt=""
          />
        ) : (
          <img
            className="w-20 xs:w-32 md:w-40"
            src={isDark ? MobileLogoWhite : MobileLogo}
            alt=""
          />
        )}
      </Link>
    </div>
  );
};

export default Logo;
