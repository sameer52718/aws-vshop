import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { sortOptions } from "@/constant/data";
import { homeSearch } from "@/constant/apiRoutes";
import ProductCard from "@/components/websitePartials/productCard";
import NoResult from "@/assets/images/vectors/no-results.png";
import Loading from "@/components/Loading";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";

const SearchResults = () => {
  const [searchparams] = useSearchParams();
  const search = searchparams.get("search");
  const category_id = searchparams.get("category");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const body = {
          search,
          sort,
        };
        if (category_id) {
          body.category_id = category_id;
        }
        const { data } = await axios.post(homeSearch, body);
        if (data.error === false) {
          setData(data.data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [category_id, search, sort]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container flex flex-col py-8">
          <div className="w-[100%] flex flex-col items-center mb-8">
            <Card className="w-[100%]" bodyClass="flex gap-4 items-center justify-between p-5">
              <p className="text-sm md:text-base font-medium">
                {data?.count} items found for <span className="text-main">{search}</span>
              </p>
              <div className="flex items-center gap-2 text-sm">
                <label>Sort by: </label>
                <Select
                  className="w-[150px]"
                  options={sortOptions}
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                  id={"Sort"}
                />
              </div>
            </Card>
          </div>
          {data?.count === 0 ? (
            <div className="flex justify-center items-center py-8">
              <img src={NoResult} alt="" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 my-4 sm:my-0">
              {data?.product?.map((item, index) => (
                <ProductCard key={index} data={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchResults;
