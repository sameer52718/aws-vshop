/* eslint-disable no-unused-vars */
import Textinput from "../../../components/ui/Textinput";
import Select from "../../../components/ui/Select";
import Checkbox from "../../../components/ui/Checkbox";
import { cars } from "../../../constant/data";
import Breadcrumbs from "../../../components/websitePartials/breadcrumb";
import { useEffect, useState } from "react";
import useWidth from "../../../hooks/useWidth";
import { Icon } from "@iconify/react";
import VehicleCard from "../../../components/websitePartials/vehiclecard";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles, updateFilter } from "../../../store/vehicle/slice";
import { useDebounce } from "primereact/hooks";
import { makeTypes, modelTypes } from "../../../constant/contants";
import Loading from "../../../components/Loading";
import { fetchState } from "../../../store/state/slice";
import { fetchCity } from "../../../store/city/slice";
import { fetchModel } from "../../../store/model/slice";
const CarListing = () => {
  const dispatch = useDispatch();
  const {
    vehicle,
    isLoading,
    filter: {
      make_id,
      model_id,
      country_id,
      state_id,
      city_id,
      color,
      min_price,
      max_price,
      sort,
    },
  } = useSelector((state) => state.vehicle);
  const { options: country } = useSelector((state) => state.country);
  const { options: state } = useSelector((state) => state.state);
  const { options: city } = useSelector((state) => state.city);
  const { options: make } = useSelector((state) => state.make);
  const { options: model } = useSelector((state) => state.model);
  const [filterMenu, setFilterMenu] = useState(false);
  const [inputValue, debouncedValue, setInputValue] = useDebounce(
    {
      min_price: "",
      max_price: "",
    },
    800
  );
  const {
    width,
    breakpoints: { lg },
  } = useWidth();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleChange = async (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      dispatch(updateFilter({ [id]: checked ? "1" : "0" }));
    } else {
      dispatch(updateFilter({ [id]: value }));
    }
    dispatch(fetchVehicles());
  };

  useEffect(() => {
    if (width > lg) {
      setFilterMenu(true);
    }
  }, [lg, width]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFilter({ [id]: value === "" ? "0" : value }));
    setInputValue((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (debouncedValue.max_price !== "" || debouncedValue.min_price !== "") {
      dispatch(fetchVehicles());
    }
  }, [debouncedValue.min_price, debouncedValue.max_price, dispatch]);

  useEffect(() => {
    dispatch(fetchState(country_id));
  }, [country_id, dispatch]);

  useEffect(() => {
    dispatch(fetchCity(state_id));
  }, [state_id, dispatch]);

  useEffect(() => {
    dispatch(fetchModel(make_id));
  }, [make_id, dispatch]);

  return (
    <div className="container my-8">
      <Breadcrumbs currentLink="cars" />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
        <div className="col-span-2 lg:col-span-1 bg-white h-max p-4 xs:py-5 lg:py-10 lg:px-6 rounded-md">
          <div className={`w-full flex justify-between items-center`}>
            <h6 className=" text-base">Filters</h6>
            <button
              type="button"
              onClick={() => setFilterMenu((prev) => !prev)}
              className="block lg:hidden"
            >
              <Icon icon={"ic:baseline-menu"} />
            </button>
          </div>
          {(filterMenu || width >= 1024) && (
            <div data-aos="fade-up" className="flex flex-col gap-4 my-4">
              <h6 className="mt-4 text-base">Tell Us What You Want</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 my-4">
                <div className="col-span-1">
                  <Select
                    onChange={handleChange}
                    label={"Make"}
                    id={"make_id"}
                    options={make}
                    placeholder="Select Manufactured by..."
                    value={make_id}
                  />
                </div>
                <div className="col-span-1">
                  <Select
                    onChange={handleChange}
                    label={"Model"}
                    id={"model_id"}
                    placeholder="Select Model..."
                    value={model_id}
                    options={model}
                    disabled={model.length === 0}
                  />
                </div>
                <div className="col-span-1">
                  <Select
                    onChange={handleChange}
                    label={"Country"}
                    id={"country_id"}
                    placeholder="Select Country..."
                    value={country_id}
                    options={country}
                  />
                </div>
                <div className="col-span-1">
                  <Select
                    onChange={handleChange}
                    label={"State"}
                    id={"state_id"}
                    placeholder="Select State..."
                    value={state_id}
                    options={state}
                    disabled={state.length === 0}
                  />
                </div>
                <div className="col-span-1">
                  <Select
                    onChange={handleChange}
                    label={"City"}
                    id={"city_id"}
                    placeholder="Select City..."
                    value={city_id}
                    options={city}
                    disabled={city.length === 0}
                  />
                </div>

                <div className="col-span-1">
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
        {isLoading ? (
          <div className="col-span-2 lg:col-span-3 w-full flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="col-span-2 xl:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 xs:gap-3 lg:gap-5">
            {vehicle.map((item, index) => (
              <div
                key={index}
                className="relative col-span-1 bg-white px-2 lg:px-4 rounded-md h-[235px] sm:h-[320px] lg:h-[400px] flex "
              >
                <VehicleCard data={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarListing;
