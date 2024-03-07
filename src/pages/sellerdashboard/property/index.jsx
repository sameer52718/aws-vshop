import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
import NoData from "@/assets/images/vectors/no-product.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { deleteSellerProperty, getSellerProperty, updateSellerPropertyStatus } from "../../../constant/apiRoutes";
import { useSelector } from "react-redux";
import { PropertyColumn } from "../../../constant/columns";
import Tooltip from "../../../components/ui/Tooltip";
import DashboardLoader from "../../../components/DashboardLoader";

const Vehicle = () => {
  const { token } = useSelector((state) => state.auth);
  const columns = useMemo(() => PropertyColumn, []);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(getSellerProperty, { headers: { Authorization: token } });
        if (data.error === false) {
          setData(data.data.property ?? []);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [token]);

  const handleStatusChange = async (id) => {
    try {
      setData((prev) =>
        prev.map((item) =>
          item.id.toString() === id.toString() ? { ...item, status: item.status === 0 ? 1 : 0 } : item
        )
      );
      const { data: res } = await axios.post(updateSellerPropertyStatus, { id }, { headers: { Authorization: token } });
      if (res.error === false) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setData(prev => prev.filter((item) => parseInt(item.id) !== parseInt(id)));
      const {data:res} = await axios.post(deleteSellerProperty,{id},{headers:{Authorization:token}})
      if (res.error === false) {
        toast.success(res.message)
      }else{
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
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
        ...columns,
        {
          Header: "action",
          accessor: "action",
          Cell: (row) => {
            return (
              <>
                <div className="flex space-x-2">
                  <Tooltip
                    content={row.cell.row.original.status === 0 ? "Private" : "Public"}
                    placement="top"
                    arrow
                    animation="shift-away"
                    theme="primary"
                  >
                    <button
                      className="action-btn"
                      type="button"
                      onClick={() => handleStatusChange(row.cell.row.original.id)}
                    >
                      <Icon icon="solar:lock-line-duotone" />
                    </button>
                  </Tooltip>
                  <Tooltip content={"Edit"} placement="top" arrow animation="shift-away" theme="primary">
                    <button
                      className="action-btn"
                      type="button"
                      onClick={() => navigate(`${row.cell.row.original.id}/edit`)}
                    >
                      <Icon icon="mingcute:edit-line" />
                    </button>
                  </Tooltip>
                  <Tooltip content={"Video"} placement="top" arrow animation="shift-away" theme="primary">
                    <button
                      className="action-btn"
                      type="button"
                      onClick={() => navigate(`${row.cell.row.original.id}/video`)}
                    >
                      <Icon icon="ph:video" />
                    </button>
                  </Tooltip>
                  <Tooltip content={"Files"} placement="top" arrow animation="shift-away" theme="primary">
                    <button
                      className="action-btn"
                      type="button"
                      onClick={() => navigate(`${row.cell.row.original.id}/files`)}
                    >
                      <Icon icon="ph:video" />
                    </button>
                  </Tooltip>
                  <Tooltip content={"Amenities"} placement="top" arrow animation="shift-away" theme="primary">
                    <button
                      className="action-btn"
                      type="button"
                      onClick={() => navigate(`${row.cell.row.original.id}/amenities`)}
                    >
                      <Icon icon="material-symbols-light:featured-play-list-outline" />
                    </button>
                  </Tooltip>
                  <Tooltip content={"Delete"} placement="top" arrow animation="shift-away" theme="danger">
                    <button className="action-btn" type="button" onClick={() => handleDelete(row.cell.row.original.id)}>
                      <Icon icon="material-symbols-light:delete-outline" />
                    </button>
                  </Tooltip>
                </div>
              </>
            );
          },
        },
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
  return (
    <>
      {isLoading ? (
        <DashboardLoader />
      ) : (
        <Card noborder>
          <div className="flex justify-between items-center mb-6">
            <h4 className="card-title">Properties</h4>
            <div>
              <button className="btn btn-primary" type="button" onClick={() => navigate("add")}>
                Add
              </button>
            </div>
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
                {data.length === 0 && (
                  <div className="flex justify-center">
                    <img src={NoData} alt="" />
                  </div>
                )}
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
        </Card>
      )}
    </>
  );
};

export default Vehicle;
