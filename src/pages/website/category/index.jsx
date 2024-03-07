/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { categoryBanner, getSubCategories} from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useWidth from "../../../hooks/useWidth";
import ProductCard from "../../../components/websitePartials/productCard";
import { useDispatch } from "react-redux";
import { fetchProducts, updateFilter } from "../../../store/product/slice";
import Loading from "../../../components/Loading";
import NoProduct from "../../../assets/images/vectors/no-product.png";
import Banner from "../../../assets/images/bg/image.jpg";

const Category = () => {
  const { url } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const {
    width,
    breakpoints: { sm, lg },
  } = useWidth();

  const getData = async () => {
    try {
      setisLoading(true);
      dispatch(updateFilter({ category_url: url }));
      dispatch(fetchProducts());
      const { data } = await axios.post(getSubCategories, {
        category_url: url,
      });
      if (data.error === false) {
        setData(data.data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="!bg-center flex items-center justify-center w-full h-[400px] relative !bg-no-repeat !bg-cover z-[50]"
            style={{
              background: `url(${Banner})`,
            }}
          />
          <div className="container my-10">
            <h3 className="text-center mb-5">Sub Categories</h3>
            <div className="">
              <Swiper
                className="mySwiper w-full h-full rounded-md"
                slidesPerView={width <= sm ? 3 : width <= lg ? 3 : 6}
                spaceBetween={width <= sm ? 8 : 20}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                loop
              >
                {data?.subcategory.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      to={`/subcategory/${item.url}`}
                      className=" h-50px sm:h-[90px] bg-white p-4 flex flex-col justify-center items-center gap-0"
                    >
                      {/* <img
                        className="w-[18px] sm:w-[30px] h-[18px] sm:h-[30px] object-cover "
                        src={`${subcategoryIcon}/${item.icon}`}
                        alt="logo"
                      /> */}
                      <span className="truncate w-[70px] sm:w-[100%] text-center text-[10px] sm:text-base">
                        {item.name}
                      </span>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="container my-10">
            {products.length === 0 ? (
              <div className="flex justify-center items-center py-8">
                <img src={NoProduct} alt="" />
              </div>
            ) : (
              <div className="w-full flex flex-col gap-2">
                <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-8 container-fluid w-[100%] overflow-hidden">
                  {products.map((item, index) => (
                    <ProductCard key={index} data={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Category;
