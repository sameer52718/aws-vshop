import { Rating } from "primereact/rating";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ReactPlayer from "react-player/lazy";
import {
  productThumbnailRoute,
  productVideoRoute,
  updateWishlist,
} from "../../../constant/apiRoutes";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Thumbnail from "../../../assets/images/vectors/thumbnail.png";
import LoginModal from "../loginmodal";
import ProductQuickView from "../productquickview";
import { useState } from "react";
import { setCompare } from "../../../store/compare/slice";
import { websiteRoutes } from "../../../constant/routes";

const ProductCard = ({ index, data, buy, btnBuy }) => {
  const navigate = useNavigate();
  const { token, userType } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [quickView, setQuickView] = useState(false);

  const handleClick = (url) => {
    navigate(`/product/${url}`);
  };

  const handleWishlist = async (url) => {
    try {
      if (!token) {
        setActive(true);
        return;
      }
      if (userType !== 1) {
        toast.error("You Have to Switch As User");
        return;
      }
      const { data } = await axios.post(
        updateWishlist,
        { url },
        { headers: { Authorization: token } }
      );
      if (data.error === false) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCompare = ({ url, subcategory_id }) => {
    const hasEnoughProducts = products.length >= 2;
    const isSameSubcategory = products.every(
      (item) => parseInt(item.subcategory_id) === parseInt(subcategory_id)
    );
    const isProductAlreadyAdded = products.some((item) => item.url === url);

    const addProductToComparison = () => {
      dispatch(setCompare({ url, subcategory_id }));
    };

    if (hasEnoughProducts) {
      toast.error("Only Two Products are allowed");
    } else if (products.length > 0) {
      if (isSameSubcategory) {
        if (isProductAlreadyAdded) {
          toast.error("This Product Already Added");
        } else {
          addProductToComparison();
          navigate(websiteRoutes.compare);
        }
      } else {
        toast.error("Irrelavent Comparision");
      }
    } else {
      addProductToComparison();
      toast.success("Product Added Successfully");
    }
  };

  const Rupees = new Intl.NumberFormat("ur-PK", {
    style: "currency",
    currency: "PKR",
  });

  return (
    <>
      <div
        data-aos={index ? "fade-left" : ""}
        data-aos-delay={index ? index + "00" : ""}
        className={`relative overflow-hidden ${
          buy
            ? "h-[260px] xs:h-[360px] "
            : "h-[200px] xs:h-[260px] md:h-[250px] xl:h-[350px] "
        }w-full bg-white rounded-lg shadow-sm group `}
      >
        {/* <span className="absolute bg-danger-500 text-white font-semibold text-xs py-1 px-2 rounded-sm top-4 left-2 ">
          10% Off
        </span> */}

        <div className="pointy absolute top-2 -left-6 z-50 tracking-wide text-[10px] lg:text-sm pl-4 ">
          Promote
        </div>
        <div className="h-[30%] xs:h-[60%] absolute flex flex-col gap-2 xl:gap-4 group-hover:right-2 -right-10 top-2 xs:top-4  xs:group-hover:right-4 transition-all ease-out z-[999]">
          <button
            type="button"
            className="bg-main text-white p-1 xs:p-2 rounded-full "
            onClick={() => setQuickView(true)}
          >
            <Icon icon="gg:maximize-alt" />
          </button>
          <button
            type="button"
            className="bg-main text-white p-1 xs:p-2 rounded-full "
            onClick={() => handleWishlist(data?.url)}
          >
            {data?.wishlist ? (
              <Icon className="w-full text-white" icon="ph:heart-fill" />
            ) : (
              <Icon icon="ph:heart" />
            )}
          </button>
          <button
            type="button"
            className="bg-main text-white p-1 xs:p-2 rounded-full "
            onClick={() =>
              handleCompare({
                subcategory_id: data.subcategory_id,
                url: data.url,
              })
            }
          >
            <Icon icon="akar-icons:arrow-cycle" />
          </button>
        </div>
        {/* <div className="absolute -bottom-10 right-4 transition-all group-hover:bottom-4">
          <button className="btn btn-primary bg-main text-white   flex items-center gap-1 py-1 px-1">
            <Icon width={20} icon={"ion:cart-outline"} />{" "}
          </button>
        </div> */}
        <div className="h-full px-2 py-2">
          <div className="h-[55%] xs:h-[65%] md:h-[60%] xl:h-[65%] w-full ">
            <ReactPlayer
              className={"video-wrapper relative"}
              url={`${productVideoRoute}/${data?.video}`}
              width={"100%"}
              height={"100%"}
              playIcon={
                <button className="absolute  bg-black-500 p-2 rounded-full bg-opacity-40">
                  <Icon icon={"gravity-ui:play"} width={28} color="white" />
                </button>
              }
              playing={true}
              muted
              loop={true}
              onError={(e) => console.error(e)}
              light={
                <img
                  src={
                    data?.thumbnail
                      ? `${productThumbnailRoute}/${data?.thumbnail}`
                      : Thumbnail
                  }
                  alt="placeholder"
                  className={`${
                    data?.thumbnail ? "" : "w-[50%]"
                  } h-full object-contain`}
                />
              }
            />
          </div>
          <div className="flex flex-col xs:px-3 gap-1 pt-2">
            <span className="text-[9px] truncate xs:text-xs font-inter font-semibold text-gray-400">
              {data?.category}
            </span>
            <p
              className="text-gray-800 text-[11px] xs:text-[13px] font-bold cursor-pointer truncate"
              onClick={() => handleClick(data?.url)}
            >
              {data?.name?.length > 35
                ? `${data?.name?.slice(0, 35)}...`
                : data?.name}
            </p>
            <Rating
              value={data?.rating}
              readOnly
              cancel={false}
              className="flex gap-1 text-xs"
              size={6}
            />
            <p className="flex items-center gap-2">
              {" "}
              <span className="text-[12px] xs:text-sm text-red-500 font-bold">
                {Rupees?.format(data?.price)}
              </span>
              {/* <span className="text-[11px] text-gray-500 font-semibold line-through">
                4562
              </span> */}
            </p>
            {btnBuy && (
              <a
                href={data?.redirect_url}
                className="bg-main text-white text-center text-sm py-1 px-2 rounded-md"
                target="_blank"
                rel="noreferrer"
              >
                Buy Now
              </a>
            )}
          </div>
        </div>
      </div>

      <LoginModal active={active} handleClose={() => setActive(false)} />
      <ProductQuickView
        active={quickView}
        handleClose={() => setQuickView(false)}
        url={data?.url}
        buy={buy}
      />
    </>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number,
  buy: PropTypes.bool,
  btnBuy: PropTypes.bool,
};
