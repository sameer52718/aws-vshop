import { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import { toast } from "react-toastify";
import axios from "axios";
import { categoryIcon, getResellerStreamingInfo} from "../../../constant/apiRoutes";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import useWidth from "../../../hooks/useWidth";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductCard from "../../../components/websitePartials/productCard";
import BackButton from "../../../components/ui/BackButton";
import streamingVector from "../../../assets/images/vectors/streaming.png";

const Detail = () => {
  const { url } = useParams();
  const {
    width,
    breakpoints: { lg, sm },
  } = useWidth();
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: res } = await axios.post(
          getResellerStreamingInfo,
          { meeting_id: url },
          { headers: { Authorization: token } }
        );
        console.log(res.error);
        if (res.error === false) {
          setData(res.data.streaming[0]);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, [token, url]);

  return (
    <>
      <div className="grid grid-cols-12  lg:space-y-0 gap-4">
        <Card
          title={"Detail"}
          className="col-span-12"
          headerslot={<BackButton />}
        >
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-6 space-y-4">
              <div className="flex flex-col text-[10px] xs:text-xs md:text-sm">
                <span className="text-[10px] md:text-xs text-primary-600 font-medium">
                  Title
                </span>
                <span className="text-xs md:text-sm font-semibold ml-1 md:ml-2">
                  {data?.title}
                </span>
              </div>
              <div className="flex flex-col text-[10px] xs:text-xs md:text-sm">
                <span className="text-[10px] md:text-xs text-primary-600 font-medium">
                  Streaming Id
                </span>
                <span className="text-xs md:text-sm font-semibold ml-1 md:ml-2">
                  {data?.meeting_id}
                </span>
              </div>
              <div className="flex flex-col text-[10px] xs:text-xs md:text-sm">
                <span className="text-[10px] md:text-xs text-primary-600 font-medium">
                  Date/Time
                </span>
                <span className="text-xs md:text-sm font-semibold ml-1 md:ml-2">
                  {moment(data?.time).format("DD/MM/YYYY hh:mm A")}
                </span>
              </div>
              <div className="flex flex-col text-[10px] xs:text-xs md:text-sm">
                <span className="text-[10px] md:text-xs text-primary-600 font-medium">
                  Views
                </span>
                <span className="text-xs md:text-sm font-semibold ml-1 md:ml-2">
                  {data?.views}
                </span>
              </div>
              <div className="flex flex-col text-[10px] xs:text-xs md:text-sm">
                <span className="text-[10px] md:text-xs text-primary-600 font-medium">
                  Status
                </span>
                <span className="text-xs md:text-sm font-semibold ml-1 md:ml-2">
                  {data.status}
                </span>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <img
                className="w-full h-full"
                src={streamingVector}
                alt="streaming logo"
              />
            </div>
          </div>
        </Card>
        {data?.categories && (
          <Card title={"Categories"} className="col-span-12 ">
            <Swiper
              className="mySwiper w-full h-full rounded-md bg-white"
              slidesPerView={width <= sm ? 3 : width <= lg ? 3 : 6}
              spaceBetween={width <= sm ? 8 : 20}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              loop
            >
              {data?.categories?.map((item) => (
                <SwiperSlide key={item.url}>
                  <div className=" h-50px sm:h-[90px] bg-gray-50 p-4 flex flex-col justify-center items-center gap-0">
                    <img
                      className="w-[18px] sm:w-[30px] h-[18px] sm:h-[30px] object-cover "
                      src={`${categoryIcon}/${item.web_icon}`}
                      alt="category icon"
                    />
                    <span className="truncate w-[70px] sm:w-[100%] text-center text-[10px] sm:text-xs">
                      {item.name}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Card>
        )}
        <div className="col-span-12 ">
          <div className="grid grid-cols-12 space-x-3 space-y-3">
            {data?.products?.map((item, index) => (
              <div
                className="col-span-6 md:col-span-4 lg:col-span-3 "
                key={index}
              >
                <ProductCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
