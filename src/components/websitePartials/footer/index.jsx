import footerlogo from "../../../assets/images/logo/logo-white.png";
import { Link } from "react-router-dom";
import payments from "../../../assets/images/all-img/footer-payments.png";
// import Pay from "../../../assets/images/paymentOptions/pay.png";
// import Payoneer from "../../../assets/images/paymentOptions/payneer.png";
// import MasterCard from "../../../assets/images/paymentOptions/mastercard.png";
// import Wire from "../../../assets/images/paymentOptions/wire.png";
// import Visa from "../../../assets/images/paymentOptions/visa.png";
// import Paypal from "../../../assets/images/paymentOptions/paypal.png";
// import GPay from "../../../assets/images/paymentOptions/gpay.png";

import AppStore from "../../../assets/images/app/appStore.png";
import AppleStore from "../../../assets/images/app/appleStore.png";
import QrCode from "../../../assets/images/app/qrcode.png";
import { websiteRoutes } from "../../../constant/routes";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";

function Footer() {
  const { categories } = useSelector((state) => state.categories);

  return (
    <>
      <footer className="text-gray-600 px-2 bg-main body-font">
        {/* {/ Logo start /} */}

        {/* {/ Logo end /} */}

        {/* {/  Container start /} */}

        <div className="container  lg:px-5 md:px-3 px-2 py-10 mx-auto flex items-center lg:items-start flex-col">
          <div className="grid xl:grid-cols-12 w-full lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-6 grid-cols-1  gap-5 gap-y-10">
            {/* {/  shipping details start /} */}

            <div className="md:col-span-6 col-span-12 w-full md:text-left space-y-4 ">
              <div className="w-full flex justify-center xs:justify-start">
                <Link to={websiteRoutes.home}>
                  <img className="w-[12rem] xs:w-[15rem]" src={footerlogo} alt="" />
                </Link>
              </div>
              <h1 className="text-xl font-semibold text-white text-center xs:text-start">
                Shop Around the World with VShop Global Collection
              </h1>

              <p className="mt-2 w-[100%] text-center xs:text-justify text-[13px] font-semibold text-[#d4d4d4] ">
                Embark on a global shopping adventure with VShop Global Collection. Discover an eclectic array of
                products from around the world, curated for style and quality. Elevate your shopping experience and
                explore diverse cultures without leaving your home.
              </p>
            </div>

            {/* {/  shipping details end /} */}

            {/* {/  Costomer Support start /} */}

            <div className="md:col-span-2 sm:col-span-3 col-span-12 flex flex-col items-center xs:items-start gap-3">
              <h1 className="text-xl font-semibold text-white">Customer Care</h1>

              <ul className="flex flex-col items-center xs:items-start gap-1">
                <Link to={websiteRoutes.helpCenter}>
                  <li className="footer-link">Help Center</li>
                </Link>
                <Link to={websiteRoutes.refundPolicy}>
                  <li className="footer-link">Returns & Refunds</li>
                </Link>
                <Link to={websiteRoutes.purchaseProtection}>
                  <li className="footer-link">Purchase Protection</li>
                </Link>
                <Link to={websiteRoutes.contact}>
                  <li className="footer-link">Contact Us</li>
                </Link>
                <Link to={websiteRoutes.termsAndConditions}>
                  <li className="footer-link">Terms & Conditions</li>
                </Link>
                <Link to={websiteRoutes.privacyPolicy}>
                  <li className="footer-link">Privacy Policy</li>
                </Link>
                <Link to={websiteRoutes.pricingPlans}>
                  <li className="footer-link">Pricing Plans</li>
                </Link>
              </ul>
            </div>

            {/* {/  Costomer Support end /} */}

            {/* {/  V Shop start /} */}

            <div className="md:col-span-2 sm:col-span-3 col-span-12 flex flex-col items-center xs:items-start gap-3">
              <h1 className="text-xl font-semibold text-white ">V Shop</h1>
              <ul className="flex flex-col items-center xs:items-start gap-1">
                <Link to={websiteRoutes.about}>
                  <li className="footer-link">About Us</li>
                </Link>

                <Link to={websiteRoutes.productListing}>
                  <li className="footer-link">Products</li>
                </Link>

                <Link to={websiteRoutes.sellerListing}>
                  <li className="footer-link">Sellers</li>
                </Link>

                <Link to={websiteRoutes.resellerListing}>
                  <li className="footer-link">Resellers</li>
                </Link>

                <Link to={websiteRoutes.shorts}>
                  <li className="footer-link">Shorts</li>
                </Link>
                {/* <Link to={websiteRoutes.chat}>
                  <li className="footer-link">Chat</li>
                </Link> */}
                <Link to={websiteRoutes.properties}>
                  <li className="footer-link">Properties</li>
                </Link>
                <Link to={websiteRoutes.vehicleListing}>
                  <li className="footer-link">Cars</li>
                </Link>
              </ul>
            </div>

            {/* {/  V Shop end /} */}

            {/* {/  Category start /} */}

            <div className="md:col-span-2 sm:col-span-3 col-span-12 flex flex-col items-center xs:items-start gap-3">
              <h1 className="text-xl font-semibold text-white">Category</h1>

              <ul className="flex flex-col items-center xs:items-start gap-1">
                {categories.slice(0, 8).map((item) => (
                  <Link to={`${websiteRoutes.category}/${item.url}`} key={item.url}>
                    <li className="footer-link">{item.name}</li>
                  </Link>
                ))}
              </ul>
            </div>

            {/* {/  Categoryend /} */}

            {/* {/  Top Properties start /} */}

            <div className=" md:col-span-2 sm:col-span-3 col-span-12 flex flex-col items-center xs:items-start gap-3">
              <h1 className="text-xl font-semibold text-white ">Top Properties</h1>

              <ul className="flex flex-col items-center xs:items-start gap-1"></ul>
            </div>

            {/* {/ Top Properties end /} */}

            {/* {// Top Cars start //} */}

            <div className="md:col-span-2 sm:col-span-6 col-span-12 flex flex-col items-center xs:items-start gap-3">
              <h1 className="text-xl font-semibold text-white ">Top Cars</h1>

              <ul className="flex flex-col items-center xs:items-start gap-1"></ul>
            </div>

            {/* {// Top Cars end //} */}

            {/* {/  Payment Methods start /} */}

            <div className="lg:col-span-3 md:col-span-5 sm:col-span-6 col-span-12 flex flex-col items-center xs:items-start gap-3">
              <h1 className="text-xl font-semibold text-white sm:text-start text-center">Payment Method</h1>

              <img className="w-[250px] xs:w-[300px]" src={payments} alt="payment logos" />
            </div>
            {/* {/ Payment Methods end /} */}

            {/* AppLinks */}
            <div className="md:col-span-3 sm:col-span-6 col-span-12 flex flex-col items-center xs:items-start gap-3">
              <h1 className="text-xl font-semibold text-white sm:text-start text-center">Download App</h1>

              <ul className="flex flex-wrap sm:justify-start justify-center gap-1">
                <div className="flex flex-col">
                  <Link>
                    {" "}
                    <li className="flex items-center">
                      <div className="flex p-1 ">
                        <img className="w-28" src={AppStore} alt="" />
                      </div>
                    </li>
                  </Link>

                  <Link>
                    {" "}
                    <li className="flex  ">
                      <div className="flex p-1 ">
                        <img className="w-28" src={AppleStore} alt="" />
                      </div>
                    </li>
                  </Link>
                </div>

                <Link>
                  {" "}
                  <li className="flex  ">
                    <div className="flex p-1 ">
                      <img className="w-[3rem] xs:w-[4.5rem]" src={QrCode} alt="" />
                    </div>
                  </li>
                </Link>
              </ul>
            </div>

            {/* {// Reseller start //} */}

            <div className="md:col-span-2 sm:col-span-6 col-span-12 flex flex-col items-center xs:items-start gap-3">
              <h1 className="text-xl font-semibold text-white ">Social Media</h1>

              <div className="flex items-center flex-wrap gap-4">
                <Icon className="w-8 h-8 flex-grow-0" icon="devicon:facebook" />
                <Icon className="w-8 h-8 flex-grow-0" icon="skill-icons:instagram" />
                <Icon className="w-8 h-8 flex-grow-0" icon="logos:whatsapp-icon" />{" "}
                <Icon className="w-8 h-8 flex-grow-0" icon="skill-icons:twitter" />
              </div>
            </div>

            {/* {// Reseller end //} */}
          </div>
        </div>
        {/* {/ Container  end /} */}

        {/* {/ Copyright  start /} */}

        <div className=" flex justify-center items-center border-t  py-3">
          <div className=" flex   ">
            <p className="text-white text-sm my-5 sm:text-start text-center ">
              Copyright © 2024 - 2025 VIEWNSHOP®. All rights reserved.
            </p>
          </div>
        </div>
        {/* {/ Copyright  end /} */}
      </footer>
    </>
  );
}

export default Footer;
