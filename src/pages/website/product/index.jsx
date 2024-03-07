import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Autoplay } from "swiper/modules";
import { Rating } from "primereact/rating";
import { Icon } from "@iconify/react";
import useWidth from "../../../hooks/useWidth";
import ProductCard from "../../../components/websitePartials/productCard";
import ReactPlayer from "react-player";
import Loading from "../../../components/Loading";
import ReviewCard from "../../../components/websitePartials/reviewCard";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  checkCart,
  getProductDetails,
  insertReview,
  productFilesRoute,
  productThumbnailRoute,
  productVideoRoute,
  updateWishlist,
} from "../../../constant/apiRoutes";
import { getExtension } from "../../../utils/function";
import { useSelector, useDispatch } from "react-redux";
import { addToCart as AddtoCart } from "../../../store/cart/slice";
import LoginModal from "../../../components/websitePartials/loginmodal";
import ReviewModal from "../../../components/websitePartials/reviewModal";
import Breadcrumbs from "../../../components/websitePartials/breadcrumb";

const Product = () => {
  const { width } = useWidth();
  const { url } = useParams();
  const { token, userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedFields, setSelectedFields] = useState({
    color: "",
    size: "",
    count: 1,
  });
  const [active, setActive] = useState(false);
  const [stock, setStock] = useState(true);
  const [product, setProduct] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [tab, setTab] = useState("reviews");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [reviewActive, setReviewActive] = useState(false);
  const [related, setRelated] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsloading(true);
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
            "brand.name as brand",
          ],
        };
        const { data } = await axios.post(getProductDetails, body, {
          headers: { Authorization: token },
        });
        if (data.error === false) {
          setProduct(data.data.product[0]);
          setRelated(data.data.related);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsloading(false);
      }
    };
    getData();
  }, [token, url]);

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
          toast.error(data.message);
          setStock(false);
        } else {
          setStock(true);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    const isValidProduct = product?.size && product?.color;
    const isValidSize = selectedFields.size !== "";
    const isValidColor = selectedFields.color !== "";
    const isValidCount = selectedFields.count > 0;

    if (isValidProduct && isValidSize && isValidColor && isValidCount) {
      checkInventory({
        color: selectedFields.color,
        size: selectedFields.size,
        quantity: selectedFields.count,
      });
    } else if (
      !product?.size &&
      product?.color &&
      isValidColor &&
      isValidCount
    ) {
      checkInventory({
        color: selectedFields.color,
        quantity: selectedFields.count,
      });
    } else if (!isValidProduct && isValidCount) {
      checkInventory({ quantity: selectedFields.count });
    }
  }, [
    product?.color,
    product?.size,
    selectedFields.color,
    selectedFields.count,
    selectedFields.size,
    url,
  ]);

  const handleTabChange = (value) => {
    setTab(value);
  };

  const handleWishlist = async () => {
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

  const addToCart = () => {
    if (!token) {
      toast.error("Please Login To Add Product");
      return;
    }
    const isValidProduct = product?.size && product?.color;
    const isValidSize = selectedFields.size !== "";
    const isValidColor = selectedFields.color !== "";
    const isValidCount = selectedFields.count > 0;
    const body = { quantity: selectedFields.count, url };
    if (isValidProduct && !isValidSize && !isValidColor && !isValidCount) {
      toast.error("Please Select Color,Size & Quantity");
    } else if (
      !product?.size &&
      product?.color &&
      !isValidColor &&
      !isValidCount
    ) {
      toast.error("Please Select Color & Quantity");
    } else if (!isValidProduct && !isValidCount) {
      toast.error("Please Select Quantity");
    }

    if (product?.size) {
      body.size = selectedFields.size;
    }
    if (product?.color) {
      body.color = selectedFields.color;
    }
    dispatch(AddtoCart({ token, body }));
    toast.success("Product Added to Cart");
  };

  function swiperChange() {
    if (this.realIndex !== 0) {
      setPlaying(false);
    }
  }

  const Rupees = new Intl.NumberFormat("ur-PK", {
    style: "currency",
    currency: "PKR",
  });

  const handleSubmit = async (data) => {
    try {
      const { data: res } = await axios.post(
        insertReview,
        { ...data, content_type: 1, url },
        { headers: { Authorization: token } }
      );
      if (res.error === false) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReview = () => {
    if (!token) {
      setActive(true);
    } else {
      setReviewActive(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-12">
          <Breadcrumbs
            previosLinks={[
              {
                name: product?.category,
                link: `/category/${product?.category_url}`,
              },
              {
                name: product?.subcategory,
                link: `/subcategory/${product?.subcategory_url}`,
              },
            ]}
            currentLink={product?.name}
          />
          <div className="relative">
            <div className="grid gap-4 lg:gap-12 grid-cols-1 lg:grid-cols-2">
              <div className="relative " data-aos="fade-right">
                <div className="absolute top-8 left-8">
                  {/* <div className="bg-main md:h-16 md:w-16 h-10 w-10 md:text-md text-xs rounded-full text-white flex justify-center items-center p-2 z-[5000000]">
                    -50%
                  </div> */}
                </div>
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="p-2 sm:p-4 border md:h-[400px] h-[250px] border-gray-300 rounded-md ">
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
                            url={`${productVideoRoute}/${product?.video}`}
                            width={"100%"}
                            height={"100%"}
                            playing={playing}
                            loop={true}
                            onError={(e) => console.error(e)}
                          />
                        </div>
                      </SwiperSlide>
                      {product?.files &&
                        JSON.parse(product.files).map((item, index) => (
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
                  <div className="h-[30%]">
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      loop={true}
                      spaceBetween={10}
                      slidesPerView={width < 575 ? 4 : 5}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Thumbs, Autoplay]}
                    >
                      <SwiperSlide>
                        <img
                          src={`${productThumbnailRoute}/${product?.thumbnail}`}
                          alt="thumbnail"
                          className="p-2 border border-gray-300 md:h-[100px] h-[60px] rounded-md object-contain"
                        />
                      </SwiperSlide>
                      {product?.files &&
                        JSON.parse(product.files).map((item, index) => (
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
                                className="p-2 border border-gray-300 md:h-[100px] h-[60px] rounded-md object-contain"
                                alt=""
                              />
                            )}
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="relative" data-aos="fade-left">
                <span
                  className={`badge  absolute right-0 top-[5.2rem] sm:top-[4rem] md:top-[5rem] lg:top-28 ${
                    stock ? "badge-primary" : "badge-danger"
                  }`}
                >
                  {stock ? "In Stock" : "Out of Stock"}
                </span>
                <div className="flex flex-col gap-2 md:gap-4">
                  {product?.brand && (
                    <p className="text-xs md:text-base text-gray-400">
                      {product?.brand}
                    </p>
                  )}
                  <p className="text-xs md:text-base text-gray-400">
                    {" "}
                    {product?.category}
                  </p>
                  <h5 className="text-lg md:text-2xl font-bold">
                    {product?.name}
                  </h5>
                  <div className="flex items-center gap-2 md:gap-4">
                    <Rating
                      value={product?.rating}
                      readOnly
                      cancel={false}
                      pt={{ onIcon: { className: "!text-yellow-400" } }}
                    />
                    <span className="text-xs md:text-base text-gray-400">
                      {product?.review_count} reviews
                    </span>
                  </div>
                  <div className="flex items-end gap-4">
                    {/* <span className="text-gray-400 line-through ">
                      PKR 40000
                    </span> */}
                    <span className="text-red-500 text-lg md:text-2xl  font-semibold">
                      {Rupees?.format(product?.price)}
                    </span>
                  </div>
                  <div className="text-xs md:text-base text-gray-500">
                    {product?.description?.length > 250
                      ? `${product.description.slice(0, 250)}...`
                      : product?.description}
                  </div>

                  {product?.color && (
                    <div className="flex flex-col gap-1 md:gap-4">
                      <h6 className="text-xs md:text-base text-gray-600">
                        Colors
                      </h6>
                      <div className="flex gap-2 md:gap-3 items-center">
                        {JSON.parse(product?.color).map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleFieldChange("color", item)}
                            className={`md:w-6 w-6 h-6 md:h-6 rounded-full transition-all ease-in cursor-pointer   ${
                              selectedFields.color === item ? "scale-125" : ""
                            }`}
                            style={{ backgroundColor: item }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                  {product?.size && (
                    <div className="flex flex-col gap-2 md:gap-4">
                      <h6 className="text-xs md:text-base text-gray-600">
                        Size
                      </h6>
                      <div className="flex gap-2 md:gap-4 items-center">
                        {JSON.parse(product.size).map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleFieldChange("size", item)}
                            className={`border text-[10px] xs:text-xs md:text-base border-gray-400 py-[6px] px-[12px] rounded-md cursor-pointer transition-all ease-in ${
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

                  <div className="flex gap-4 mt-4 md:mt-0">
                    <div className="flex items-center box-border">
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
                      <div className="py-2 px-4 flex w-[50px] items-center justify-center  border-t border-b border-main cursor-default">
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
                    <button
                      className={`btn py-1 px-3 ${
                        product?.wishlist
                          ? "btn-outline-primary"
                          : "btn-primary"
                      }`}
                      type="button"
                      onClick={handleWishlist}
                    >
                      <Icon height={16} icon={"ph:heart"} />
                    </button>
                    {product.redirect_url ? (
                      <a
                        className="btn btn-primary  py-2"
                        href={product.redirect_url}
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
          </div>
          <div className="relative mt-10 xs:mt-16 lg:mt-30">
            <div className=" flex flex-col gap-5">
              <div className="flex gap-5">
                <span
                  onClick={() => handleTabChange("reviews")}
                  className={`cursor-pointer tab-underline ${
                    tab === "reviews"
                      ? "border-main border-b-[3px]"
                      : "hover:after:bg-main"
                  } text-lg font-medium `}
                >
                  Reviews
                </span>
                <span
                  onClick={() => handleTabChange("description")}
                  className={`cursor-pointer tab-underline ${
                    tab === "description"
                      ? "border-main border-b-[3px]"
                      : "hover:after:bg-main"
                  } text-lg font-medium`}
                >
                  Details
                </span>
              </div>
              {tab === "description" && (
                <div className="flex flex-col gap-8 ">
                  <div className="bg-white p-2 sm:p-4 lg:p-8 rounded-lg">
                    <div className="flex flex-col gap-2 xs:gap-4">
                      <h6 className="text-lg sm:text-xl">Specifications</h6>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product?.specification,
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <h6 className="text-lg sm:text-xl mt-6">Features</h6>
                      <div
                        dangerouslySetInnerHTML={{ __html: product?.feature }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {tab === "reviews" && (
                <div className="flex flex-col gap-6" data-aos="fade-top">
                  <div className="grid grid-cols-12 gap-4">
                    {product?.reviews?.slice(0, 10).map((item, index) => (
                      <ReviewCard data={item} key={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {related.length > 0 && (
            <div className="mt-8">
              <h6 className="w-[98%] text-gray-700 flex flex-wrap text-xl mb-8 leading-none">
                Related Products
              </h6>
              <Swiper
                breakpoints={{
                  280: { slidesPerView: 1.5 },
                  350: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 5 },
                }}
                spaceBetween={10}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                loop={true}
                data-aos="fade-up"
              >
                {related.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard data={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          <LoginModal active={active} handleClose={() => setActive(false)} />
          <button
            className="btn btn-primary fixed bottom-2 right-2 z-10"
            type="button"
            onClick={handleReview}
          >
            Write Review
          </button>
          <ReviewModal
            active={reviewActive}
            handleClose={() => setReviewActive(false)}
            submitData={handleSubmit}
          />
        </div>
      )}
    </>
  );
};

export default Product;
