import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Banner1 from "../../../assets/images/banner/banner-1.jpg";
import Banner2 from "../../../assets/images/banner/banner-2.png";
import Banner3 from "../../../assets/images/banner/banner-3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { getSubCategories } from "../../../constant/apiRoutes";
import { toast } from "react-toastify";
import axios from "axios";
import TreeMenu from "./TreeMenu";
import Banner from "./Banner";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isrightbar, setIsrightbar] = useState(false);
  const [data, setData] = useState({ category: [], subcategory: [] });
  const [banners, setBanners] = useState([
    { id: 1, img: Banner1, active: false },
    { id: 2, img: Banner2, active: false },
    { id: 3, img: Banner3, active: false },
  ]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.post(getSubCategories);
        if (data.error === false) {
          setData(data.data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, []);

  const subcategoriesMap = data.subcategory.reduce((map, subcategory) => {
    const categoryId = subcategory.category_id;
    if (!map[categoryId]) {
      map[categoryId] = [];
    }
    map[categoryId].push(subcategory);
    return map;
  }, {});

  const categoriesWithSubcategories = data.category.map((category) => ({
    ...category,
    subcategories: subcategoriesMap[category.category_id] || [],
  }));

  const handleToggle = (index, setActive) => {
    setBanners((prev) => {
      const updatedBanners = [...prev];
      updatedBanners[index] = { ...updatedBanners[index], active: setActive };
      return updatedBanners;
    });
  };

  // const handleScroll = () => {
  //   const element = document.getElementById("category-ul");
  //   if (element) {
  //     element.scrollTo({
  //       top: element.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  return (
    <>
      <div className=" container flex">
        <div className="lg:w-[20%] xl:w-[20%] md:h-[350px] hidden lg:block xl:block  ">
          <div className="flex items-center justify-start gap-2 cursor-pointer bg-main px-5 py-2 ">
            <Icon className=" w-4 h-4  text-white" icon="ep:menu" />
            <h4 className="font-medium text-white text-sm xl:text-base truncate">
              All Categories
            </h4>
          </div>
          <div className="relative">
            <ul
              id="category-ul"
              className="scrollbar overflow-y-auto h-[300px] xl:h-[365px] overflow-x-hidden"
            >
              <TreeMenu data={categoriesWithSubcategories} />
            </ul>
            {/* <button
              onClick={() => handleScroll()}
              className="absolute w-6 h-6 example-1 bottom-1 -left-5 bg-main text-white p-0 rounded-full"
            >
              <Icon icon="ph:arrow-down-bold" />
            </button> */}
          </div>
        </div>
        <div className=" xl:w-[80%] xl:h-[415px] lg:w-[80%] w-full md:h-[350px] sm:h-[280px] xs:h-[220px] h-[180px] py-2 lg:px-5 xl:px-5 px-1 ">
          <Swiper
            className="mySwiper w-full h-full rounded-md"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
              // type: "custom",
              // renderCustom: () => {},
            }}
            loop
          >
            {banners.map((item, index) => (
              <SwiperSlide className="w-full h-full" key={item.id}>
                <Banner
                  active={item.active}
                  handleClose={() => handleToggle(index, false)}
                  img={item.img}
                  handleOpen={() => handleToggle(index, true)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div
        className={` ${
          isOpen
            ? " z-20 bg-white absolute top-0  flex flex-col justify-between text-black h-screen xl:hidden lg:hidden md:w-[30%] "
            : "hidden"
        }`}
      >
        <div className=" flex flex-col m-5  ">
          <div className="flex justify-end my-5 ">
            <h1
              onClick={() => setIsOpen(false)}
              className=" bg-main text-white px-4 py-2  rounded-full "
            >
              X
            </h1>
          </div>
          <div className="  my-5">
            <ul className="">
              <li className="text-lg p-3 hover:border-b-main hover:text-main font-semibold  border-b flex justify-between cursor-pointer ">
                Home <Icon icon="fe:arrow-up" rotate={1} hFlip={true} />
              </li>
              <li className="text-lg p-3 hover:border-b-main hover:text-main font-semibold  border-b flex justify-between cursor-pointer">
                Shop <Icon icon="fe:arrow-up" rotate={1} hFlip={true} />
              </li>
              <li className="text-lg p-3 hover:border-b-main hover:text-main font-semibold border-b flex justify-between cursor-pointer">
                Products <Icon icon="fe:arrow-up" rotate={1} hFlip={true} />
              </li>
            </ul>
          </div>
        </div>
        <div className="flex  gap-2  justify-center border-2 p-3 m-5 rounded-full ">
          <Icon width={20} height={20} icon="line-md:account" />
          <h1 className="font-semibold"> Login or Register </h1>
        </div>
      </div>

      <div
        className={` ${
          isrightbar
            ? "  z-20 bg-white duration-1000 transition-all ease-in-out  absolute right-0 top-0 flex flex-col justify-between text-black h-screen xl:hidden lg:hidden md:w-[30%] "
            : "hidden"
        }`}
      >
        <div className=" flex flex-col    ">
          <div className="flex p-3  bg-main ">
            <h1 onClick={() => setIsrightbar(false)} className="  text-white ">
              CLOSE X
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
