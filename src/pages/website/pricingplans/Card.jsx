import { Icon } from "@iconify/react";

const Card = ({ name, price, theme, advantages, duration }) => {
  const formattedPrice = new Intl.NumberFormat("ur-PK", {
    style: "currency",
    currency: "PKR",
  }).format(price);

  return (
    <div
      className={`w-[260px] sm:w-[340px] h-[450px] sm:h-[560px] lg:mx-5 ${
        theme ? "bg-main text-white" : "bg-white text-black-500"
      } flex flex-col items-start rounded-lg px-4 sm:px-6 py-6 sm:py-8 border`}
    >
      <div className="flex items-end gap-2 sm:gap-4">
        <div className=" flex justify-center items-center p-4 rounded-lg bg-secondary-300 text-main">
          <Icon
            className="w-5 sm:w-8 h-5 sm:h-8 font-bold"
            icon="ic:outline-plus"
          />
        </div>
        <span className="text-lg sm:text-xl font-semibold">{name}</span>
      </div>
      {/* <div
        className={`my-5 text-xs leading-5 ${
          theme ? "text-white" : "text-gray-500"
        }`}
      >
        {description}
      </div> */}
      <div className="text-2xl sm:text-4xl my-3 sm:my-5">
        {formattedPrice}
        <span
          className={`text-xs sm:text-base ${
            theme ? "text-white" : "text-gray-500"
          }`}
        >
          /{duration}
        </span>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <div className="w-[100%] truncate flex items-center gap-2 text-[10px] sm:text-sm font-medium">
          <Icon
            className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-main text-white font-normal`}
            icon="dashicons:yes"
          />
          {advantages.category} Product{advantages.category == 1 ? "" : "s"}{" "}
          Category Allowed
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-sm font-medium">
          <Icon
            className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-main text-white font-normal`}
            icon="dashicons:yes"
          />
          {advantages.products} Products Allowed
        </div>
        <div className="w-[100%] truncate flex items-center gap-2 text-[10px] sm:text-sm font-medium">
          <Icon
            className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-main text-white font-normal`}
            icon="dashicons:yes"
          />
          Storage for Videos / Images {advantages.storage}
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-sm font-medium">
          <Icon
            className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-main text-white font-normal`}
            icon="dashicons:yes"
          />{" "}
          Manage Inventory & Pricing
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-sm font-medium">
          <Icon
            className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-main text-white font-normal`}
            icon="dashicons:yes"
          />{" "}
          Email Support
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-sm font-medium">
          <Icon
            className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-main text-white font-normal`}
            icon={`dashicons:${advantages.streaming.icon}`}
          />
          {advantages.streaming.value} Streaming Videos / Month
        </div>
        <div className="w-[100%] truncate flex items-center gap-2 text-[10px] sm:text-sm font-medium">
          <Icon
            className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-main text-white font-normal`}
            icon={`dashicons:${advantages.listing.icon}`}
          />{" "}
          Preferred Listing {advantages.listing.value} / Month
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-sm font-medium">
          <Icon
            className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-main text-white font-normal`}
            icon={`dashicons:${advantages.dashboard}`}
          />
          Dashboards
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-sm font-medium">
          <Icon
            className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-main text-white font-normal`}
            icon={`dashicons:${advantages.salesDash}`}
          />
          Sales Analysis Dashboard
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-sm font-medium">
          <Icon
            className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-main text-white font-normal`}
            icon={`dashicons:${advantages.chat}`}
          />
          Chat Support
        </div>
      </div>

      <button
        className={`w-[100%] ${
          theme ? "bg-white text-main" : "bg-main text-white"
        } justify-end items-end font-medium rounded-full mt-2 text-sm sm:text-base sm:mt-4 py-2 sm:py-3`}
        type="button"
      >
        Get Started
      </button>
    </div>
  );
};

export default Card;
