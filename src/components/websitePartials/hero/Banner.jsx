/* eslint-disable react/prop-types */
import Modal from "../../ui/Modal";
import { Icon } from "@iconify/react";
const Banner = ({ active, handleClose, img, handleOpen }) => {
  const handleSee = () => {
    handleClose();
  };
  return (
    <>
      <img
        className="w-full h-full object-cover"
        src={img}
        alt=""
        onClick={handleOpen}
      />
      <Modal
        title=""
        label="Banner"
        activeModal={active}
        onClose={handleClose}
        themeClass="bg-main p-2 xs:p-4"
        centered={true}
        noFade={false}
        className="max-w-xl md:max-w-3xl lg:max-w-5xl flex flex-col items-end justify-center "
      >
        <img className="w-full h-full object-cover" src={img} alt="" />
        <h4 className="mt-2 md:mt-4 text-lg md:text-2xl">
          Where does it come from?
        </h4>
        <p className="text-[10px] md:text-sm md:mt-2">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur,
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSee}
            className="flex items-center gap-2 justify-end mt-2 text-sm "
          >
            View Promotion <Icon icon={"teenyicons:arrow-right-outline"} />{" "}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Banner;
