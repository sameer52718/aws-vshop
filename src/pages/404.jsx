import { Link } from "react-router-dom";

import ErrorImage from "@/assets/images/vectors/404.png";
function Error() {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-start items-center text-center py-20 dark:bg-slate-900">
      {/* <div className="max-w-[546px] mx-auto w-full z-[50]">
        <h4 className="text-slate-900 mb-4">Page not found</h4>
        <div className="dark:text-white text-base font-normal mb-10">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </div>
      </div> */}
      <img className=" w-[450px] object-cover" src={ErrorImage} alt="" />

      <div className="max-w-[300px] mx-auto w-full mt-4">
        <Link
          to="/"
          className="btn btn-dark bg-primary-800 dark:bg-slate-800 block text-center"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}

export default Error;
