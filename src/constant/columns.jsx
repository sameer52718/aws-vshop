import moment from "moment";
import { productThumbnailRoute, streamingThumbnail, vehicleThumbnailRoute,propertyThumbnailRoute } from "./apiRoutes";
import NoThumbnail from "../assets/images/vectors/thumbnail.png";

export const ProductColumn = [
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
              src={
                row.row.original.thumbnail
                  ? `${productThumbnailRoute}/${row.row.original.thumbnail}`
                  : NoThumbnail
              }
              alt={row?.cell?.value}
            />
          </span>{" "}
          {row?.cell?.value}
        </div>
      );
    },
  },
  {
    Header: "Category",
    accessor: "category",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "SubCategory",
    accessor: "subcategory",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Views",
    accessor: "views",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Date",
    accessor: "time",
    Cell: (row) => {
      return <span>{moment(row?.cell?.value).format("DD/MM/YYYY")}</span>;
    },
  },

  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="flex gap-2 w-full flex-wrap">
          {parseInt(row.row.original?.block) === 1 ? (
            <span className="inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 text-danger-500 bg-danger-500">
              blocked
            </span>
          ) : (
            <>
              <span
                className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 ${
                  row?.cell?.value === 0 ? "text-success-500 bg-success-500" : ""
                } 
              ${row?.cell?.value === 1 ? "text-danger-500 bg-danger-500" : ""}
              
               `}
              >
                {row?.cell?.value === 0 ? "Public" : "Private"}
              </span>

              <span
                className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 ${
                  row?.row?.original.approval === 1 ? "text-success-500 bg-success-500" : ""
                } 
                ${row?.row?.original.approval === 2 ? "text-danger-500 bg-danger-500" : ""}
                ${row?.row?.original.approval === 0 ? "text-orange-500 bg-orange-300" : ""}
              
               `}
              >
                {row?.row?.original.approval === 0
                  ? "Pending"
                  : row?.row?.original.approval === 1
                  ? "Approved"
                  : "Rejected"}
              </span>
            </>
          )}
        </span>
      );
    },
  },
];
export const BrandColumn = [
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
      return <div className="flex items-center gap-4">{row?.cell?.value}</div>;
    },
  },
  {
    Header: "categories",
    accessor: "categories",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },

  {
    Header: "Date",
    accessor: "time",
    Cell: (row) => {
      return <span>{moment(row?.cell?.value).format("DD/MM/YYYY")}</span>;
    },
  },

  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="flex gap-2 w-full flex-wrap">
          {parseInt(row.row.original?.block) === 1 ? (
            <span className="inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 text-danger-500 bg-danger-500">
              blocked
            </span>
          ) : (
            <>
              <span
                className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 ${
                  row?.cell?.value === 0 ? "text-success-500 bg-success-500" : ""
                } 
              ${row?.cell?.value === 1 ? "text-danger-500 bg-danger-500" : ""}
              
               `}
              >
                {row?.cell?.value === 0 ? "Public" : "Private"}
              </span>

              <span
                className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 ${
                  row?.row?.original.approval === 1 ? "text-success-500 bg-success-500" : ""
                } 
                ${row?.row?.original.approval === 2 ? "text-danger-500 bg-danger-500" : ""}
                ${row?.row?.original.approval === 0 ? "text-orange-500 bg-orange-300" : ""}
              
               `}
              >
                {row?.row?.original.approval === 0
                  ? "Pending"
                  : row?.row?.original.approval === 1
                  ? "Approved"
                  : "Rejected"}
              </span>
            </>
          )}
        </span>
      );
    },
  },
];
export const InvertoryColumn = [
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
              src={
                row.row.original.thumbnail
                  ? `${productThumbnailRoute}/${row.row.original.thumbnail}`
                  : NoThumbnail
              }
              alt={row?.cell?.value}
            />
          </span>
          {row?.cell?.value}
        </div>
      );
    },
  },
  {
    Header: "Stock",
    accessor: "stock",
    Cell: (row) => {
      return <span>{row?.cell?.value || "-"}</span>;
    },
  },
  {
    Header: "Color",
    accessor: "color",
    Cell: (row) => {
      return <span>{row?.cell?.value || "-"}</span>;
    },
  },
  {
    Header: "Size",
    accessor: "size",
    Cell: (row) => {
      return <span>{row?.cell?.value || "-"}</span>;
    },
  },
  {
    Header: "Date",
    accessor: "time",
    Cell: (row) => {
      return <span>{moment(row?.cell?.value).format("DD/MM/YYYY")}</span>;
    },
  },
];

export const WishlistColumn = [
  {
    Header: "id",
    accessor: "id",
    Cell: (row) => {
      return <span>#{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Product info",
    accessor: "name",
    Cell: (row) => {
      return (
        <div className="flex items-center gap-4">
          <span>
            <img
              className="w-12 h-12 rounded-full"
              src={
                row.row.original.thumbnail
                  ? `${productThumbnailRoute}/${row.row.original.thumbnail}`
                  : NoThumbnail
              }
            />
          </span>{" "}
          {row?.cell?.value}
        </div>
      );
    },
  },
  {
    Header: "price",
    accessor: "price",
    Cell: (row) => {
      return <span className="block w-full">{row?.cell?.value}</span>;
    },
  },
];

export const HireColumn = [
  {
    Header: "Id",
    accessor: "id",
    Cell: (row) => {
      return <span>#{row?.cell?.value}</span>;
    },
  },
  {
    Header: "first name",
    accessor: "first_name",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Last name",
    accessor: "last_name",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Date",
    accessor: "time",
    Cell: (row) => {
      return <span>{moment(row?.cell?.value).format("DD/MM/YYYY")}</span>;
    },
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span
          className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 
      ${row?.cell?.value === 0 ? "text-orange-500 bg-orange-300" : ""}
      ${row?.cell?.value === 1 ? "text-success-500 bg-success-500" : ""} 
      ${row?.cell?.value === 2 ? "text-danger-500 bg-danger-500" : ""}
      ${row?.cell?.value === 3 ? "text-danger-500 bg-danger-500" : ""}
      ${row?.cell?.value === 4 ? "text-success-500 bg-success-500" : ""} 
    
     `}
        >
          {row?.cell?.value === 0
            ? "Pending"
            : row?.cell?.value === 1
            ? "Approved"
            : row?.cell?.value === 2
            ? "Rejected"
            : row?.cell?.value === 3
            ? "Deleted"
            : "Working"}
        </span>
      );
    },
  },
];

export const UserProductColumn = [
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
          <span className="flex-none">
            <img
              className="w-12 h-12 rounded-full"
              src={
                row.row.original.thumbnail
                  ? `${productThumbnailRoute}/${row.row.original.thumbnail}`
                  : NoThumbnail
              }
              alt={row?.cell?.value}
            />
          </span>{" "}
          {row?.cell?.value}
        </div>
      );
    },
  },
  {
    Header: "Reseller",
    accessor: "reseller_name",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Category",
    accessor: "category",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "SubCategory",
    accessor: "subcategory",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Views",
    accessor: "views",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Date",
    accessor: "time",
    Cell: (row) => {
      return <span>{moment(row?.cell?.value).format("DD/MM/YYYY")}</span>;
    },
  },

  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="flex gap-2 w-full flex-wrap">
          {parseInt(row.row.original?.block) === 1 ? (
            <span className="inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 text-danger-500 bg-danger-500">
              blocked
            </span>
          ) : (
            <>
              <span
                className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 ${
                  row?.cell?.value === 0 ? "text-success-500 bg-success-500" : ""
                } 
              ${row?.cell?.value === 1 ? "text-danger-500 bg-danger-500" : ""}
              
               `}
              >
                {row?.cell?.value === 0 ? "Public" : "Private"}
              </span>

              <span
                className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 ${
                  row?.row?.original.approval === 1 ? "text-success-500 bg-success-500" : ""
                } 
                ${row?.row?.original.approval === 2 ? "text-danger-500 bg-danger-500" : ""}
                ${row?.row?.original.approval === 0 ? "text-orange-500 bg-orange-300" : ""}
              
               `}
              >
                {row?.row?.original.approval === 0
                  ? "Pending"
                  : row?.row?.original.approval === 1
                  ? "Approved"
                  : "Rejected"}
              </span>
            </>
          )}
        </span>
      );
    },
  },
];

export const StreamingColumn = [
  {
    Header: "Id",
    accessor: "id",
    Cell: (row) => {
      return <span>#{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Title",
    accessor: "title",
    Cell: (row) => {
      return (
        <div className="flex items-center gap-4">
          <span>
            <img
              className="w-12 h-12 rounded-full"
              src={
                row.row.original.thumbnail
                  ? `${streamingThumbnail}/${row.row.original.thumbnail}`
                  : NoThumbnail
              }
              alt={row?.cell?.value}
            />
          </span>{" "}
          {row?.cell?.value}
        </div>
      );
    },
  },
  {
    Header: "Views",
    accessor: "views",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Date",
    accessor: "time",
    Cell: (row) => {
      return <span>{moment(row?.cell?.value).format("DD/MM/YYYY")}</span>;
    },
  },

  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="flex gap-2 w-full flex-wrap">
          {parseInt(row.row.original?.block) === 1 ? (
            <span className="inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 text-danger-500 bg-danger-500">
              blocked
            </span>
          ) : (
            <>
              <span
                className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 ${
                  row?.cell?.value === 0 ? "text-success-500 bg-success-500" : ""
                } 
              ${row?.cell?.value === 1 ? "text-danger-500 bg-danger-500" : ""}
              
               `}
              >
                {row?.cell?.value === 0 ? "Public" : "Private"}
              </span>
            </>
          )}
        </span>
      );
    },
  },
];

export const SupportColumn = [
  {
    Header: "Id",
    accessor: "id",
    Cell: (row) => {
      return <span>#{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Subject",
    accessor: "subject",
    Cell: (row) => {
      return (
        <span>{row?.cell?.value.length > 50 ? `${row?.cell?.value.slice(0, 50)}...` : row?.cell?.value}</span>
      );
    },
  },
  {
    Header: "Message",
    accessor: "message",
    Cell: (row) => {
      return (
        <span>{row?.cell?.value.length > 50 ? `${row?.cell?.value.slice(0, 50)}...` : row?.cell?.value}</span>
      );
    },
  },
  {
    Header: "Date",
    accessor: "time",
    Cell: (row) => {
      return <span>{moment(row?.cell?.value).format("DD/MM/YYYY")}</span>;
    },
  },
];



export const VehicleColumn = [
  {
    Header: "Name",
    accessor: "name",
    Cell: (row) => {
      return (
        <div className="flex items-center gap-4">
          <span>
            <img
              className="w-12 h-12 rounded-full"
              src={
                row.row.original.thumbnail
                  ? `${vehicleThumbnailRoute}/${row.row.original.thumbnail}`
                  : NoThumbnail
              }
              alt={row?.cell?.value}
            />
          </span>{" "}
          {/* {row?.cell?.value} */}
        </div>
      );
    },
  },
  
  {
    Header: "Year",
    accessor: "year",
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
    Header: "Color",
    accessor: "color",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Views",
    accessor: "views",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Date",
    accessor: "time",
    Cell: (row) => {
      return <span>{moment(row?.cell?.value).format("DD/MM/YYYY")}</span>;
    },
  },

  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="flex gap-2 w-full flex-wrap">
          {parseInt(row.row.original?.block) === 1 ? (
            <span className="inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 text-danger-500 bg-danger-500">
              blocked
            </span>
          ) : (
            <>
              <span
                className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 ${
                  row?.cell?.value === 0 ? "text-success-500 bg-success-500" : ""
                } 
              ${row?.cell?.value === 1 ? "text-danger-500 bg-danger-500" : ""}
              
               `}
              >
                {row?.cell?.value === 0 ? "Public" : "Private"}
              </span>

              <span
                className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 ${
                  row?.row?.original.approval === 1 ? "text-success-500 bg-success-500" : ""
                } 
                ${row?.row?.original.approval === 2 ? "text-danger-500 bg-danger-500" : ""}
                ${row?.row?.original.approval === 0 ? "text-orange-500 bg-orange-300" : ""}
              
               `}
              >
                {row?.row?.original.approval === 0
                  ? "Pending"
                  : row?.row?.original.approval === 1
                  ? "Approved"
                  : "Rejected"}
              </span>
            </>
          )}
        </span>
      );
    },
  },
];



export const PropertyColumn = [
  {
    Header: "Name",
    accessor: "name",
    Cell: (row) => {
      return (
        <div className="flex items-center gap-4">
          <span>
            <img
              className="w-12 h-12 rounded-full"
              src={
                row.row.original.thumbnail
                  ? `${propertyThumbnailRoute}/${row.row.original.thumbnail}`
                  : NoThumbnail
              }
              alt={row?.cell?.value}
            />
          </span>{" "}
          {/* {row?.cell?.value} */}
        </div>
      );
    },
  },
  
  {
    Header: "Type",
    accessor: "type",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "subtype",
    accessor: "subtype",
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
    Header: "Views",
    accessor: "views",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Date",
    accessor: "time",
    Cell: (row) => {
      return <span>{moment(row?.cell?.value).format("DD/MM/YYYY")}</span>;
    },
  },

  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="flex gap-2 w-full flex-wrap">
          {parseInt(row.row.original?.block) === 1 ? (
            <span className="inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 text-danger-500 bg-danger-500">
              blocked
            </span>
          ) : (
            <>
              <span
                className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 ${
                  row?.cell?.value === 0 ? "text-success-500 bg-success-500" : ""
                } 
              ${row?.cell?.value === 1 ? "text-danger-500 bg-danger-500" : ""}
              
               `}
              >
                {row?.cell?.value === 0 ? "Public" : "Private"}
              </span>

              <span
                className={` inline-block px-3 min-w-[80px] text-center  py-1 rounded-[999px] bg-opacity-25 ${
                  row?.row?.original.approval === 1 ? "text-success-500 bg-success-500" : ""
                } 
                ${row?.row?.original.approval === 2 ? "text-danger-500 bg-danger-500" : ""}
                ${row?.row?.original.approval === 0 ? "text-orange-500 bg-orange-300" : ""}
              
               `}
              >
                {row?.row?.original.approval === 0
                  ? "Pending"
                  : row?.row?.original.approval === 1
                  ? "Approved"
                  : "Rejected"}
              </span>
            </>
          )}
        </span>
      );
    },
  },
];