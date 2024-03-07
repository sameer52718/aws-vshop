import Breadcrumbs from "../../../components/websitePartials/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addToCart, deleteItem, fetchCart } from "../../../store/cart/slice";
import Loading from "../../../components/Loading";
import {
  deleteCartItem,
  productThumbnailRoute,
} from "../../../constant/apiRoutes";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const { token } = useSelector((state) => state.auth);
  const { cart, loading, shipment, subtotal, total } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(token));
  }, [dispatch, token]);

  const removeProduct = async (code) => {
    try {
      dispatch(deleteItem(code));
      const { data } = await axios.post(
        deleteCartItem,
        { code },
        { headers: { Authorization: token } }
      );
      if (data.error === false) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleQuantityUpdate = async ({ url, color, size, quantity, code }) => {
    if (quantity === 0) {
      removeProduct(code);
    } else {
      dispatch(addToCart({ body: { url, color, size, quantity }, token }));
      dispatch(fetchCart(token));
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container my-12">
          <Breadcrumbs currentLink="Cart" />
          <div className="grid grid-cols-12 my-4 lg:gap-8">
            <div className="relative overflow-x-auto col-span-12 lg:col-span-9 lg:mb-0 mb-10">
              <table className="w-full text-[10px] xs:text-xs md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-main dark:bg-gray-700 dark:text-gray-400">
                  <tr className="">
                    <th scope="col" className="px-6 py-3 truncate">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={index}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-2"
                      >
                        <img
                          src={`${productThumbnailRoute}/${item.thumbnail}`}
                          alt=""
                          className=" w-[60px] rounded-full h-[60px] object-cover "
                        />{" "}
                        {item.name}
                      </th>
                      <td className="px-6 py-4">
                        {item?.color ? item?.color : "---"}
                      </td>
                      <td className="px-6 py-4">
                        {item?.size ? item?.size : "---"}
                      </td>
                      <td className="px-6 py-4">{item?.price} Pkr</td>
                      <td className="px-6 py-4 ">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityUpdate({
                              url: item.url,
                              size: item.size,
                              color: item.color,
                              quantity: item.quantity - 1,
                              code: item.code,
                            })
                          }
                        >
                          -
                        </button>{" "}
                        <span className="btn btn-primary py-1 px-2 mx-2">
                          {item.quantity}
                        </span>{" "}
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityUpdate({
                              url: item.url,
                              size: item.size,
                              color: item.color,
                              quantity: item.quantity + 1,
                              code: item.code,
                            })
                          }
                        >
                          +
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          className="btn btn-danger p-1"
                          onClick={() => removeProduct(item.code)}
                        >
                          <Icon icon={"fe:trash"} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <div className="">
                <h6 className="bg-main text-white py-5 px-4 rounded-t-md font-bold">
                  Shipment
                </h6>
                <div className="bg-white py-3 px-4 space-y-4">
                  <h6 className="mb-4 ">Order Summary</h6>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="text-xs md:text-sm">Total</span>
                    <span className="text-xs md:text-sm">{total} Pkr</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="text-xs md:text-sm">Shipment Charges</span>
                    <span className="text-xs md:text-sm">{shipment} Pkr</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="text-xs md:text-sm">Sub Total</span>
                    <span className="text-xs md:text-sm">{subtotal} Pkr</span>
                  </div>
                  <button className="btn btn-primary">
                    Continue To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
