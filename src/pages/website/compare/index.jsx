import Breadcrumbs from "../../../components/websitePartials/breadcrumb";
import { Rating } from "primereact/rating";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  getProductDetails,
  productThumbnailRoute,
} from "../../../constant/apiRoutes";
import Loading from "../../../components/Loading";
import { clearCompare } from "../../../store/compare/slice";
import Thumbnail from "../../../assets/images/vectors/thumbnail.png";
import NoCompare from "../../../assets/images/vectors/no-compare.png";
const Compare = () => {
  const { products } = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        for (let index = 0; index < products.length; index++) {
          const body = {
            url: products[index].url,
            select: [
              "product.name",
              "product.description",
              "product.thumbnail",
              "product.video",
              "product.rating",
              "product.price",
              "product.url",
              "product.color",
              "product.size",
              "product.files",
              "category.name as category",
              "subcategory.name as subcategory",
              "category.url as category_url",
            ],
          };
          const { data } = await axios.post(getProductDetails, body);
          if (data.error === false) {
            setData((prev) => [...prev, data.data.product[0]]);
          }
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
    return () => {
      setData([]);
    };
  }, [products]);

  const handleClear = () => {
    dispatch(clearCompare());
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container my-12">
            <div className="">
              <Breadcrumbs currentLink="Compare" />
              {products.length !== 0 && (
                <div className="flex justify-between items-center">
                  <h1 className="text-lg lg:text-xl mb-4">
                    Comparison of{" "}
                    {data.map((item, index) =>
                      data.length === index + 1
                        ? `${item.name} `
                        : `${item.name} vs `
                    )}
                  </h1>
                  <button className="btn btn-primary" onClick={handleClear}>
                    Clear
                  </button>
                </div>
              )}
            </div>
            {products.length === 0 ? (
              <div className="flex justify-center items-center h-screen">
                <img className="w-60" src={NoCompare} alt="No Comparision" />
              </div>
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                      <th scope="col" className="px-6 py-3 ">
                        {data?.at(0)?.subcategory}
                      </th>
                      {data.map((item, index) => (
                        <th scope="col" className="px-6 py-3" key={index}>
                          <img
                            src={
                              item.thumbnail
                                ? `${productThumbnailRoute}/${item.thumbnail}`
                                : Thumbnail
                            }
                            alt=""
                            className="w-40"
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Name
                      </th>
                      {data.map((item, index) => (
                        <td className="px-6 py-4 whitespace-nowrap" key={index}>
                          {item.name}
                        </td>
                      ))}
                    </tr>
                    <tr className="odd:bg-white whitespace-nowrap  even:bg-gray-50  border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Price
                      </th>
                      {data.map((item, index) => (
                        <td className="px-6 py-4" key={index}>
                          {item?.price} PKR
                        </td>
                      ))}
                    </tr>
                    <tr className="odd:bg-white  whitespace-nowrap even:bg-gray-50  border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Rating
                      </th>
                      {data.map((item, index) => (
                        <td className="px-6 py-4" key={index}>
                          <Rating
                            value={item?.rating}
                            readOnly
                            cancel={false}
                            className="flex gap-1 text-xs"
                            size={6}
                          />
                        </td>
                      ))}
                    </tr>
                    <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Category
                      </th>
                      {data.map((item, index) => (
                        <td className="px-6 py-4 " key={index}>
                          {item?.category}
                        </td>
                      ))}
                    </tr>
                    <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Colors
                      </th>
                      {data.map((item, index) => (
                        <td className="px-6 py-4 " key={index}>
                          {item?.color
                            ? JSON.parse(item?.color).join(" ")
                            : "--"}
                        </td>
                      ))}
                    </tr>
                    <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Sizes
                      </th>
                      {data.map((item, index) => (
                        <td className="px-6 py-4 " key={index}>
                          {item?.size ? JSON.parse(item?.size).join(" ") : "--"}
                        </td>
                      ))}
                    </tr>
                    <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Description
                      </th>
                      {data.map((item, index) => (
                        <td className="px-6 py-4 " key={index}>
                          {item.description}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Compare;
