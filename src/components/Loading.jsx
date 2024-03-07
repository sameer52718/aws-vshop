import loader from "../assets/images/logo/loader.gif";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center app_height">
      <img className="w-80 h-60 object-cover" src={loader} alt="...loading" />
    </div>
  );
};

export default Loading;
