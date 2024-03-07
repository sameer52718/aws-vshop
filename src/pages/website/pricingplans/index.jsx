import { useState } from "react";
import { Tab } from "@headlessui/react";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

const PricingPlans = () => {
  const [selectedTab, setSelectedTab] = useState("seller");
  const [duration, setduration] = useState("mon");

  const cards = {
    basic:
      "Affordable basic price plan offering essential features, perfect for those starting out, ensuring value without compromising on key functionalities.",
    plus: "Elevate your experience with our Plus plan, unlocking advanced features and exclusive perks for enhanced performance and productivity.",
    premium:
      "Upgrade to our premium plan for an enriched experience, combining essential features with exclusive benefits for enhanced functionality and performance.",
  };

  return (
    <div className="container flex flex-col my-10 items-center gap-5">
      <h1 className="text-lg xs:text-xl md:text-xl lg:text-2xl xl:text-3xl md:w-[80%] lg:w-[70%] text-center">
        Build your brand with enhanced product Videos at ViewNShop digital store
      </h1>

      <Tab.Group>
        <Tab.List>
          <Tab className="outline-none">
            <button
              onClick={() => setSelectedTab("seller")}
              className={`font-semibold  text-sm leading-6 px-6 md:py-3 py-[10px] rounded-l-lg capitalize  transition-all duration-150 md:whitespace-nowrap whitespace-normal relative ${
                selectedTab === "seller"
                  ? "bg-main dark:hover:bg-opacity-70  text-white ring-main disabled:opacity-50"
                  : "bg-secondary-500 dark:hover:bg-opacity-70  text-white ring-secondary-500"
              }`}
            >
              Shop
            </button>
          </Tab>
          <Tab className="outline-none">
            <button
              onClick={() => setSelectedTab("reseller")}
              className={`font-semibold  text-sm leading-6 px-6 md:py-3 py-[10px] rounded-r-lg capitalize  transition-all duration-150 md:whitespace-nowrap whitespace-normal relative ${
                selectedTab === "reseller"
                  ? "bg-main dark:hover:bg-opacity-70  text-white ring-main disabled:opacity-50"
                  : "bg-secondary-500 dark:hover:bg-opacity-70  text-white ring-secondary-500"
              }`}
            >
              Reseller
            </button>
          </Tab>
        </Tab.List>
        {/* <div className="flex flex-wrap gap-3">
            <div className="flex align-items-center">
              <RadioButton
                inputId="duration1"
                name="pizza"
                value="mon"
                onChange={(e) => setduration(e.value)}
                checked={duration === "mon"}
              />
              <label htmlFor="duration1" className="ml-2">
                Montly
              </label>
            </div>
            <div className="flex align-items-center">
              <RadioButton
                inputId="duration2"
                name="pizza"
                value="year"
                onChange={(e) => setduration(e.value)}
                checked={duration === "year"}
              />
              <label htmlFor="duration2" className="ml-2">
                Yearly
              </label>
            </div>
          </div> */}
        <Tab.Panels className="w-full">
          <Tab.Panel>
            <div className="flex flex-col items-end">
              <div className="w-[100%] flex flex-wrap justify-center xs:justify-end xs:gap-3 xs:mr-10 sm:mr-36 md:mr-0 xl:mr-28">
                <button
                  onClick={() => setduration("mon")}
                  className={`px-2 xs:px-3 py-1 text-xs xs:text-base border-2 xs:border-[3px] font-semibold border-main rounded-md transition duration-300 ease-in-out ${
                    duration === "mon"
                      ? "bg-main text-white scale-[1]"
                      : "bg-transparent text-main scale-[0.85]"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setduration("year")}
                  className={`px-2 xs:px-3 py-1 text-xs xs:text-base border-2 xs:border-[3px] font-semibold border-main rounded-md transition duration-300 ease-in-out ${
                    duration === "year"
                      ? "bg-main text-white scale-[1]"
                      : "bg-transparent text-main scale-[0.85]"
                  }`}
                >
                  Yearly
                </button>
                {/* <div className="flex align-items-center">
                  <RadioButton
                    inputId="duration1"
                    name="pizza"
                    value="mon"
                    onChange={(e) => setduration(e.value)}
                    checked={duration === "mon"}
                  />
                  <label htmlFor="duration1" className="ml-2">
                    Montly
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="duration2"
                    name="pizza"
                    value="year"
                    onChange={(e) => setduration(e.value)}
                    checked={duration === "year"}
                  />
                  <label htmlFor="duration2" className="ml-2">
                    Yearly
                  </label>
                </div> */}
              </div>
              <div className="w-[100%] flex justify-center items-center pt-5">
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  spaceBetween={0}
                  breakpoints={{
                    // Add breakpoints for different screen sizes
                    350: {
                      slidesPerView: 1.2,
                    },
                    400: {
                      slidesPerView: 1.3,
                    },
                    430: {
                      slidesPerView: 1.4,
                    },
                    450: {
                      slidesPerView: 1.5,
                    },
                    500: {
                      slidesPerView: 1.6,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 2.6,
                    },
                    1280: {
                      slidesPerView: 3,
                    },
                  }}
                  modules={[EffectCoverflow]}
                >
                  <SwiperSlide className="flex items-center">
                    <Card
                      name="Standard"
                      price={duration === "year" ? 500 * 12 - 1000 : 500}
                      description={cards.basic}
                      duration={duration}
                      advantages={{
                        category: "1",
                        products: "3",
                        storage: "1GB",
                        streaming: {
                          icon: "no",
                          value: "",
                        },
                        listing: {
                          icon: "no",
                          value: "",
                        },
                        dashboard: "no",
                        salesDash: "no",
                        chat: "no",
                      }}
                    />
                  </SwiperSlide>
                  <SwiperSlide className="flex items-center">
                    <Card
                      name="Gold"
                      price={duration === "year" ? 1500 * 12 - 1000 : 1500}
                      description={cards.plus}
                      duration={duration}
                      advantages={{
                        category: "5",
                        products: "15",
                        storage: "3GB",
                        streaming: {
                          icon: "yes",
                          value: "4",
                        },
                        listing: {
                          icon: "yes",
                          value: "2 weeks",
                        },
                        dashboard: "yes",
                        salesDash: "yes",
                        chat: "yes",
                      }}
                    />
                  </SwiperSlide>
                  <SwiperSlide className="flex items-center">
                    <Card
                      name="Platinum"
                      price={duration === "year" ? 3000 * 12 - 1000 : 3000}
                      description={cards.premium}
                      duration={duration}
                      advantages={{
                        category: "Unlimited",
                        products: "Unlimited",
                        storage: "5GB",
                        streaming: {
                          icon: "yes",
                          value: "8",
                        },
                        listing: {
                          icon: "yes",
                          value: "",
                        },
                        dashboard: "yes",
                        salesDash: "yes",
                        chat: "yes",
                      }}
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="flex flex-col items-end">
              <div className="w-[100%] flex justify-center xs:justify-end flex-wrap xs:gap-3 xs:mr-8 md:mr-10 lg:mr-36 xl:mr-80">
                <button
                  onClick={() => setduration("mon")}
                  className={`px-2 xs:px-3 py-1 text-xs xs:text-base border-2 xs:border-[3px] font-semibold border-main rounded-md transition duration-300 ease-in-out ${
                    duration === "mon"
                      ? "bg-main text-white scale-[1]"
                      : "bg-transparent text-main scale-[0.85]"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setduration("year")}
                  className={`px-2 xs:px-3 py-1 text-xs xs:text-base border-2 xs:border-[3px] font-semibold border-main rounded-md transition duration-300 ease-in-out ${
                    duration === "year"
                      ? "bg-main text-white scale-[1]"
                      : "bg-transparent text-main scale-[0.85]"
                  }`}
                >
                  Yearly
                </button>
                {/* <div className="flex align-items-center">
                  <RadioButton
                    inputId="duration1"
                    name="pizza"
                    value="mon"
                    onChange={(e) => setduration(e.value)}
                    checked={duration === "mon"}
                  />
                  <label htmlFor="duration1" className="ml-2">
                    Montly
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="duration2"
                    name="pizza"
                    value="year"
                    onChange={(e) => setduration(e.value)}
                    checked={duration === "year"}
                  />
                  <label htmlFor="duration2" className="ml-2">
                    Yearly
                  </label>
                </div> */}
              </div>
              <div className="w-[100%] lg:w-[80%] xl:w-[60%] lg:mx-auto flex justify-center items-center pt-5">
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  spaceBetween={5}
                  breakpoints={{
                    // Add breakpoints for different screen sizes
                    350: {
                      slidesPerView: 1.2,
                    },
                    400: {
                      slidesPerView: 1.3,
                    },
                    430: {
                      slidesPerView: 1.4,
                    },
                    450: {
                      slidesPerView: 1.5,
                    },
                    500: {
                      slidesPerView: 1.6,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                  }}
                  pagination={true}
                  modules={[EffectCoverflow]}
                >
                  <SwiperSlide className="flex items-center">
                    <Card
                      name="Standard"
                      price={duration === "year" ? 500 * 12 - 1000 : 500}
                      description={cards.basic}
                      duration={duration}
                      advantages={{
                        category: "1",
                        products: "3",
                        storage: "500MB",
                        streaming: {
                          icon: "no",
                          value: "",
                        },
                        listing: {
                          icon: "no",
                          value: "",
                        },
                        dashboard: "no",
                        salesDash: "no",
                        chat: "no",
                      }}
                    />
                  </SwiperSlide>
                  <SwiperSlide className="flex items-center">
                    <Card
                      name="Gold"
                      price={duration === "year" ? 2000 * 12 - 1000 : 2000}
                      description={cards.plus}
                      duration={duration}
                      advantages={{
                        category: "3",
                        products: "10",
                        storage: "2GB",
                        streaming: {
                          icon: "yes",
                          value: "2",
                        },
                        listing: {
                          icon: "yes",
                          value: "2 weeks",
                        },
                        dashboard: "yes",
                        salesDash: "yes",
                        chat: "yes",
                      }}
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PricingPlans;
