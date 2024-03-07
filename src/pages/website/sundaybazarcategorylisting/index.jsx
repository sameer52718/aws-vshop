import LiveCard from "@/components/websitePartials/livecard";
import { data } from "@/constant/data";
import NoProduct from "@/assets/images/vectors/no-product.png";

const SundayBazarCategoryListing = () => {
  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 ">
        <div className="col-span-1 ">
          <h1 className="text-2xl lg:text-4xl mb-10">
            Sunday Bazar Category Listing
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item, index) => (
              <LiveCard data={item} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div>
        {data.length === 0 && (
          <div className="flex justify-center items-center h-[600px]">
            <img src={NoProduct} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SundayBazarCategoryListing;
