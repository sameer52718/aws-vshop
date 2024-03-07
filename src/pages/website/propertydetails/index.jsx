import { useEffect, useRef, useState } from "react";
// import { TabView, TabPanel } from "primereact/tabview";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Breadcrumbs from "../../../components/websitePartials/breadcrumb";
// import mapImg from "../../../assets/images/all-img/schememap.webp";
import locationMap from "../../../assets/images/all-img/location-map.svg";
import schoolMap from "../../../assets/images/all-img/school-map.svg";
import restaurantMap from "../../../assets/images/all-img/restaurant-map.svg";
import hospitalMap from "../../../assets/images/all-img/hospital-map.svg";
import parkMap from "../../../assets/images/all-img/park-map.svg";
import Thumbnail from "../../../assets/images/vectors/thumbnail.png";

// import vShopLogo from "../../../assets/images/logo/icon.png";
import useWidth from "../../../hooks/useWidth";
// import NearByCard from "./NearByCard";
import Textinput from "../../../components/ui/Textinput";
import Textarea from "../../../components/ui/Textarea";
import PropertyCard from "../../../components/websitePartials/propertycard";
import ReviewCard from "./ReviewCard";
import { toast } from "react-toastify";
import axios from "axios";
import { getPropertyDetail, insertReview, propertyFilesRoute } from "../../../constant/apiRoutes";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AreaUnit,
  numberInputs,
  propertyCheckbox,
  propertyPurpose,
  selectBoxes,
  options,
} from "../../../constant/contants";
import Loading from "../../../components/Loading";
import moment from "moment";
import ReviewModal from "../../../components/websitePartials/reviewModal";
const data2 = [
  { title: "location", image: locationMap },
  { title: "school", image: schoolMap },
  { title: "restaurant", image: restaurantMap },
  { title: "hospital", image: hospitalMap },
  { title: "park", image: parkMap },
  { title: "location", image: locationMap },
  { title: "school", image: schoolMap },
  { title: "restaurant", image: restaurantMap },
  { title: "hospital", image: hospitalMap },
  { title: "park", image: parkMap },
];

const PropertyDetails = () => {
  const { token , userType} = useSelector((state) => state.auth);
  const { id } = useParams();
  const {
    width,
    breakpoints: { md, lg, xl },
  } = useWidth();
  const [property, setProperty] = useState({});
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active,setActive] = useState(false)
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const Rupees = new Intl.NumberFormat("ur-PK", {
    style: "currency",
    currency: "PKR",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(getPropertyDetail, { id }, { headers: token });
        if (data.error === false) {
          const { property, related } = data.data;
          setRelated(related);
          setProperty(property.length > 0 ? property[0] : {});
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [id, token]);

  const genDescription = () => {
    const unit = AreaUnit.find((item) => parseInt(item.id) === parseInt(property?.unit));
    const purpose = propertyPurpose.find((item) => parseInt(item.id) === parseInt(property?.purpose));
    return `${property?.area} ${unit?.name} ${property?.subtype} for ${purpose?.name} in ${property?.city}, ${property?.state}, ${property?.country}`;
  };

  const handleSubmit = async (data) => {
    try {
      const { data: res } = await axios.post(
        insertReview,
        { ...data, content_type: 5, id },
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
        <section className="container flex flex-col my-8">
          <Breadcrumbs previosLinks={[{ name: "properties", link: "/properties" }]} currentLink="Property" />
          <div className="w-full bg-white p-2 xs:p-5 rounded-md grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-5">
            <div className="w-full col-span-1 lg:col-span-9">
              <div className="w-full h-[200px] xs:h-[280px] sm:h-[380px] lg:h-[520px]">
                <Swiper
                  className="w-full h-full"
                  spaceBetween={20}
                  loop="true"
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  pagination={true}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                  }}
                  modules={[Autoplay, Navigation, Pagination]}
                >

                  {property.files ? property.files.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img className="w-full h-full object-cover rounded-md" src={`${propertyFilesRoute}/${item}`} alt="property picture" />
                    </SwiperSlide>
                  )) : (<SwiperSlide>
                    <img className="w-full h-full object-cover rounded-md"  src={Thumbnail} alt="property picture" />
                  </SwiperSlide>) }
                  <div className="absolute top-1/2 transform -translate-y-1/2 w-full z-50 px-2 flex justify-between items-center">
                    <div
                      ref={navigationPrevRef}
                      className="w-[30px] xs:w-[40px] h-[30px] xs:h-[40px] bg-black-50 text-black-500 cursor-pointer flex justify-center items-center rounded"
                    >
                      <Icon className="w-[20px] h-[20px]" icon="teenyicons:arrow-left-solid" />
                    </div>
                    <div
                      ref={navigationNextRef}
                      className="w-[30px] xs:w-[40px] h-[30px] xs:h-[40px] bg-black-50 text-black-500 cursor-pointer flex justify-center items-center rounded"
                    >
                      <Icon className="w-[20px] h-[20px]" icon="teenyicons:arrow-right-solid" />
                    </div>
                  </div>
                </Swiper>
              </div>
              <div className="w-full flex flex-col text-sm text-black-500 mt-5 xs:mt-10">
                <div
                  className={`w-[100%] p-2 rounded-md  items-center gap-2 text-white bg-main overflow-x-auto md:overflow-x-hidden scrollbar-hidden flex`}
                >
                  <a
                    href="#overview"
                    className={`w-[120px] px-4 py-0  xs:py-2 font-semibold text-[8px] xs:text-xs sm:text-sm lg:text-base leading-6 rounded-full capitalize transition-all duration-150 md:whitespace-nowrap whitespace-normal `}
                  >
                    Overviews
                  </a>
                  <a
                    href="#detail"
                    className={`w-[120px] px-4 py-0  xs:py-2 font-semibold text-[8px] xs:text-xs sm:text-sm lg:text-base leading-6 rounded-full capitalize transition-all duration-150 md:whitespace-nowrap whitespace-normal `}
                  >
                    Details
                  </a>
                  <a
                    href="#amenities"
                    className={`w-[120px] px-4 py-0  xs:py-2 font-semibold text-[8px] xs:text-xs sm:text-sm lg:text-base leading-6 rounded-full capitalize transition-all duration-150 md:whitespace-nowrap whitespace-normal `}
                  >
                    Amenities
                  </a>
                  <a
                    href="#location"
                    className={`w-[120px] px-4 py-0  xs:py-2 font-semibold text-[8px] xs:text-xs sm:text-sm lg:text-base leading-6 rounded-full capitalize transition-all duration-150 md:whitespace-nowrap whitespace-normal `}
                  >
                    Location
                  </a>
                  <a
                    href="#review"
                    className={`w-[120px] px-4 py-0  xs:py-2 font-semibold text-[8px] xs:text-xs sm:text-sm lg:text-base leading-6 rounded-full capitalize transition-all duration-150 md:whitespace-nowrap whitespace-normal `}
                  >
                    Reviews
                  </a>
                  <a
                    href="#related"
                    className={`w-[120px] px-4 py-0  xs:py-2 font-semibold text-[8px] xs:text-xs sm:text-sm lg:text-base leading-6  rounded-full capitalize transition-all duration-150 md:whitespace-nowrap whitespace-normal `}
                  >
                    Related
                  </a>
                </div>
                <h5 id="overview" className="font-bold leading-5 xs:leading-9 my-4 md:my-8 tracking-wide text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl">
                  {genDescription()}
                </h5>
                <div id="detail" className="grid grid-cols-1 sm:grid-cols-12 sm:gap-8">
                  <div className="col-span-1 sm:col-span-6">
                    <p className="w-[100%] grid grid-cols-12 text-xs xs:text-sm lg:text-base bg-black-50 p-[6px]">
                      <span className="col-span-6 font-semibold">Type</span>
                      <span className="col-span-6">{property?.type}</span>
                    </p>
                    <p className="w-[100%] grid grid-cols-12 text-xs xs:text-sm lg:text-base bg-white px-1 py-[10px]">
                      <span className="col-span-6 font-semibold">Price</span>
                      <span className="col-span-6">{Rupees.format(property?.price)}</span>
                    </p>
                    <p className="w-[100%] grid grid-cols-12 text-xs xs:text-sm lg:text-base bg-black-50 p-[6px]">
                      <span className="col-span-6 font-semibold">Area</span>
                      <span className="col-span-6">
                        {property?.area} {AreaUnit.find((item) => parseInt(item.id) === parseInt(property?.unit))?.name}
                      </span>
                    </p>
                    <p className="w-[100%] grid grid-cols-12 text-xs xs:text-sm lg:text-base bg-white px-1 py-[10px]">
                      <span className="col-span-6 font-semibold">Baths</span>
                      <span className="col-span-6">{property?.bathroom}</span>
                    </p>
                    <p className="w-[100%] grid grid-cols-12 text-xs xs:text-sm lg:text-base bg-black-50 p-[6px]">
                      <span className="col-span-6 font-semibold">Condition</span>
                      <span className="col-span-6">{property?.condition}/10</span>
                    </p>
                    <p className="w-[100%] grid grid-cols-12 text-xs xs:text-sm lg:text-base bg-white px-1 py-[10px]">
                      <span className="col-span-6 font-semibold">Purpose</span>
                      <span className="col-span-6">
                        {propertyPurpose.find((item) => parseInt(item.id) === parseInt(property?.purpose))?.name}
                      </span>
                    </p>
                  </div>
                  <div className="col-span-1 sm:col-span-6">
                    <p className="w-[100%] grid grid-cols-12 text-xs xs:text-sm lg:text-base bg-white px-1 py-[10px]">
                      <span className="col-span-6 font-semibold">Bedrooms</span>
                      <span className="col-span-6">{property?.bedroom}</span>
                    </p>
                    <p className="w-[100%] grid grid-cols-12 text-xs xs:text-sm lg:text-base bg-black-50 p-[6px]">
                      <span className="col-span-6 font-semibold">Added</span>
                      <span className="col-span-6">{moment(property?.time).fromNow()}</span>
                    </p>
                    <p className="w-[100%] grid grid-cols-12 text-xs xs:text-sm lg:text-base bg-white px-1 py-[10px]">
                      <span className="col-span-6 font-semibold">City - State</span>
                      <span className="col-span-6">
                        {property?.city} - {property?.state}
                      </span>
                    </p>
                    <p className="w-[100%] grid grid-cols-12 text-xs xs:text-sm lg:text-base bg-black-50 p-[6px]">
                      <span className="col-span-6 font-semibold">Country</span>
                      <span className="col-span-6">{property?.country}</span>
                    </p>
                    <p className="w-[100%] grid grid-cols-12 text-xs xs:text-sm lg:text-base bg-white px-1 py-[10px]">
                      <span className="col-span-6 font-semibold">Location</span>
                      <span className="col-span-6">{property?.location}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-t-2 border-black-500 mt-10 pt-5">
                <h6 className="text-base xs:text-lg font-bold">Description</h6>
                <p className="text-xs xs:text-sm mt-2">{property?.description}</p>
              </div>
              <div id="amenities" className="flex flex-col border-t-2 border-black-500 mt-10 pt-5">
                <h6 className="text-base xs:text-lg font-bold">Amenities</h6>
                <div className="grid grid-cols-12 bg-black-50">
                  {numberInputs.map((item, index) => {
                    const value = property.amenities.find((amenity) => amenity.name === item.key).value;

                    return (
                      <p
                        className="col-span-12 sm:col-span-6 grid grid-cols-12 text-xs xs:text-sm lg:text-base  p-[6px]"
                        key={index}
                      >
                        <span className="col-span-6 font-semibold truncate">{item.name}</span>
                        <span className="col-span-6">{value}</span>
                      </p>
                    );
                  })}

                  {selectBoxes.map((item, index) => {
                    const value = property.amenities.find((amenity) => amenity.name === item.key).value;
                    return (
                      <p
                        className="col-span-12 sm:col-span-6 grid grid-cols-12 text-xs xs:text-sm lg:text-base  p-[6px]"
                        key={index}
                      >
                        <span className="col-span-6 font-semibold truncate">{item.name}</span>
                        <span className="col-span-6">
                          {item.key === "built_in_year"
                            ? value
                            : options.find((item) => parseInt(item.id) === parseInt(value))?.name}
                        </span>
                      </p>
                    );
                  })}
                </div>

                <div className="w-[100%] h-[350px] xs:h-[200px]  py-3 flex text-black-500 bg-black-50">
                  <div className="w-[60%] xs:w-[70%] lg:w-[78%] grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 pl-4 gap-2">
                    {propertyCheckbox.map((item, index) => {
                      const isTrue = property.amenities.find((amenity) => amenity.name === item.key).value;
                      if (isTrue) {
                        return (
                          <div
                            className="col-span-1 text-base lg:text-lg flex gap-1 items-center truncate py-1"
                            key={index}
                          >
                            <Icon icon={item.icon} />
                            <span className="text-[10px] sm:text-xs">{item.name}</span>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              {/* <div ref={location} className="flex flex-col border-t-2 border-black-500 mt-10 pt-5">
                <h6 className="text-base xs:text-lg font-bold">Location & Nearby</h6>
                <div className="w-[100%]">
                  <TabView
                    pt={{
                      inkbar: "bg-main border-b-none",
                      nav: " border-b-none",
                    }}
                    color="text-main"
                    className="pb-1"
                  >
                    <TabPanel
                      headerClassName="uppercase text-main"
                      header="Bahria enclave map"
                      pt={{ headerAction: "text-main text-[10px] xs:text-base" }}
                    >
                      <div className="relative w-full h-[160px] xs:h-[220px] rounded-md bg-white shadow-xl z-10">
                        <img className="w-full h-full object-cover rounded-md opacity-20" src={mapImg} alt="" />
                        <div className="absolute text-black-500 w-full h-full top-0 z-50 flex flex-col justify-center items-center">
                          <Icon className="text-main w-4 xs:w-8 h-4 xs:h-8" icon="ri:map-pin-2-line" />
                          <h4 className="text-xs xs:text-xl font-semibold mt-2">Tap to View Society Maps </h4>
                          <p className="xs:w-[300px] text-[10px] xs:text-base font-medium text-center">
                            Find out the location of the property on an interactive society map
                          </p>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel
                      headerClassName="uppercase text-main border-b-none"
                      header="nearby"
                      pt={{ headerAction: "text-main text-[10px] xs:text-base" }}
                    >
                      <Swiper
                        breakpoints={{
                          // Add breakpoints for different screen sizes
                          320: {
                            slidesPerView: 2.2,
                          },
                          375: {
                            slidesPerView: 2.6,
                          },
                          425: {
                            slidesPerView: 3,
                          },
                          450: {
                            slidesPerView: 2.2,
                          },
                          640: {
                            slidesPerView: 3,
                          },
                          768: {
                            slidesPerView: 4,
                          },

                          1280: {
                            slidesPerView: 5,
                          },
                        }}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        loop={true}
                      >
                        {data2.map((card, index) => (
                          <SwiperSlide key={index}>
                            <NearByCard img={card.image} title={card.title} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </TabPanel>
                  </TabView>
                </div>
              </div> */}
              {property?.reviews?.length > 0 && (
                <div id="review" className="flex flex-col border-t-2 border-black-500 mt-10 pt-5">
                  <div className="w-full flex justify-between items-center py-2">
                    <h6 className="text-base xs:text-lg font-bold">Reviews</h6>
                    <Icon
                      className={`w-6 h-6 p-1 bg-main text-white rounded-full transition-all duration-300 ease-in-out cursor-pointer`}
                      icon="charm:plus"
                    />
                  </div>
                  <div className="w-full mt-5">
                    <Swiper
                      className=""
                      spaceBetween={20}
                      slidesPerView={width < md ? 1 : width < lg ? 1.2 : width < xl ? 1.5 : 2}
                      breakpoints={{
                        320: { slidesPerView: 1.2 },
                        425: { slidesPerView: 1.3 },
                        640: { slidesPerView: 1.6 },
                        768: { slidesPerView: 1.8 },
                        1024: { slidesPerView: 2 },
                        1280: { slidesPerView: 2.5 },
                      }}
                      loop="true"
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      navigation={true}
                      modules={[Autoplay, Navigation]}
                    >
                      {property?.reviews?.map((item, index) => (
                        <SwiperSlide className="" key={index}>
                          <ReviewCard data={item} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              )}
              {related.length > 0 && (
                <div id="related" className="flex flex-col border-t-2 border-black-500 mt-10 pt-5">
                  <h6 className="text-lg font-bold">Related Projects</h6>
                  <div className="w-full mt-5 ">
                    <Swiper
                      className=""
                      spaceBetween={10}
                      breakpoints={{
                        320: { slidesPerView: 1.2 },
                        350: { slidesPerView: 1.4 },
                        425: { slidesPerView: 1.5 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 2.5 },
                        1024: { slidesPerView: 2.5 },
                        1280: { slidesPerView: 2.8 },
                      }}
                      loop="true"
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      navigation={true}
                      modules={[Autoplay, Navigation]}
                    >
                      {related?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <PropertyCard className="bg-black-100" data={item} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full col-span-1 lg:col-span-3">
              <div className="w-full flex flex-col border p-2 sm:p-4 rounded-md gap-2 sm:gap-4">
                <div className="text-lg xs:text-xl font-semibold p-2 text-black-900 rounded-md mt-2">
                  {Rupees.format(property?.price)}
                </div>{" "}
                <div className="flex flex-col gap-4 px-4 py-4 sm:py-6 rounded-md bg-black-50">
                  <Textinput label="Name" type="text" classLabel="font-semibold mb-1 text-sm" placeholder="" />
                  <Textinput label="Email" type="email" classLabel="font-semibold mb-1 text-sm" placeholder="" />
                  <Textinput label="Phone" type="phone" classLabel="font-semibold mb-1 text-sm" placeholder="" />
                  <Textarea label="Message" classLabel="font-semibold mb-1 text-sm" placeholder="" />
                </div>
                <button className="w-full text-sm xs:text-lg py-2 bg-primary-900 text-white rounded-md flex items-center gap-1 justify-center item">
                  <Icon className="w-4 xs:w-6 h-4 xs:h-6" icon="ic:round-email" />
                  Send
                </button>
              </div>
            </div>
          </div>
          <ReviewModal active={active} handleClose={() => setActive(false)} submitData={handleSubmit} />
        </section>
      )}
      {userType && (
            <button type="button" className="btn btn-primary fixed bottom-8 left-8" onClick={() => setActive(true)}>
              Write Review
            </button>
          )}
    </>
  );
};

export default PropertyDetails;
