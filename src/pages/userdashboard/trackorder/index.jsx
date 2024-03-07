import { Timeline } from "primereact/timeline";
import { Icon } from "@iconify/react";
import useWidth from "../../../hooks/useWidth";

// images
import Confirm from "../../../assets/images/order/confirm.png"
import Delivierd from "../../../assets/images/order/delivered.png"
import Dispatch from "../../../assets/images/order/dispach.png"
import Placed from "../../../assets/images/order/place-order.png"
import Processing from "../../../assets/images/order/processing.png"


const TrackOrder = () => {
  const { width } = useWidth();

  const events = [
    {
      status: "Ordered",
      date: "15/10/2020 10:30",
      icon: "grommet-icons:cart",
      color: "#9C27B0",
      img:Placed
    },
    {
      status: "Confirmed",
      date: "15/10/2020 10:30",
      icon: "grommet-icons:cart",
      color: "#FF9800",
      img:Confirm
    },
    {
      status: "Processing",
      date: "15/10/2020 14:00",
      icon: "grommet-icons:cart",
      color: "#673AB7",
      img:Processing
    },
    {
      status: "Shipped",
      date: "15/10/2020 16:15",
      icon: "grommet-icons:cart",
      color: "#FF9800",
      img:Dispatch
    },
    {
      status: "Delivered",
      date: "16/10/2020 10:00",
      icon: "grommet-icons:cart",
      color: "#607D8B",
      img:Delivierd
    },
  ];

  const customizedMarker = (item) => {
    return (
      <span
        className="flex w-8 h-8 items-center justify-center text-white rounded-full z-1 shadow-md"
        style={{ backgroundColor: item.color }}
      >
        <Icon icon={item.icon}></Icon>
      </span>
    );
  };

  const customizedContent = (item) => {
    return (
      <div className="flex flex-col gap-2 bg-white rounded-md p-4">
        <h6>{item.status}</h6>
        <p className="text-[12px]">{item.date}</p>
        <img src={item.img} alt={item.status} className="w-20" />
      </div>
    );
  };

  return (
    <div className="card">
      <Timeline
        value={events}
        align={width < 769 ? "left" : "alternate"}
        className="customized-timeline gap-2 md:gap-0"
        marker={customizedMarker}
        content={customizedContent}
      />
    </div>
  );
};

export default TrackOrder;
