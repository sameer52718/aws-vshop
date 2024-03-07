// import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {websiteRoutes} from "../../../constant/routes"
const BlinkerMenu = () => {
  // const timeoutRef = useRef(null);
  // const [blinkerMenu, setBlinkerMenu] = useState(false);
  // useEffect(() => {
  //   timeoutRef.current = setInterval(function () {
  //     setBlinkerMenu((prev) => !prev);
  //   }, 1000);
  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  return (
    <>
    <div className="flex items-center gap-2">
      {/* <div className={`w-3 h-3  rounded-full ${blinkerMenu? "bg-red-400": "bg-white" }`}/> */}
      <div className="example-1"/>

      <Link to={websiteRoutes.pricingPlans} className="text-sm text-gray-600 font-semibold">Pricing Plan</Link>
    </div>
      {/* {blinkerMenu && (
        <>
          <div className="triangle"></div>
          <div className="blinker-Menu">
            <h6>View Pricing Plans of View and shop</h6>
            <div className="bottom-part">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia unde sunt necessitatibus esse quam. Doloremque.
              </p>
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </>
      )} */}
    </>
  );
};

export default BlinkerMenu;