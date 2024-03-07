/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";

import { addResellerStreamingProducts, getResellerStreamingProducts } from "@/constant/apiRoutes";
import { ProductColumn } from "@/constant/columns";

import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import DashboardLoader from "@/components/DashboardLoader";
import { setMeeting } from "@/store/streaming/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckAll = ({ handleChange, data }) => {
  return (
    <>
      <input type="checkbox" className="table-checkbox" onChange={(e) => handleChange(e, data)} />
    </>
  );
};

const IndeterminateCheckbox = ({ row, handleChange }) => {
  return (
    <>
      <input
        type="checkbox"
        className="table-checkbox"
        onChange={handleChange}
        value={row.original.url}
        id={row.original.url}
      />
    </>
  );
};

const SelectProduct = ({ active }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const columns = useMemo(() => ProductColumn, []);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          getResellerStreamingProducts,
          { code: active },
          {
            headers: { Authorization: token },
          }
        );
        if (data.error === false) {
          setData(data.data.product);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [active, token]);

  const handleCheck = (e) => {
    const { checked, value } = e.target;
    const ele = document.getElementById(value);
    if (checked) {
      ele.setAttribute("checked", checked);
      setSelected((prev) => [...prev, value]);
    } else {
      const index = selected.indexOf(value);
      const data = selected;
      data.splice(index, 1);
      setSelected(data);
      ele.removeAttribute("checked");
    }
  };

  const handleCheckAll = (e, data) => {
    const { checked } = e.target;
    const selected = data.map((item) => item.url);

    selected.forEach((element) => {
      const ele = document.getElementById(element);
      if (checked) {
        ele.setAttribute("checked", true);
        setSelected(selected);
      } else {
        ele.removeAttribute("checked");
        setSelected([]);
      }
    });
  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: (item) => (
            <div>
              <CheckAll handleChange={handleCheckAll} data={item.data} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox row={row} handleChange={handleCheck} selected={selected} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
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
    prepareRow,
  } = tableInstance;

  const { pageIndex } = state;

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        addResellerStreamingProducts,
        { product_urls: selected.join(","), code: active },
        { headers: { Authorization: token } }
      );
      if (data.error === false) {
        dispatch(setMeeting({ meeting_id: data.data.meeting_id }));
        navigate(`/dashboard/seller/streaming/${data.data.meeting_id}`);
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
        <>
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
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            scope="col"
                            className=" table-th "
                            key={index}
                          >
                            {column.render("Header")}
                            <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
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
                              <td {...cell.getCellProps()} className="table-td" key={index}>
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
                <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">Go</span>
                <span>
                  <input
                    type="number"
                    className=" form-control py-2"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
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
                  className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
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
                  className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  <Icon icon="heroicons-outline:chevron-right" />
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>
              Start
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SelectProduct;
