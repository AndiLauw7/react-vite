// import React, { useEffect, useMemo, useState } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import axios from "axios";

// export default function ModernTable() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPage, setTotalPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:3001/users`, {
//         params: {
//           _page: page,
//           _limit: 100,
//           q: search,
//         },
//       });
//       setData(res.data);
//       const total = parseInt(res.headers["x-total-count"], 10);
//       setTotalPage(Math.ceil(total / 10));
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, search]);
//   const columns = useMemo(
//     () => [
//       { accessorKey: "id", header: "ID" },
//       { accessorKey: "firstName", header: "First Name" },
//       { accessorKey: "lastName", header: "Last Name" },
//       { accessorKey: "email", header: "Email" },
//       { accessorKey: "age", header: "Age" },
//     ],
//     []
//   );
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     manualPagination: true,
//   });

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">TanStack Table - 100.000 Data</h1>

//       <input
//         type="text"
//         placeholder="Search..."
//         className="mb-4 px-3 py-2 border rounded w-full"
//         value={search}
//         onChange={(e) => {
//           setPage(1);
//           setSearch(e.target.value);
//         }}
//       />

//       <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             {table.getHeaderGroups().map((hg) => (
//               <tr key={hg.id}>
//                 {hg.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase"
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {loading ? (
//               <tr>
//                 <td colSpan={columns.length} className="text-center p-4">
//                   Loading...
//                 </td>
//               </tr>
//             ) : (
//               table.getRowModel().rows.map((row) => (
//                 <tr key={row.id} className="hover:bg-gray-50">
//                   {row.getVisibleCells().map((cell) => (
//                     <td
//                       key={cell.id}
//                       className="px-4 py-2 text-sm text-gray-800"
//                     >
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <button
//           className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//         >
//           Previous
//         </button>

//         <span className="text-sm">
//           Page <strong>{page}</strong> of <strong>{totalPage}</strong>
//         </span>

//         <button
//           className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
//           disabled={page === totalPage}
//           onClick={() => setPage((p) => p + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import "./index.css";

export default function ModernTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3001/users`, {
        params: {
          _page: page,
          _limit: 5,
          q: search,
        },
      });
      setData(res.data);
      const total = parseInt(res.headers["x-total-count"], 10);
      setTotalPage(Math.ceil(total / 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={
              table.getRowModel().rows.length > 0 &&
              table.getRowModel().rows.every((row) => selectedRowIds[row.id])
            }
            onChange={(e) => {
              const checked = e.target.checked;
              const newSelected = {};
              table.getRowModel().rows.forEach((row) => {
                newSelected[row.id] = checked;
              });
              setSelectedRowIds(newSelected);
            }}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedRowIds[row.id] || false}
            onChange={(e) => {
              setSelectedRowIds((prev) => ({
                ...prev,
                [row.id]: e.target.checked,
              }));
            }}
          />
        ),
      },
      { accessorKey: "id", header: "ID" },
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "age", header: "Age" },
    ],
    [selectedRowIds]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return (
    <div className="p-6 bg-[#f8fbff] min-h-screen">
      <div className="bg-red-500 text-white p-4">
        Ini harusnya background merah
      </div>
      <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold text-blue-600">Tailwind Active 🎉</h1>
        <p className="text-lg text-gray-700 mt-2">
          Kalau ini berwarna, berarti Tailwind jalan
        </p>
      </div>

      <h1 className="text-3xl font-bold mb-6">TanStack Table – 100.000 Data</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded w-full"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select className="border border-gray-300 rounded px-3 py-2">
          <option>All</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm text-left bg-white border">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 font-medium text-gray-600"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={
              table.getRowModel().rows.length > 0 &&
              table.getRowModel().rows.every((row) => selectedRowIds[row.id])
            }
            onChange={(e) => {
              const checked = e.target.checked;
              const newSelected = {};
              table.getRowModel().rows.forEach((row) => {
                newSelected[row.id] = checked;
              });
              setSelectedRowIds(newSelected);
            }}
          />
          <span>Shart al</span> {/* Typo sesuai gambar */}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>

          <span className="text-sm">
            <strong>{page}</strong> of <strong>{totalPage}</strong>
          </span>

          <button
            className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
            disabled={page === totalPage}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>

        <div className="text-gray-500">
          <button className="text-sm flex items-center gap-1">
            Sort
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 17l-4 4m0 0l-4-4m4 4V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
