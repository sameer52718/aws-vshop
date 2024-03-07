import Logo from "../../../assets/images/logo/logo.svg";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";


const OrderInvoice = () => {
  const {id} = useParams()

  const invoiceContainerRef = useRef(null);

  const generatePDF = () => {
    const invoiceContainer = invoiceContainerRef.current;

    html2canvas(invoiceContainer).then((canvas) => {
      let fileWidth = 211;
      let fileHeight = 150;
      const FILEURL = canvas.toDataURL("image/png");
      let PDF = new jsPDF("p", "mm", [215, 215]);
      let position = 0;
      PDF.addImage(FILEURL, "PNG", 0, position, fileWidth, fileHeight);
      PDF.save(`invoice order#(${id}).pdf`);
    });
  };

  return (
    <>
      <div
        className="bg-white p-8 w-full lg:w-[80%] mx-auto rounded-md space-y-4"
        ref={invoiceContainerRef}
        id="invoice-container"
      >
        <div className="flex justify-between items-center border-b border-black-400 pb-2">
          <img src={Logo} alt="" className="w-40" />
          <span className="font-bold">Order #12</span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h6 className="text-base font-bold">Customer Detail</h6>
            <span className="text-sm font-semibold">Name: Yazdan Shaikh</span>
            <span className="text-sm font-semibold">
              Email: yazdan@gmail.com
            </span>
            <span className="text-sm font-semibold">
              Phone: +92 000 0000000{" "}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <h6 className="text-base font-bold">Order Detail</h6>
            <span className="text-sm font-semibold">Order #: 12</span>
            <span className="text-sm font-semibold">Date: 12/12/2023</span>
            <span className="text-sm font-semibold">Time: 12:30 PM </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <h6 className="text-base font-bold">Shipping Detail</h6>
          <span className="text-sm font-semibold">Country: Pakistan</span>
          <span className="text-sm font-semibold">State: Sindh</span>
          <span className="text-sm font-semibold">City: Karachi </span>
          <span className="text-sm font-semibold">
            Shipping Address: Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Aut, cumque.{" "}
          </span>
        </div>
        <div className="relative overflow-x-auto col-span-12 lg:col-span-9 lg:mb-0 mb-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-main dark:bg-gray-700 dark:text-gray-400">
              <tr className="">
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Size
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-b  dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Apple MacBook Pro 17
                </th>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Rs 2999</td>
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4">Rs 5998</td>
              </tr>
              <tr className=" border-b  dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Rs 1999</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">Rs 1999</td>
              </tr>
              <tr className=" ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Rs 99</td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">Rs 99</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="space-y-1">
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-sm font-semibold">Rs 6096</span>
            </div>
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Discount</span>
              <span className="text-sm font-semibold">0%</span>
            </div>
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Save</span>
              <span className="text-sm font-semibold">Rs 0</span>
            </div>
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Shipment</span>
              <span className="text-sm font-semibold">Rs 0</span>
            </div>
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Sub Total</span>
              <span className="text-sm font-semibold">Rs 6096</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={generatePDF}
          >
            Generate PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderInvoice;
