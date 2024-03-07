/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useWidth from "../../../hooks/useWidth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { UserHireImagesRoute, getHireDetails, updateHireStatus } from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";
import DashboardLoader from "../../../components/DashboardLoader";
import { StockFrequencyOptions } from "../../../constant/data";

const HireDetail = () => {
  const {
    width,
    breakpoints: { sm, md },
  } = useWidth();

  const { token } = useSelector((state) => state.auth);
  const { code } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (loading = true) => {
    try {
      if (loading) {
        setIsLoading(true);
      }
      const { data } = await axios.post(getHireDetails, { code }, { headers: { Authorization: token } });
      if (data.error === false) {
        setData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    
    getData();
  }, [code, token]);

  const handleUpdateStatus = async (status) => {
    try {       
      const {data} = await axios.post(updateHireStatus,{code,status},{headers:{Authorization:token}})
      if (data.error === false) {
        toast.success(data.message)
        getData(false)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  return (
    <>
      {isLoading ? (
        <DashboardLoader />
      ) : (
        <div className="pb-8">
          <div className="w-[100%] flex flex-col items-center gap-2 my-4">
            <div className="w-[100%] flex justify-between gap-4 items-center bg-white px-8 py-5 rounded-lg">
              <h1 className="text-xl">Hiring Details</h1>
              {data?.hire[0]?.status === 0 && (
                <div className="flex justify-between items-center gap-5">
                  <div>
                    <button
                      className="btn btn-success md:px-3 lg:px-6"
                      type="button"
                      onClick={() => handleUpdateStatus(1)}
                    >
                      Accept
                    </button>
                  </div>
                  <div className="w-[50%]">
                    <button
                      className="btn btn-danger md:px-3 lg:px-6"
                      type="button"
                      onClick={() => handleUpdateStatus(2)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
              {data?.hire[0]?.status === 1 && (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() =>
                    navigate(`/dashboard/reseller/hire/${code}/product`)
                  }
                >
                  Add
                </button>
              )}
            </div>
            <div className="w-[100%] flex flex-col gap-2 bg-white px-8 py-5 rounded-lg">
              <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base grid grid-cols-12">
                <span className="col-span-6"> First Name :</span>
                <span className="col-span-6 font-normal">
                  {data?.hire[0]?.first_name}
                </span>
              </div>
              <hr />
              <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base grid grid-cols-12">
                <span className="col-span-6"> Last Name : </span>
                <span className="col-span-6 font-normal">
                  {data?.hire[0]?.last_name}
                </span>
              </div>
              <hr />
              <div className="w-[100%] text-[10px] md:text-sm lg:text-base font-bold  grid grid-cols-12">
                <span className="col-span-6"> Status:</span>
                <span className="col-span-6 font-normal">
                  {data?.hire[0]?.status === 0
                    ? "Pending"
                    : data?.hire[0]?.status === 1
                    ? "Approved"
                    : data?.hire[0]?.status === 2
                    ? "Rejected"
                    : data?.hire[0]?.status === 3
                    ? "Deleted"
                    : "Working"}
                </span>
              </div>
              <hr />
              <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base grid grid-cols-12">
                <span className="col-span-6"> Email:</span>
                <span className="col-span-6 font-normal truncate">
                  {data?.hire[0]?.email}
                </span>
              </div>
              <hr />
              <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base grid grid-cols-12">
                <span className="col-span-6"> Phone :</span>
                <span className="col-span-6 font-normal">
                  {data?.hire[0]?.phone}
                </span>
              </div>
              <hr />
            </div>
          </div>
          <div className="w-[100%] flex flex-col items-center md:items-start gap-2 my-4 bg-white px-8 py-5 ">
            <div className="w-[100%] flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-0">
              <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
                <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base grid grid-cols-12">
                  <span className="col-span-6">Price :</span>
                  <span className="col-span-6 font-normal">
                    {data?.hire[0]?.price}
                  </span>
                </div>
                <hr />
                <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base grid grid-cols-12">
                  <span className="col-span-6"> Stock :</span>
                  <span className="col-span-6 font-normal">
                    {data?.hire[0]?.stock}
                  </span>
                </div>
                <hr />
                <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base grid grid-cols-12">
                  <span className="col-span-6">Stock_Frequency :</span>
                  <span className="col-span-6 font-normal">
                    {
                      StockFrequencyOptions.find(
                        (item) =>
                          item.id === parseInt(data?.hire[0]?.stock_frequency)
                      )?.name
                    }
                  </span>
                </div>
                <hr className="md:hidden" />
              </div>
              <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
                <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base grid grid-cols-12">
                  <span className="col-span-6"> Category :</span>
                  <span className="col-span-6 font-normal">
                    {data?.hire[0]?.category}
                  </span>
                </div>
                <hr />
                <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base grid grid-cols-12">
                  <span className="col-span-6"> Sub-Category :</span>
                  <span className="col-span-6 font-normal">
                    {data?.hire[0]?.subcategory}
                  </span>
                </div>
                <hr />
              </div>
            </div>
            <div className="hidden md:block w-[100%]">
              <hr />
            </div>
            <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base flex flex-col justify-between items-start gap-1">
              Description :
              <span className="w-[100%] text-[8px] md:text-xs lg:text-sm font-normal">
                {data?.hire[0]?.description}
              </span>
            </div>
          </div>

          {data?.hire[0]?.images && (
            <div className="w-[100%] px-8 py-5">
              <Swiper
                slidesPerView={width < sm ? 1.1 : width < md ? 2.1 : 3}
                spaceBetween={10}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                loop={true}
                className="w-[100%] h-[150px] md:h-[180px] lg:h-[250px]"
              >
                {JSON.parse(data?.hire[0]?.images).map((item, index) => (
                  <SwiperSlide className="w-[100%]" key={index}>
                    <div className="h-[100%] w-full ">
                      <img
                        src={`${UserHireImagesRoute}/${item}`}
                        alt=""
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HireDetail;
