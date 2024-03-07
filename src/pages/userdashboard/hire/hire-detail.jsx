import { Icon } from "@iconify/react";
import axios from "axios";
import { Rating } from "primereact/rating";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserHireDetails, productThumbnailRoute, productVideoRoute } from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";
import DashboardLoader from "../../../components/DashboardLoader";
import { StockFrequencyOptions } from "../../../constant/data";
const HireDetail = () => {
  const { code } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          getUserHireDetails,
          { code },
          { headers: { Authorization: token } }
        );
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
  }, [code, token]);

const Rupees = new Intl.NumberFormat("ur-PK", {
  style: "currency",
  currency: "PKR",
});

return (
  <>
    {isLoading ? (
      <DashboardLoader />
    ) : (
      <div className="pb-8">
        <div className="w-[100%] flex justify-between gap-4 items-center bg-white px-8 py-5 rounded-t-lg mb-2">
          <h1 className="text-xl">User Details</h1>
        </div>
        {data?.product?.length !== 0 && (
          <div className="w-[100%] flex flex-col md:flex-row justify-between gap-4 items-center bg-white px-8 py-5 rounded-lg">
            <div className="w-[100%] md:w-[50%] h-[200px] md:h-[350px]  ">
              <ReactPlayer
                className={"video-wrapper"}
                url={`${productVideoRoute}/${data?.product[0]?.video}`}
                width={"100%"}
                height={"100%"}
                playIcon={
                  <button className="absolute  bg-black-500 p-2 rounded-full bg-opacity-40">
                    <Icon icon={"gravity-ui:play"} width={28} color="white" />
                  </button>
                }
                playing={true}
                loop={true}
                onError={(e) => console.error(e)}
                light={
                  <img
                    src={`${productThumbnailRoute}/${data?.product[0]?.thumbnail}`}
                    alt="thumbnail"
                    className="h-full w-full object-contain"
                  />
                }
              />
            </div>

            <div className="w-[100%] md:w-[50%] flex flex-col gap-2 md:gap-4">
              <p className="text-xs md:text-base text-gray-400">
                {data?.product[0]?.category}
              </p>
              <h5 className="text-lg md:text-2xl font-bold">
                {data?.product[0]?.name}
              </h5>
              <div className="flex items-center gap-2 md:gap-4">
                <Rating
                  value={data?.product[0]?.rating}
                  readOnly
                  cancel={false}
                  color="#FDCC0D"
                  className="text-[#FDCC0D] gap-1"
                />
                <span className="text-xs md:text-base text-gray-400">
                  6 reviews
                </span>
              </div>
              <div className="flex items-end gap-4">
                {/* <span className="text-gray-400 line-through ">
                      PKR 40000
                    </span> */}
                <span className="text-red-500 text-lg md:text-2xl font-semibold">
                  {Rupees.format(data?.product[0]?.price)}
                </span>
              </div>
              <div className="text-xs md:text-base text-gray-500">
                {data?.product[0]?.description}
              </div>

              {data?.product[0]?.color && (
                <div className="flex flex-col gap-4">
                  <h6 className="text-xs md:text-base text-gray-600">Colors</h6>
                  <div className="flex gap-3 items-center">
                    {JSON.parse(data?.product[0]?.color).map((item, index) => (
                      <div
                        key={index}
                        className={`md:w-6 w-4 h-4 md:h-6 rounded-full transition-all ease-in cursor-pointer `}
                        style={{ backgroundColor: item }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
              {data?.product[0]?.size && (
                <div className="flex flex-col gap-4">
                  <h6 className="text-xs md:text-base text-gray-600">Size</h6>
                  <div className="flex gap-4 items-center">
                    {JSON.parse(data?.product[0]?.size).map((item, index) => (
                      <div
                        key={index}
                        className={`border text-xs md:text-base border-gray-400 py-[6px] px-[12px] rounded-md  `}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="w-[100%] flex flex-col items-center gap-2 my-4">
          <div className="w-[100%] flex flex-col gap-2 bg-white px-8 py-5">
            <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base grid grid-cols-12">
              <span className="col-span-6"> First Name :</span>{" "}
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
              <span className="w-[50%] font-normal">
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
          <div className="w-[100%] flex flex-col items-center md:items-start gap-2  bg-white px-8 py-5 rounded-b-lg">
            <div className="w-[100%] flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-0">
              <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
                <div className="font-bold w-[100%] text-[10px] md:text-sm lg:text-base grid grid-cols-12">
                  <span className="col-span-6">Price :</span>
                  <span className="col-span-6 font-normal">
                    {Rupees.format(data?.hire[0]?.price)}
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
        </div>
      </div>
    )}
  </>
);
};

export default HireDetail;
