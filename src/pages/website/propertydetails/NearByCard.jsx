import { Icon } from "@iconify/react";
import { useState } from "react";
import { CustomModal } from "./CustomModal";

const NearByCard = ({ img, title }) => {
  const [modal, setModal] = useState(false);

  const Rupees = new Intl.NumberFormat("ur-PK", {
    style: "currency",
    currency: "PKR",
  });

  return (
    <>
      <div className="w-[100px] xs:w-[150px] h-[110px] xs:h-[160px] rounded-md shadow-md mb-1">
        <div className="w-full h-[65%] overflow-hidden rounded-t-md">
          <img
            className="w-full h-[100%] scale-100 hover:scale-110 transition-all duration-500 object-cover"
            src={img}
            alt=""
          />
        </div>
        <div
          onClick={() => setModal(true)}
          className="w-full h-[35%] flex justify-between items-center cursor-pointer px-4 text-[10px] xs:text-sm font-medium uppercase text-black-500"
        >
          <p>{title}</p>
          <Icon
            className="w-3 xs:w-5 h-3 xs:h-5"
            icon="solar:alt-arrow-right-outline"
          />
        </div>
      </div>
      <CustomModal
        activeModal={modal}
        onClose={() => setModal(false)}
        headerContent={
          <div className="w-full flex flex-col md:flex-row md:items-center md:gap-8">
            <p className=""> {Rupees.format(135000)}</p>
            <p className="md:w-[50%] truncate text-xs md:text-base">
              Sector N 5 Marla Brand Designer House For Sale In Bahria Enclave
              Islamabad
            </p>{" "}
            <div className=" flex items-center gap-2">
              <div className="col-span-1 text-base lg:text-lg flex gap-1 items-center truncate py-1">
                <Icon icon="cbi:roomsbedroom" />
                <span className="text-[10px] sm:text-xs">3 Bedrooms</span>
              </div>
              <div className="col-span-1 text-base lg:text-lg flex gap-1 items-center truncate py-1">
                <Icon icon="fa:shower" />
                <span className="text-[10px] sm:text-xs">2 Bathrooms</span>
              </div>{" "}
              <div className="col-span-1 text-base lg:text-lg flex gap-1 items-center truncate py-1">
                <Icon icon="bi:building-up" />
                <span className="text-[10px] sm:text-xs">4 Marla</span>
              </div>
            </div>{" "}
          </div>
        }
        label="Banner"
        themeClass="w-full p-2 xs:p-4"
        centered={true}
        noFade={false}
        className="max-w-xl md:max-w-3xl lg:max-w-5xl flex flex-col items-end justify-center "
      >
        <div className="w-full">
          <ul className="w-[100%] flex items-center justify-between uppercase border overflow-x-auto lg:overflow-clip text-xs">
            <li className="w-[100px] lg:w-[20%] flex items-center justify-center transition duration-300 ease-in-out px-2 py-2 active:bg-main active:text-white cursor-pointer border-r">
              property
            </li>
            <li className="w-[100px] lg:w-[20%] flex items-center justify-center transition duration-300 ease-in-out px-2 py-2 active:bg-main active:text-white cursor-pointer border-r">
              schools
            </li>
            <li className="w-[100px] lg:w-[20%] flex items-center justify-center transition duration-300 ease-in-out px-2 py-2 active:bg-main active:text-white cursor-pointer border-r">
              restaurants
            </li>
            <li className="w-[100px] lg:w-[20%] flex items-center justify-center transition duration-300 ease-in-out px-2 py-2 active:bg-main active:text-white cursor-pointer border-r">
              hospitals
            </li>
            <li className="w-[100px] lg:w-[20%] flex items-center justify-center transition duration-300 ease-in-out px-2 py-2 active:bg-main active:text-white cursor-pointer ">
              parks
            </li>
          </ul>
          <div className="grid grid-cols-12 lg:h-[400px] gap-4 mt-5">
            <div className="col-span-12">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52922921.49958086!2d-161.86807403431987!3d35.94308550326223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1709121781579!5m2!1sen!2s"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default NearByCard;
