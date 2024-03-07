import { Rating } from "primereact/rating";
import { useState } from "react";
import customer from "../../../assets/images/avatar/1.jpg";

const ReviewCard = () => {
  const [value, setValue] = useState(3.5);

  return (
    <div className="w-[100%] h-[180px] sm:h-[250px] flex flex-col items-start text-black-900 bg-black-50 p-5">
      <div className="flex items-start gap-4">
        <img
          className="w-10 xs:w-14 sm:w-16 h-10 xs:h-14 sm:h-16 rounded-full"
          src={customer}
          alt="customer profile picture"
        />
        <div className="flex flex-col">
          <h5 className="text-sm xs:text-base sm:text-lg">Waleed Ali</h5>
          <span className="text-[10px] xs:text-xs sm:text-sm">
            Karachi, Sindh
          </span>
        </div>
      </div>
      <Rating
        value={value}
        onChange={(e) => setValue(e.target.value)}
        cancel={false}
        className="gap-1 mt-2"
        pt={{
          offIcon: { className: "!w-4 sm:!w-5 !h-3 sm:!h-4 " },
          onIcon: {
            className: "!w-4 sm:!w-5 !h-3 sm:!h-4 !text-yellow-400",
          },
        }}
      />
      <p className="text-xs xs:text-sm sm:text-lg font-normal mt-[2px] sm:mt-1 text-ellipsis line-clamp-1">
        Fantastic Property Buying Experience!
      </p>
      <p className="text-[10px] xs:text-xs sm:text-sm mt-[2px] xs:mt-1 text-ellipsis line-clamp-4">
        Smooth process, knowledgeable team, found my dream home. Highly
        recommend for anyone looking to buy property. Outstanding service,
        exceeded expectations in every aspect.
      </p>
      {/* <button className="text-blue-800 font-semibold text-[10px] xs:text-xs sm:text-sm mt-1 sm:mt-2 cursor-pointer">
        Continue Reading...
      </button> */}
    </div>
  );
};

export default ReviewCard;
