const ProductCardSkeleton = () => {
  return (
    <div className="rounded-md bg-white dark:bg-slate-700 h-[200px] xs:h-[350px] p-3 shadow-base">
      <div className="animate-pulse h-full">
        <div className=" h-full">
          <div className="h-[40%] xs:h-[60%] w-full rounded bg-[#C4C4C4] dark:bg-slate-500"></div>
          <div className="py-2 space-y-1">
            <div className="h-[16px] w-1/2 bg-[#C4C4C4] dark:bg-slate-500"></div>
            <div className="h-[16px] bg-[#C4C4C4] dark:bg-slate-500"></div>
            <div className="h-[16px] w-1/3 bg-[#C4C4C4] dark:bg-slate-500"></div>
          </div>
          <div className="flex space-x-1">
            <div className="h-4 w-4 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
            <div className="h-4 w-4 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
            <div className="h-4 w-4 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
            <div className="h-4 w-4 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
            <div className="h-4 w-4 bg-[#C4C4C4] dark:bg-slate-500 rounded-full"></div>
          </div>
          <div>
            <span className=" mt-3 h-[18px] bg-[#C4C4C4] dark:bg-slate-500 w-[130px] inline-block "></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
