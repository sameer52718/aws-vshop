import Modal from "@/components/ui/Modal";
import Loading from "../../../components/Loading";
import useWidth from "../../../hooks/useWidth";
import { getExtension } from "../../../utils/function";
import {
  checkCart,
  getProductDetails,
  productFilesRoute,
  productThumbnailRoute,
  productVideoRoute,
} from "../../../constant/apiRoutes";

import { FreeMode, Thumbs, Autoplay } from "swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { Rating } from "primereact/rating";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { websiteRoutes } from "../../../constant/routes";

const ProductQuickView = ({ active, handleClose, url, buy }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [stock, setStock] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [selectedFields, setSelectedFields] = useState({
    color: "",
    size: "",
    count: 1,
  });
  const { width } = useWidth();
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const body = {
          url,
          select: [
            "product.name",
            "product.description",
            "product.thumbnail",
            "product.video",
            "product.rating",
            "product.price",
            "product.url",
            "product.color",
            "product.size",
            "product.files",
            "product.specification",
            "product.feature",
            "product.redirect_url",
            "category.name as category",
            "subcategory.name as subcategory",
            "category.url as category_url",
            "subcategory.url as subcategory_url",
          ],
        };
        const { data } = await axios.post(getProductDetails, body);
        if (data.error === false) {
          setData(data.data.product[0]);
          console.log(data.data.product[0]);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (active === true) {
      getData();
    }
  }, [active, url]);

  const Rupees = new Intl.NumberFormat("ur-PK", {
    style: "currency",
    currency: "PKR",
  });

  const handleFieldChange = (field, value) => {
    setSelectedFields((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const checkInventory = async ({ size, color, quantity }) => {
      try {
        const { data } = await axios.post(checkCart, {
          size,
          color,
          quantity,
          url,
        });
        if (data.error) {
          handleClose();
          toast.error(data.message);
          setStock(false);
        } else {
          setStock(true);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    const isValidProduct = data?.size && data?.color;
    const isValidSize = selectedFields.size !== "";
    const isValidColor = selectedFields.color !== "";
    const isValidCount = selectedFields.count > 0;

    if (
      isValidProduct &&
      isValidSize &&
      isValidColor &&
      isValidCount &&
      active
    ) {
      checkInventory({
        color: selectedFields.color,
        size: selectedFields.size,
        quantity: selectedFields.count,
      });
    } else if (
      !data?.size &&
      data?.color &&
      isValidColor &&
      isValidCount &&
      active
    ) {
      checkInventory({
        color: selectedFields.color,
        quantity: selectedFields.count,
      });
    } else if (!isValidProduct && isValidCount && active) {
      checkInventory({ quantity: selectedFields.count });
    }
  }, [
    data?.color,
    data?.size,
    selectedFields.color,
    selectedFields.count,
    selectedFields.size,
    url,
    active,
  ]);

  const addToCart = () => {
    if (!token) {
      toast.error("Please Login To Add Product");
      return;
    }
    const isValidProduct = data?.size && data?.color;
    const isValidSize = selectedFields.size !== "";
    const isValidColor = selectedFields.color !== "";
    const isValidCount = selectedFields.count > 0;
    const body = { quantity: selectedFields.count, url };
    if (isValidProduct && !isValidSize && !isValidColor && !isValidCount) {
      toast.error("Please Select Color,Size & Quantity");
    } else if (!data?.size && data?.color && !isValidColor && !isValidCount) {
      toast.error("Please Select Color & Quantity");
    } else if (!isValidProduct && !isValidCount) {
      toast.error("Please Select Quantity");
    }

    if (data?.size) {
      body.size = selectedFields.size;
    }
    if (data?.color) {
      body.color = selectedFields.color;
    }
    dispatch(addToCart({ token, body }));
    toast.success("Product Added to Cart");
  };

  function swiperChange() {
    if (this.realIndex !== 0) {
      setPlaying(false);
    }
  }
  return (
    <>
      <Modal
        title=""
        label="Login Form"
        labelClass="btn-outline-dark"
        activeModal={active}
        onClose={handleClose}
        themeClass="!text-black-500"
        centered={true}
        noFade={false}
        className="max-w-xl md:max-w-3xl lg:max-w-5xl flex flex-col items-end justify-center "
      >
        {isLoading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center mx-auto">
            <div className="w-[100%] md:w-[50%] flex flex-col gap-4 lg:gap-8  ">
              <div className="p-4 border sm:h-[350px] lg:w-[450px] sm:w-[320px] xs:w-[200px] w-full border-gray-300 rounded-md ">
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Thumbs]}
                  className="h-full flex "
                  onSlideChange={swiperChange}
                >
                  <SwiperSlide>
                    <div className="h-full relative">
                      <button
                        onClick={() => setPlaying((prev) => !prev)}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black-500 p-2 rounded-full bg-opacity-40 z-50"
                      >
                        {playing ? (
                          <Icon
                            icon={"material-symbols-light:pause-outline"}
                            width={28}
                            color="white"
                          />
                        ) : (
                          <Icon
                            icon={"gravity-ui:play"}
                            width={28}
                            color="white"
                          />
                        )}
                      </button>
                      <ReactPlayer
                        className={"video-wrapper"}
                        url={`${productVideoRoute}/${data?.video}`}
                        width={"100%"}
                        height={"100%"}
                        playing={playing}
                        loop={true}
                        onError={(e) => console.error(e)}
                      />
                    </div>
                  </SwiperSlide>
                  {data?.files &&
                    JSON.parse(data.files).map((item, index) => (
                      <SwiperSlide key={index}>
                        {getExtension(item).toLowerCase() === "mp4" ? (
                          <ReactPlayer
                            url={`${productFilesRoute}/${item}`}
                            width={"100%"}
                            height={"100%"}
                            loop={true}
                            playing={true}
                            playIcon={true}
                            onError={(e) => console.error(e)}
                            controls={true}
                          />
                        ) : (
                          <img
                            src={`${productFilesRoute}/${item}`}
                            className="w-full  h-full block rounded object-contain border p-2  border-slate-200"
                            alt={""}
                          />
                        )}
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              <div className="h-[100px] lg:w-[450px] sm:w-[320px] xs:w-[200px] w-full">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={5}
                  slidesPerView={width < 1024 ? 3 : 4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs, Autoplay]}
                >
                  <SwiperSlide>
                    <img
                      src={`${productThumbnailRoute}/${data?.thumbnail}`}
                      alt="thumbnail"
                      className="p-2 border border-gray-300 md:h-[100px] h-[80px] lg:h-[60px] rounded-md object-contain"
                    />
                  </SwiperSlide>
                  {data?.files &&
                    JSON.parse(data.files).map((item, index) => (
                      <SwiperSlide key={index}>
                        {getExtension(item).toLowerCase() === "mp4" ? (
                          <ReactPlayer
                            url={`${productFilesRoute}/${item}`}
                            width={"100%"}
                            height={"100%"}
                            loop={true}
                            playing={true}
                            playIcon={true}
                            onError={(e) => console.error(e)}
                            controls={true}
                            key={item}
                          />
                        ) : (
                          <img
                            src={`${productFilesRoute}/${item}`}
                            className="p-2 border border-gray-300 md:h-[100px] h-[80px] lg:h-[60px] rounded-md object-contain"
                            alt=""
                          />
                        )}
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>

            <div className="w-[100%] md:w-[50%] relative">
              <div className="flex flex-col gap-1 xs:gap-2 lg:gap-4">
                {/* <p className="text-gray-400"> {product?.category}</p> */}
                <h5 className="font-bold text-lg sm:text-2xl">{data.name}</h5>
                <div className="flex items-center gap-4">
                  <Rating
                    value={data?.rating}
                    readOnly
                    cancel={false}
                    pt={{ onIcon: { className: "!text-yellow-400" } }}
                  />
                  <span className="text-gray-400 text-sm sm:text-base">
                    {data.review_count} reviews
                  </span>
                </div>
                <div className="flex items-end gap-4 ">
                  {/* <span className="text-gray-400 line-through ">
                      PKR 40000
                    </span> */}
                  <span className="text-red-500 text-lg sm:text-2xl font-semibold">
                    {Rupees?.format(data?.price)}
                  </span>
                </div>
                <div className="text-gray-500 text-sm sm:text-base">
                  {data?.description?.length > 250
                    ? `${data.description.slice(0, 250)}...`
                    : data?.description}
                </div>

                {data?.color && (
                  <div className="flex flex-col gap-4">
                    <h6 className="text-gray-600">Colors</h6>
                    <div className="flex gap-3 items-center">
                      {JSON.parse(data?.color).map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleFieldChange("color", item)}
                          className={`w-6 h-6 rounded-full transition-all ease-in cursor-pointer   ${
                            selectedFields.color === item ? "scale-125" : ""
                          }`}
                          style={{ backgroundColor: item }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
                {data?.size && (
                  <div className="flex flex-col gap-4">
                    <h6 className="text-gray-600">Size</h6>
                    <div className="flex gap-4 items-center">
                      {JSON.parse(data.size).map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleFieldChange("size", item)}
                          className={`border border-gray-400 py-[6px] px-[12px] rounded-md cursor-pointer transition-all ease-in ${
                            selectedFields.size === item
                              ? "bg-black-800 text-white "
                              : ""
                          } `}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 ">
                  <div className="flex items-center">
                    <button
                      className="btn btn-outline-primary py-2 px-3 rounded-none "
                      type="button"
                      onClick={() =>
                        handleFieldChange(
                          "count",
                          selectedFields.count === 0
                            ? selectedFields.count
                            : selectedFields.count - 1
                        )
                      }
                    >
                      -
                    </button>
                    <div className="py-2 px-6 flex  items-center justify-center  border-t border-b border-main cursor-default">
                      {selectedFields.count}
                    </div>
                    <button
                      className="btn btn-outline-primary py-2 px-3 rounded-none"
                      type="button"
                      onClick={() =>
                        handleFieldChange("count", selectedFields.count + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  {buy ? (
                    data.redirect_url ? (
                      <a
                        className="btn btn-primary  py-2"
                        href={data.redirect_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Buy Now
                      </a>
                    ) : (
                      <button
                        className="btn btn-danger  py-2"
                        type="button"
                        onClick={() => navigate(websiteRoutes.checkout)}
                      >
                        Buy Now
                      </button>
                    )
                  ) : data.redirect_url ? (
                    <a
                      className="btn btn-primary  py-2"
                      href={data.redirect_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Buy Now
                    </a>
                  ) : (
                    <button
                      className="btn btn-primary  py-2"
                      type="button"
                      disabled={!stock}
                      onClick={addToCart}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProductQuickView;

ProductQuickView.propTypes = {
  active: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  buy: PropTypes.bool,
};
