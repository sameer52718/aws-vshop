/* eslint-disable react-hooks/exhaustive-deps */
import { SellerCategoryUpdate, getSellerCategories } from "../../../constant/apiRoutes";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Card from "@/components/ui/Card";
import axios from "axios";
import DashboardLoader from "@/components/DashboardLoader";
import { Checkbox } from "primereact/checkbox";
import { icon } from "leaflet";
const Category = () => {
  const { categories } = useSelector((state) => state.categories);
  const auth = useSelector((state) => state.auth);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(getSellerCategories, {
        headers: { Authorization: auth.token },
      });
      if (data.error === false) {
        setSelectedCategories(data.data.category.flat(1));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onCategoryChange = (e) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) _selectedCategories.push(e.value);
    else
      _selectedCategories = _selectedCategories.filter(
        (category) => category.category_id !== e.value.category_id
      );

    setSelectedCategories(_selectedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selected = selectedCategories.map(
        (category) => category.category_id
      );

      const { data } = await axios.post(
        SellerCategoryUpdate,
        { category_ids: selected },
        { headers: { Authorization: auth.token } }
      );
      if (data.error === false) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <DashboardLoader />
      ) : (
        <form onSubmit={handleSubmit}>
          <Card title={"Categories"}>
            <div className="grid grid-cols-12 gap-4">
              {categories.map((category) => {
                return (
                  <div
                    key={category.category_id}
                    className="flex items-center text-xs md:text-xm xl:text-base col-span-12 xs:col-span-6 sm:col-span-4 md:col-span-3"
                  >
                    <Checkbox
                      inputId={category.category_id}
                      name="category"
                      value={category}
                      onChange={onCategoryChange}
                      checked={selectedCategories.some(
                        (item) => item.category_id === category.category_id
                      )}
                      pt={{
                        input: {
                          className: "w-4 h-4 md:w-5 md:h-5 self-center",
                        },
                      }}
                    />
                    <label
                      htmlFor={category.category_id}
                      className="md:ml-2 truncate"
                    >
                      {category.name}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end mt-4">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </Card>
        </form>
      )}
    </>
  );
};

export default Category;
