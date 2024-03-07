import { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/websitePartials/breadcrumb";
import Textinput from "../../../components/ui/Textinput";
import Checkbox from "../../../components/ui/Checkbox";
import Loading from "@/components/Loading";
import { Paginator } from "primereact/paginator";
import NoProduct from "../../../assets/images/vectors/no-product.png";
import Radio from "../../../components/ui/Radio";
import ShopCard from "../../../components/websitePartials/shopCard";
import { Icon } from "@iconify/react";
import useWidth from "../../../hooks/useWidth";
import { Link } from "react-router-dom";
import { websiteRoutes } from "../../../constant/routes";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchShops,
  updateData,
  updateFIlter,
} from "../../../store/shop/slice";
import { optimisticUpdateFollow } from "../../../utils/function";
import { followApi } from "../../../constant/apiRoutes";
import axios from "axios";
import { toast } from "react-toastify";

const ShopListing = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const {
    shops,
    isloading,
    filter: { name, verified, sort, rating },
  } = useSelector((state) => state.shop);

  const {
    width,
    breakpoints: { lg },
  } = useWidth();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [filterMenu, setFilterMenu] = useState(false);
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    dispatch(fetchShops({ token }));
  }, [dispatch, token]);

  const handleChange = async (e) => {
    const { id, value, type, checked, name } = e.target;
    if (type === "checkbox") {
      dispatch(updateFIlter({ [id]: checked ? "1" : "0" }));
    } else if (type === "radio") {
      dispatch(updateFIlter({ [name]: value }));
    } else {
      dispatch(updateFIlter({ [id]: value }));
    }
    dispatch(fetchShops({ token }));
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

    dispatch(updateFIlter({ [id]: value === "" ? "0" : value }));

    setTimeout(() => {
      dispatch(fetchShops({ signal, token })); // Pass the signal to the fetchProducts function
    }, 1000);
  };
  handleInputChange.currentController = null;

  const handleFollow = async ({ url, type, data, follow }) => {
    try {
      if (!token) {
        toast.error("You Have to Login First");
        return;
      }
      const body = {
        followed_type: type,
        followed_url: url,
      };
      console.log(data);
      const updatedData = optimisticUpdateFollow(url, follow, data);
      console.log(updatedData);
      dispatch(updateData(updatedData));
      const { data: res } = await axios.post(followApi, body, {
        headers: { Authorization: token },
      });
      if (res.error === false) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-12 mb-24">
      <div className="grid grid-cols-1">
        <Breadcrumbs currentLink="Shop" />
        <h1 className="col-span-4 lg:col-span-3  text-2xl lg:text-4xl mb-4">
          Shop Listing
        </h1>
      </div>
      {isloading ? (
        <Loading />
      ) : (
        <div className="grid lg:grid-cols-4 gap-4 lg:gap-0">
          <div className=" col-span-4 lg:col-span-1 bg-white h-max p-4 xs:py-5 lg:py-10 lg:px-6 rounded-md overflow-hidden">
            <div className="flex justify-between">
              <h6 className="text-lg">Filter Shops</h6>
              <button
                type="button"
                onClick={() => setFilterMenu((prev) => !prev)}
                className="block lg:hidden"
              >
                <Icon icon={"ic:baseline-menu"} />
              </button>
            </div>
            {(filterMenu || width >= lg) && (
              <div data-aos="fade-up" className="flex flex-col gap-4 my-4">
                <Textinput
                  id={"name"}
                  onChange={handleInputChange}
                  label={"Search"}
                  value={name === "0" ? "" : name}
                  placeholder="Search Here..."
                />
                <div>
                  <span className="form-label">Filter By Rating</span>
                  <div className="flex gap-4 flex-wrap lg:block">
                    <Radio
                      label={"5 Star"}
                      name={"rating"}
                      id={"5star"}
                      checked={parseInt(rating) === 5}
                      onChange={handleChange}
                      value={5}
                    />
                    <Radio
                      label={"4 Star"}
                      name={"rating"}
                      id={"4star"}
                      checked={parseInt(rating) === 4}
                      onChange={handleChange}
                      value={4}
                    />
                    <Radio
                      label={"3 Star"}
                      name={"rating"}
                      id={"3star"}
                      checked={parseInt(rating) === 3}
                      onChange={handleChange}
                      value={3}
                    />
                    <Radio
                      label={"2 Star"}
                      name={"rating"}
                      id={"2star"}
                      checked={parseInt(rating) === 2}
                      onChange={handleChange}
                      value={2}
                    />
                    <Radio
                      label={"1 Star"}
                      name={"rating"}
                      id={"1star"}
                      checked={parseInt(rating) === 1}
                      onChange={handleChange}
                      value={1}
                    />
                  </div>
                </div>
                <div>
                  <span className="form-label">Verified Sellers</span>
                  <div className="flex flex-col gap-1 mt-4 ">
                    <Checkbox
                      id={"verified"}
                      label={"Verified"}
                      onChange={handleChange}
                      value={verified === "0" ? false : true}
                    />
                  </div>
                </div>
                <div>
                  <span className="form-label">Sort By</span>
                  <div className="flex flex-wrap gap-4">
                    <Radio
                      label={"Newest"}
                      name={"sort"}
                      checked={sort === "desc"}
                      onChange={handleChange}
                      value={"desc"}
                    />
                    <Radio
                      label={"Oldest"}
                      name={"sort"}
                      checked={sort === "asc"}
                      onChange={handleChange}
                      value={"asc"}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="lg:ml-12 col-span-4 lg:col-span-3">
            {shops.length !== 0 && (
              <div className="grid grid-cols-1 gap-4">
                {shops.map((item, index) => (
                  <ShopCard
                    data={item}
                    key={index}
                    allData={shops}
                    handleFollow={handleFollow}
                  />
                ))}
              </div>
            )}
            {shops.length === 0 && (
              <div className="flex justify-center items-center h-[600px]">
                <img src={NoProduct} alt="" />
              </div>
            )}
            {shops.length > 0 && (
              <Paginator
                first={first}
                rows={rows}
                totalRecords={shops.length}
                onPageChange={onPageChange}
                className="bg-transparent"
              />
            )}
          </div>
        </div>
      )}
      {/* become a seller button start */}
      <Link
        className="fixed bottom-2 right-2 text-xs xs:text-base text-secondary-200 font-semibold tracking-wide z-50 py-2 px-4 rounded-md bg-primary-900 flex items-center gap-1"
        to={websiteRoutes.sellerSignup}
      >
        Become a Seller <Icon icon="uil:plus" />
      </Link>
      {/* become a seller button end */}
    </div>
  );
};

export default ShopListing;
