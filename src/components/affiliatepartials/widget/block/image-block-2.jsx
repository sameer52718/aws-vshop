import Image2 from "@/assets/images/all-img/widget-bg-2.png";
import { useSelector } from "react-redux";
const ImageBlock2 = () => {

  const {user} = useSelector(state =>state.auth)

  return (
    <div
      className="bg-no-repeat bg-cover bg-center p-5 rounded-[6px] relative"
      style={{
        backgroundImage: `url(${Image2})`,
      }}
    >
      <div>
        <h4 className="text-xl font-medium text-white mb-2">
          <span className="block font-normal">Hey,</span>
          <span className="block">{`${user?.first_name} ${user?.last_name}`}</span>
        </h4>
        <p className="text-sm text-white font-normal">Welcome to Vshop</p>
      </div>
    </div>
  );
};

export default ImageBlock2;
