import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../../../components/ui/Card";
import { Icon } from "@iconify/react";

import { useMemo } from "react";
import { ProductDataTable } from "../../../constant/table-data";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    Cell: (row) => {
      return <span>#{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: (row) => {
      return (
        <div className="flex items-center gap-4">
          <span>
            <img
              className="w-12 h-12 rounded-full"
              src={row.row.original.image}
            />
          </span>{" "}
          {row?.cell?.value}
        </div>
      );
    },
  },
  {
    Header: "Selection",
    accessor: "selection",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Quantiry",
    accessor: "quantity",
    Cell: (row) => {
      return <span>{Math.round(Math.random() * 10)}</span>;
    },
  },
  {
    Header: "Total",
    accessor: "total",
    Cell: (row) => {
      return <span>{Math.round(Math.random() * 1000)}</span>;
    },
  },

  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      return (
        <div>
          <Dropdown
            classMenuItems="right-0 w-[140px] top-[110%] "
            label={
              <span className="text-xl text-center block w-full">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
            }
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <Menu.Item>
                <Link
                to={`/dashboard/user/order/cart/${Math.round(Math.random() * 100000)}/review`}
                  className={`
                  ${"hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"}
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                >
                  <span className="text-base">
                    <Icon icon={"ic:outline-rate-review"} />
                  </span>
                  <span>Review Item</span>
                </Link>
              </Menu.Item>
            </div>
          </Dropdown>
        </div>
      );
    },
  },
];

const OrderInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => ProductDataTable, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-md flex justify-between p-4">
        <span className="font-bold text-lg"> Order # {id}</span>
        <button
          className="btn btn-primary p-2"
          type="button"
          onClick={() => navigate(-1)}
        >
          <Icon icon={"uil:arrow-left"} width={24} />
        </button>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <Card title={"Customer Info"} className="col-span-12 lg:col-span-8">
          <div className="space-y-1">
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Name</span>
              <span className="text-sm font-semibold">Yazdan Shaikh</span>
            </div>
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Email</span>
              <span className="text-sm font-semibold">yazdan@gmail.com</span>
            </div>
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Phone</span>
              <span className="text-sm font-semibold">+92 000 000000</span>
            </div>
          </div>
        </Card>
        <Card title={"Delivery"} className="col-span-12 lg:col-span-4">
          <div className="space-y-1">
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Country</span>
              <span className="text-sm font-semibold">Pakistan</span>
            </div>
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">State</span>
              <span className="text-sm font-semibold">Sindh</span>
            </div>
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">City</span>
              <span className="text-sm font-semibold">Karachi</span>
            </div>
            <div className="flex flex-col justify-between">
              <span className="text-sm font-semibold">Address</span>
              <span className="text-sm font-semibold">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
                voluptatibus autem veniam.
              </span>
            </div>
          </div>
        </Card>
        <Card title={"Order Info"} className="col-span-12 lg:col-span-8">
          <div className="space-y-1">
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Order ID</span>
              <span className="text-sm font-semibold">#{id}</span>
            </div>
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Status</span>
              <span className="text-sm font-semibold">Completed</span>
            </div>
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Date & Time</span>
              <span className="text-sm font-semibold">14/12/2023 12:30 PM</span>
            </div>
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Coupon</span>
              <span className="text-sm font-semibold">Not Applied</span>
            </div>
          </div>
        </Card>
        <Card title={"Payment"} className="col-span-12 lg:col-span-4">
          <div className="space-y-1">
            <div className="border-b flex justify-between">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-sm font-semibold">Rs 344</span>
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
              <span className="text-sm font-semibold">Rs 344</span>
            </div>
          </div>
        </Card>
      </div>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Items</h4>
          <div></div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                      {headerGroup.headers.map((column, index) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                          key={index}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={index}>
                        {row.cells.map((cell, index) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="table-td"
                              key={index}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default OrderInfo;
