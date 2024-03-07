import LiveCard from "@/components/websitePartials/livecard";
import { useEffect, useState, useCallback } from "react";
import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getStreamings } from "../../../constant/apiRoutes";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import useWidth from "../../../hooks/useWidth";
const SundayBazarListing = () => {
  const { options } = useSelector((state) => state.categories);
  const [category_id, setCategory_id] = useState("0");
  const [title, setTitle] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [filterMenu, setFilterMenu] = useState(false);

  const {
    width,
    breakpoints: { lg },
  } = useWidth();

  const handleChange = async (e) => {
    const { id, value } = e.target;
    if (id === "category_id") setCategory_id(value === "" ? "0" : value);
  };

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(getStreamings, {
        category_id: category_id,
        title: title,
      });
      if (data.error === false) {
        setData(data.data.streaming);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [category_id, title]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className="container my-12">
        <div className="grid grid-cols-1 ">
          <div className="col-span-1 bg-white h-max p-4 xs:py-5 lg:py-10 lg:px-6 rounded-md mb-6">
            {" "}
            <div className={`w-full flex justify-between items-center`}>
              <h6 className="text-lg">Sunday Bazar Filter</h6>
              <button
                type="button"
                onClick={() => setFilterMenu((prev) => !prev)}
                className="block lg:hidden"
              >
                <Icon icon={"ic:baseline-menu"} />
              </button>
            </div>
            {(filterMenu || width >= lg) && (
              <div data-aos="fade-up" className="flex flex-col gap-4 my-4">
                <h6 className="mt-6">Tell Us What You Want</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-4">
                  <Textinput
                    id={"title"}
                    onChange={(e) =>
                      setTitle(e.target.value === "" ? "0" : e.target.value)
                    }
                    label={"Title"}
                    value={title === "0" ? "" : title}
                    placeholder="Write Title Here..."
                  />
                  <Select
                    onChange={handleChange}
                    label={"Category"}
                    id={"category_id"}
                    options={options}
                    placeholder="Select Category"
                    value={category_id}
                  />
                </div>
              </div>
            )}
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="col-span-1 ">
              <h1 className="text-gray-700 text-xl md:text-2xl lg:text-3xl xl:text-[35px] mb-10">
                Sunday Bazar Listing
              </h1>
              {Object.keys(data).map((item) => (
                <div key={item} className="my-4">
                  <div className="flex justify-between items-center">
                    <h6 className="mt-6 mb-3 font-semibold text-gray-700 text-base xs:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                      {item}
                    </h6>
                    <Link
                      to={"/sunday-bazar/category"}
                      className="mb-0 pt-1 text-xs xs:text-sm inline-flex items-center text-secondary-600"
                    >
                      See All <Icon icon={"material-symbols:arrow-right-alt"} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data[item].map((item, index) => (
                      <LiveCard data={item} key={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default SundayBazarListing;
