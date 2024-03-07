import Breadcrumbs from "../../../components/websitePartials/breadcrumb";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Textinput from "../../../components/ui/Textinput";
import Select from "../../../components/ui/Select";
const schema = yup.object({});

const Checkout = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  return (
    <div className="container my-12">
      <Breadcrumbs currentLink="Checkout" />
      <h1 className="text-lg lg:text-2xl">Shipping Address</h1>
      <div className="grid grid-cols-12 my-4 md:gap-4">
        <form className="col-span-12 lg:col-span-9 bg-white p-5 rounded-md md:mb-0 mb-20">
          <div className="mb-4">
            <Textinput
              name="fullname"
              register={register}
              placeholder="Enter Your Full Name"
              label={"Full Name"}
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-4 flex-1">
              <Textinput
                name="email"
                register={register}
                placeholder="Enter Your Email"
                label={"Email"}
              />
            </div>
            <div className="mb-4 flex-1">
              <Textinput
                name="phone"
                register={register}
                placeholder="Enter Your Phone"
                label={"Phone"}
                isMask={true}
                options={{
                    phone: true,
                    phoneRegionCode: 'PK'
                }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-4 flex-1">
              <Select
                name="country"
                register={register}
                placeholder="Select Your Country"
                label={"Country"}
              />
            </div>
            <div className="mb-4 flex-1">
              <Select
                name="state"
                register={register}
                placeholder="Select Your State"
                label={"State"}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-4 flex-1">
              <Select
                name="city"
                register={register}
                placeholder="Select Your City"
                label={"City"}
              />
            </div>
            <div className="mb-4 flex-1">
              <Textinput
                name="zipcode"
                register={register}
                placeholder="Enter Zip Code"
                label={"Zip Code"}
              />
            </div>
          </div>
          <div className="mb-4">
          <Textinput
                name="address"
                register={register}
                placeholder="Enter Your Address"
                label={"Address"}
              />
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary md:flex-1 md:w-auto w-full">Back To Cart</button>
            <button className="btn btn-primary md:flex-1 md:w-auto w-full">Proceed To Pay</button>
          </div>
        </form>
        <div className="col-span-12 lg:col-span-3">
          <div className="">
            <h6 className="bg-main text-white py-5 px-4 rounded-t-md font-bold">
              Bill Summary
            </h6>
            <div className="bg-white py-3 px-4 space-y-4">
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="font-semibold text-[14px]">Total</span>
                <span className="font-semibold text-[14px]">0.00 Pkr</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="font-semibold text-[14px]">Discount</span>
                <span className="font-semibold text-[14px]">0 %</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="font-semibold text-[14px]">Save</span>
                <span className="font-semibold text-[14px]">0.00 Pkr</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="font-semibold text-[14px]">
                  Shipment Charges
                </span>
                <span className="font-semibold text-[14px]">0.00 Pkr</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="font-semibold text-[14px]">Sub Total</span>
                <span className="font-semibold text-[14px]">0.00 Pkr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
