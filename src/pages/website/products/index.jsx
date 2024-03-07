import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/websitePartials/breadcrumb";
import Textinput from "@/components/ui/Textinput";
import Checkbox from "@/components/ui/Checkbox";
import Select from "../../../components/ui/Select";

import ProductCard from "@/components/websitePartials/productCard";
import { Paginator } from "primereact/paginator";
import NoProduct from "@/assets/images/vectors/no-product.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/store/product/slice";
import Loading from "@/components/Loading";
import { updateFilter } from "../../../store/product/slice";
import axios from "axios";
import { getSubCategories } from "../../../constant/apiRoutes";
import { Icon } from "@iconify/react";
import useWidth from "../../../hooks/useWidth";

const Product = () => {
  const { options } = useSelector((state) => state.categories);
  const {
    products,
    isLoading,
    filter: {
      category_id,
      subcategory_id,
      top_rated,
      most_viewed,
      keyword,
      max_price,
      min_price,
    },
  } = useSelector((state) => state.product);
  const [subCategories, setSubCategories] = useState([]);
  const dispatch = useDispatch();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [filterMenu, setFilterMenu] = useState(false);
  const {
    width,
    breakpoints: { lg },
  } = useWidth();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (width > lg) {
      setFilterMenu(true);
    }
  }, [lg, width]);

  const handleChange = async (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      dispatch(updateFilter({ [id]: checked ? "1" : "0" }));
    } else {
      dispatch(updateFilter({ [id]: value }));

      if (id === "category_id" && value !== "0") {
        const { data } = await axios.post(getSubCategories, {
          category_id: value,
        });
        if (data.error === false) {
          setSubCategories(
            data.data.subcategory.map((item) => ({
              id: item.subcategory_id,
              name: item.name,
            }))
          );
        }
      }
      if (id === "category_id" && value === "0") {
        setSubCategories([]);
        dispatch(updateFilter({ subcategory_id: "0" }));
      }
    }
    dispatch(fetchProducts());
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Create an AbortController and its associated signal
    const controller = new AbortController();
    const signal = controller.signal;

    // If there is an existing request, abort it
    if (handleInputChange.currentController) {
      handleInputChange.currentController.abort();
    }

    // Store the current controller for future reference
    handleInputChange.currentController = controller;

    dispatch(updateFilter({ [id]: value === "" ? "0" : value }));

    setTimeout(() => {
      dispatch(fetchProducts(signal)); // Pass the signal to the fetchProducts function
    }, 1000);
  };
  handleInputChange.currentController = null;

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="container mt-12 mb-24">
      <div className="grid grid-cols-1">
        <Breadcrumbs currentLink="Product" />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="w-full col-span-1 bg-white h-max p-4 xs:py-5 lg:py-10 lg:px-6 rounded-md">
            <div className={`w-full flex justify-between items-center`}>
              <h6 className="text-base">Filter Products</h6>
              <button
                type="button"
                onClick={() => setFilterMenu((prev) => !prev)}
                className="block lg:hidden"
              >
                <Icon icon={"ic:baseline-menu"} />
              </button>
            </div>
            {(filterMenu || width >= lg) && (
              <div data-aos="fade-up" className="w-[100%] mt-5">
                <h6 className="text-base">Tell Us What You Want</h6>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 my-4">
                  <div className="col-span-1">
                    {" "}
                    <Textinput
                      id={"keyword"}
                      onChange={handleInputChange}
                      label={"Keyword"}
                      value={keyword === "0" ? "" : keyword}
                      placeholder="Write Keywords Here..."
                    />
                  </div>
                  <div className="col-span-1">
                    <Select
                      onChange={handleChange}
                      label={"Category"}
                      id={"category_id"}
                      options={options}
                      placeholder="Select Category"
                      value={category_id}
                    />
                  </div>
                  <div className="col-span-1">
                    <Select
                      onChange={handleChange}
                      label={"Sub Category"}
                      id={"subcategory_id"}
                      options={subCategories}
                      placeholder="Select Sub Category"
                      value={subcategory_id}
                      disabled={subCategories.length === 0}
                    />
                  </div>
                  <div className="col-span-1">
                    <span className="form-label">Suggested For You</span>
                    <div className="flex flex-col gap-1 mt-4 ">
                      <Checkbox
                        label={"Top Rated"}
                        id="top_rated"
                        onChange={handleChange}
                        value={top_rated !== "0"}
                      />
                      <Checkbox
                        label={"Most Viewed"}
                        onChange={handleChange}
                        id="most_viewed"
                        value={most_viewed !== "0"}
                      />
                      {/* <Checkbox label={"Popular"} onChange={() => {}} value={false} /> */}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Price Range</label>
                    <div className="flex items-center gap-1">
                      <Textinput
                        type="number"
                        id={"min_price"}
                        placeholder="1000"
                        value={min_price === "0" ? "" : min_price}
                        onChange={handleInputChange}
                      />
                      <span className="">To</span>
                      <Textinput
                        type="number"
                        id={"max_price"}
                        placeholder="100"
                        value={max_price === "0" ? "" : max_price}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="lg:ml-12 col-span-3 mt-4 lg:mt-0">
            {products.length !== 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4 sm:my-0">
                {products.map((item, index) => (
                  <ProductCard key={index} data={item} />
                ))}
              </div>
            )}
            {products.length === 0 && (
              <div className="flex justify-center items-center h-[600px]">
                <img src={NoProduct} alt="" />
              </div>
            )}
            {products.length > 0 && (
              <Paginator
                first={first}
                rows={rows}
                totalRecords={products.length}
                onPageChange={onPageChange}
                className="bg-transparent"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
