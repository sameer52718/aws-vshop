import sellerImg from "../../../assets/images/all-img/seller.png";
import resellerImg from "../../../assets/images/all-img/reseller.png";
import { Link } from "react-router-dom";
import { websiteRoutes } from "../../../constant/routes";

const SelectLogin = () => {
  return (
    <section className="container flex flex-col gap-5 lg:gap-10 lg:flex-row lg:justify-center items-center py-10">
      <Link
        to={websiteRoutes.sellerSignup}
        className="flex flex-col justify-center items-center bg-main text-white p-5 md:px-10 rounded-md h-[250px] md:h-[320px] sm:w-[550px]"
      >
        <img className="w-14 md:w-20 h-14 md:h-20" src={sellerImg} alt="" />
        <h3 className="text-white font-semibold text-lg md:text-3xl">
          Create a Shop
        </h3>{" "}
        <p className="text-[10px] md:text-sm mt-2 md:mt-4 text-center">
          Dynamic e-commerce seller offering top-quality products, seamless
          transactions, and exceptional customer service. Elevate your shopping
          experience with us today!
        </p>
      </Link>
      <Link
        to={websiteRoutes.resellerSignup}
        className="flex flex-col justify-center items-center bg-main text-white p-5 md:px-10 rounded-md h-[250px] md:h-[320px] sm:w-[550px]"
      >
        <img className="w-14 md:w-20 h-14 md:h-20" src={resellerImg} alt="" />
        <h3 className="text-white font-semibold text-lg md:text-3xl">
          Reseller
        </h3>{" "}
        <p className="text-[10px] md:text-sm mt-2 md:mt-4 text-center">
          Curated e-commerce reseller providing premium products. Elevate your
          lifestyle with our handpicked selection. Quality, style, and value
          guaranteed!
        </p>
      </Link>
    </section>
  );
};

export default SelectLogin;
