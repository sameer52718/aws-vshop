import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../../../components/websitePartials/productCard";
import { useDispatch } from "react-redux";
import { fetchProducts, updateFilter } from "../../../store/product/slice";
import Loading from "../../../components/Loading";
import NoProduct from "../../../assets/images/vectors/no-product.png";
import { toast } from "react-toastify";
import axios from "axios";
import { getSubCategories, subcategoryBanner } from "../../../constant/apiRoutes";
import Breadcrumbs from "../../../components/websitePartials/breadcrumb";
const SubCategory = () => {
  const { url } = useParams();
  const [data, setData] = useState({});
  const { products, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFilter({ subcategory_url: url }));
    dispatch(fetchProducts());
    const getData = async () => {
      try {
        const { data } = await axios.get(`${getSubCategories}/${url}`);
        if (data.error === false) {
          setData(data.data.subcategory[0]);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, [dispatch, url]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="flex items-center justify-center w-full h-[450px] relative !bg-no-repeat !bg-cover "
            // style={{ background: `url(${subcategoryBanner}/${data?.banner})` }}
          >
            <img
              className="w-full h-full object-cover"
              src={`${subcategoryBanner}/${data?.banner}`}
              alt="sub category banner"
            />
            {/* <div className="w-full h-[400px] bg-gradient-to-tr from-black-500 absolute z-[100]" /> */}
            {/* <h2 className="text-white relative z-[100] flex items-center gap-2 text-lg md:text-4xl">
              <Icon icon={"bi:caret-right-fill"} />
            </h2>*/}
          </div>

          <div className="container my-10">
            <Breadcrumbs
              previosLinks={[{ name: `${data?.category_name}`, link: "" }]}
              currentLink={data?.subcategory_name}
            />
            {products.length === 0 ? (
              <div className="flex justify-center items-center py-8">
                <img src={NoProduct} alt="" />
              </div>
            ) : (
              <div className="w-full flex flex-col gap-2">
                <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-8 container-fluid w-[100%] overflow-hidden">
                  {products.map((item, index) => (
                    <ProductCard key={index} data={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SubCategory;
