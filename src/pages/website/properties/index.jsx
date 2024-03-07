import { Icon } from "@iconify/react";
import { Slider } from "primereact/slider";
import Breadcrumbs from "../../../components/websitePartials/breadcrumb";
import Select from "../../../components/ui/Select";
import Textinput from "../../../components/ui/Textinput";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useWidth from "../../../hooks/useWidth";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { useDispatch } from "react-redux";
import { fetchProperty, updateFilter } from "../../../store/property/slice";
import PropertyLongCard from "../../../components/websitePartials/propertylongcard";
import { fetchSubType } from "../../../store/propertySubType/slice";
import { fetchState } from "../../../store/state/slice";
import { fetchCity } from "../../../store/city/slice";
import { useDebounce } from "primereact/hooks";
import { SelectButton } from "primereact/selectbutton";
import { propertyPurpose } from "../../../constant/contants";
const options = propertyPurpose.map((item) => item.name);
const Properties = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const { options: country } = useSelector((state) => state.country);
  const { options: state } = useSelector((state) => state.state);
  const { options: city } = useSelector((state) => state.city);
  const { options: type } = useSelector((state) => state.propertyType);
  const { options: subtype } = useSelector((state) => state.subType);
  const {
    isLoading,
    property,
    filter: {
      purpose,
      type_id,
      subtype_id,
      condition,
      country_id,
      state_id,
      city_id,
      location,
      min_price,
      max_price,
      bathroom,
      bedroom,
      area,
      unit,
      sort,
    },
  } = useSelector((state) => state.property);

  const [inputValue, debouncedValue, setInputValue] = useDebounce(
    {
      min_price: "",
      max_price: "",
      location: "",
    },
    1000
  );

  const dispatch = useDispatch();

  const {
    width,
    breakpoints: { lg },
  } = useWidth();
  const [filterMenu, setFilterMenu] = useState(false);
  const [valueCondition, setValueCondition] = useState(parseInt(condition));
  const [valueBedrooms, setValueBedrooms] = useState(parseInt(bedroom));
  const [valueBathrooms, setValueBathrooms] = useState(parseInt(bathroom));

  useEffect(() => {
    if (width > lg) {
      setFilterMenu(true);
    }
  }, [width, lg]);

  useEffect(() => {
    dispatch(fetchProperty());
  }, [dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "type_id":
        dispatch(fetchSubType(value));
        break;
      case "country_id":
        dispatch(fetchState(value));
        break;
      case "state_id":
        dispatch(fetchCity(value));
        break;
      default:
        break;
    }
    dispatch(updateFilter({ [id]: value }));
    dispatch(fetchProperty());
  };

  const handleSlideChange = (e, name) => {
    dispatch(updateFilter({ [name]: parseInt(e.value) === 0 ? "0" : e.value }));
    dispatch(fetchProperty());
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateFilter({ [id]: value === "" ? "0" : value }));
    setInputValue((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (
      debouncedValue.max_price !== "" ||
      debouncedValue.min_price !== "" ||
      debouncedValue.location !== ""
    ) {
      dispatch(fetchProperty());
    }
  }, [
    debouncedValue.location,
    debouncedValue.max_price,
    debouncedValue.min_price,
    dispatch,
  ]);

  const handleButtonChange = (e) => {
    const { value } = e;
    setValue(value);
    dispatch(
      updateFilter({
        purpose:
          value === null
            ? "0"
            : propertyPurpose.find((item) => item.name === value).id,
      })
    );
    dispatch(fetchProperty());
  };

  return (
    <>
      <section className="container flex flex-col my-8">
        <div className="grid grid-cols-1">
          <Breadcrumbs currentLink="Properties" />
          <h1 className="col-span-4 lg:col-span-3  text-2xl lg:text-4xl mb-4">
            Properties
          </h1>
        </div>
        <div className="flex flex-col lg:grid gap-5 lg:flex-row my-5 lg:my-8">
          <div className="grid lg:grid-cols-4 gap-4 lg:gap-0">
            <div className=" col-span-4 lg:col-span-1 bg-white h-max p-4 xs:py-5 lg:py-10 lg:px-6 rounded-md overflow-hidden">
              <div className={`w-full flex justify-between items-center`}>
                <h6 className="text-lg">Filter Properties</h6>
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
                  <h6 className="text-lg mt-4">Tell us what you want</h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:gap-5 lg:gap-0">
                    {/* <div className="col-span-1">
                      <SelectButton value={value} onChange={handleButtonChange} options={options} />
                    </div> */}
                    <div className=" col-span-1">
                      <Select
                        label="Type"
                        placeholder="Select Property Type"
                        classLabel="mt-5 mb-1 form-label"
                        id={"type_id"}
                        value={type_id}
                        onChange={handleChange}
                        options={type}
                      />
                    </div>
                    <div className="col-span-1">
                      <Select
                        label="Sub Type"
                        placeholder="Select Sub Property Type"
                        classLabel="mt-5 mb-1 form-label"
                        id={"subtype_id"}
                        value={subtype_id}
                        onChange={handleChange}
                        options={subtype}
                      />
                    </div>
                    <div className=" col-span-1">
                      <Select
                        label="Country"
                        placeholder="Select Country"
                        classLabel="mt-5 mb-1 form-label"
                        id={"country_id"}
                        value={country_id}
                        onChange={handleChange}
                        options={country}
                      />{" "}
                    </div>
                    <div className=" col-span-1">
                      <Select
                        label="State"
                        placeholder="Select State"
                        classLabel="mt-5 mb-1 form-label"
                        id={"state_id"}
                        value={state_id}
                        onChange={handleChange}
                        options={state}
                      />
                    </div>
                    <div className=" col-span-1">
                      <Select
                        label="City"
                        placeholder="Select City"
                        classLabel="mt-5 mb-1 form-label"
                        id={"city_id"}
                        value={city_id}
                        onChange={handleChange}
                        options={city}
                      />
                    </div>
                    <div className=" col-span-1">
                      <Textinput
                        label="Location"
                        type="text"
                        placeholder="Type Your Location Here..."
                        classLabel="mt-5 mb-1 form-label"
                        id={"location"}
                        onChange={handleInputChange}
                        value={location}
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-5 col-span-1">
                      <div className="w-full flex items-center justify-between">
                        <label htmlFor="condition">Condition</label>{" "}
                        <span className="text-sm">{valueCondition}/10</span>
                      </div>
                      <Slider
                        min={0}
                        max={10}
                        step={1}
                        defaultValue={0}
                        value={parseInt(valueCondition)}
                        onChange={(e) => setValueCondition(e.value)}
                        onSlideEnd={(e) => handleSlideChange(e, "condition")}
                        className="w-[100%] mt-2"
                        id="condition"
                        name="condition"
                        pt={{
                          root: { className: "w-[100%]" },
                          handle: { className: "bg-white border-main" },
                          range: { className: "bg-main rounded-full" },
                        }}
                      />
                    </div>
                    <div className="w-full flex justify-between items-end mt-5 sm:mt-0 lg:mt-5 col-span-1">
                      <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex items-center justify-between">
                          <label htmlFor="bedrooms">Bedrooms</label>{" "}
                          <span className="text-sm">{valueBedrooms}/10</span>
                        </div>
                        <div className="w-full flex items-center justify-between">
                          <Slider
                            min={0}
                            max={10}
                            step={1}
                            defaultValue={0}
                            value={valueBedrooms}
                            onChange={(e) => setValueBedrooms(e.value)}
                            onSlideEnd={(e) => handleSlideChange(e, "bedroom")}
                            className="w-[84%] xs:w-[87%] sm:w-[83%] md:w-[84%] lg:w-[79%] xl:w-[82%] mt-2"
                            id="bedrooms"
                            name="bedrooms"
                            pt={{
                              root: { className: "w-[100%]" },
                              handle: { className: "bg-white border-main" },
                              range: { className: "bg-main rounded-full" },
                            }}
                          />
                          <button
                            type="button"
                            className="w-[13%] xs:w-[11%] sm:w-[15%] md:w-[13%] lg:w-[18%] xl:w-[15%] flex justify-center items-center gap-1 bg-main bg-opacity-80 text-xs xs:text-sm py-2 xs:py-[10px] text-white rounded-full"
                          >
                            10
                            <Icon className="w-2 h-2" icon="fa-solid:plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-end mt-5 sm:mt-0 lg:mt-5 col-span-1">
                      <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex items-center justify-between">
                          <label htmlFor="bathrooms">Bathrooms</label>{" "}
                          <span className="text-sm">{valueBathrooms}/10</span>
                        </div>
                        <div className="w-full flex items-center justify-between">
                          <Slider
                            min={0}
                            max={10}
                            step={1}
                            value={valueBathrooms}
                            onChange={(e) => setValueBathrooms(e.value)}
                            onSlideEnd={(e) => handleSlideChange(e, "bathroom")}
                            className="w-[84%] xs:w-[87%] sm:w-[83%] md:w-[84%] lg:w-[79%] xl:w-[82%] mt-2"
                            id="bathrooms"
                            name="bathrooms"
                            pt={{
                              root: { className: "w-[100%]" },
                              handle: { className: "bg-white border-main" },
                              range: { className: "bg-main rounded-full" },
                            }}
                          />
                          <button
                            type="button"
                            className="w-[13%] xs:w-[11%] sm:w-[15%] md:w-[13%] lg:w-[18%] xl:w-[15%] flex justify-center items-center gap-1 bg-main bg-opacity-80 text-xs xs:text-sm py-2 xs:py-[10px] text-white rounded-full"
                          >
                            10
                            <Icon className="w-2 h-2" icon="fa-solid:plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5 gap-2 col-span-1">
                      Price Range
                      <div className="w-[100%] flex items-center gap-2 ">
                        <Textinput
                          type="number"
                          placeholder="min"
                          className="w-[100%]"
                          id={"min_price"}
                          onChange={handleInputChange}
                          value={min_price === "0" ? "" : min_price}
                        />
                        To
                        <Textinput
                          type="number"
                          placeholder="max"
                          className="w-[100%]"
                          id={"max_price"}
                          onChange={handleInputChange}
                          value={max_price === "0" ? "" : max_price}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {isLoading ? (
              <div className="col-span-4 lg:col-span-3">
                <Loading />
              </div>
            ) : (
              <div className="lg:ml-8 col-span-4 lg:col-span-3 flex flex-col gap-5">
                {property.map((item, index) => (
                  <PropertyLongCard key={index} data={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Properties;
