/* eslint-disable react/prop-types */
import ProductCardSkeleton from "../../../components/websitePartials/productCard/skeleton";
import ProductCard from "../../../components/websitePartials/productCard";

const ProductList = ({ products, loading }) => (
  <div className="w-full flex flex-col gap-2">
    <div className="xs:container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 xs:gap-4 py-4 w-[100%] overflow-hidden">
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : products?.map((item, index) => (
            <ProductCard key={index} index={index} data={item} />
          ))}
    </div>
  </div>
);

export default ProductList;
