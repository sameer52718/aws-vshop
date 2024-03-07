/* eslint-disable react/prop-types */

const Step = ({ step, count }) => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-[80%] md:w-[60%] lg:w-[40%]">
        <ol className="flex items-center w-full justify-center">
          {Array.from({ length: count }).map((_, index) => (
            <li
              key={index}
              className={`flex w-full items-center ${
                count - 1 !== index
                  ? " text-white  after:content-[''] after:w-full after:h-1 after:border-b after:border-main after:border-4 after:inline-block"
                  : ""
              } ${step > index + 1 ? "after:border-main" : "after:border-white"}`}
            >
              <span
                className={`text-lg font-bold  flex items-center justify-center w-10 h-10  rounded-full md:h-16 md:w-16 shrink-0 ${
                  step > index ? "bg-main text-white" : "bg-white text-main"
                }`}
              >
                {"0" + (index+1) }
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Step;
