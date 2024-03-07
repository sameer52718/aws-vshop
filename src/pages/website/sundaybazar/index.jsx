// import Poster from "../../../assets/images/posters/poster-1.png";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductCard from "../../../components/websitePartials/productCard";
import useWidth from "../../../hooks/useWidth";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { getStreamingDetail, insertLike } from "../../../constant/apiRoutes";
import {
  Constants,
  MeetingConsumer,
  MeetingProvider,
} from "@videosdk.live/react-sdk";
import Container from "./container";
import { useSelector } from "react-redux";
import { likeContentType } from "../../../constant/data";
import LoginModal from "../../../components/websitePartials/loginmodal";
const Streaming = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { url } = useParams();
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState({});
  const [active, setActive] = useState(false);
  const { width } = useWidth();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const body = {
          meeting_id: url,
          select: [
            "product.name",
            "product.description",
            "product.thumbnail",
            "product.video",
            "product.rating",
            "product.price",
            "product.url",
            "category.name as category",
            "category.url as category_url",
            "product.redirect_url",
          ],
        };
        const { data } = await axios.post(getStreamingDetail, body, {
          headers: { Authorization: token },
        });
        if (data.error === false) {
          setData(data.data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [token, url]);

  const handleLike = async () => {
    try {
      if (!token) {
        setActive(true);
        return;
      }
      const updatedData = {
        ...data,
      };
      updatedData.streaming[0].like = !updatedData.streaming[0].like;
      setData(updatedData);
      const { data: res } = await axios.post(
        insertLike,
        { url, content_type: likeContentType.streming },
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-12">
          <div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
            <ul className="breadcrumbs">
              <li className="text-main">
                <NavLink to="/" className="text-lg">
                  <Icon icon="heroicons-outline:home" />
                </NavLink>
                <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                  <Icon icon="heroicons:chevron-right" />
                </span>
              </li>
              <li className="text-main">
                <NavLink to="/">Sunday Bazar</NavLink>
                <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                  <Icon icon="heroicons:chevron-right" />
                </span>
              </li>
              <li className="capitalize text-slate-500 dark:text-slate-400">
                Alina Hotel
              </li>
            </ul>
          </div>
          <MeetingProvider
            token={import.meta.env.VITE_VIDEOSDK_TOKEN}
            config={{
              meetingId: url,
              micEnabled: true,
              webcamEnabled: true,
              name: user ? `${user.first_name} ${user.last_name}` : `Guest`,
              mode: Constants.modes.VIEWER,
            }}
          >
            <MeetingConsumer>
              {() => (
                <Container
                  meetingId={url}
                  data={data}
                  handleLike={handleLike}
                />
              )}
            </MeetingConsumer>
          </MeetingProvider>
          <section className="">
            <div className="mt-8 ">
              <h6 className="w-[98%] text-gray-700 flex flex-wrap text-xl mb-8 leading-none">
                Streaming Products
              </h6>
              <Swiper
                slidesPerView={
                  width <= 500 ? 2 : width <= 768 ? 2 : width <= 1025 ? 3 : 4
                }
                spaceBetween={10}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                modules={[Autoplay]}
                loop={true}
                data-aos="fade-up"
              >
                {data?.product?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard
                      data={item}
                      buy={true}
                      btnBuy={data?.streaming[0].type === 2}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
          <LoginModal active={active} handleClose={() => setActive(false)} />
        </div>
      )}
    </>
  );
};

export default Streaming;
