import React from "react";
import { useSelector } from "react-redux";
import Table from "../atoms/Table";
import { Edit2, Trash2 } from "lucide-react";

function StockTable() {
  const stock = useSelector((state) => state.stock.data);

  const tableHeader = (
    <tr>
      {["item name", "price", "quantity", "reorder level"].map(
        (header, index) => (
          <th
            key={index}
            scope="col"
            className="px-6 py-3 text-start text-sm medium text-blue font-bold"
          >
            {header}
          </th>
        )
      )}
      <th
        scope="col"
        className="px-6 py-3 text-start text-sm medium text-blue font-bold"
      >
        Action
      </th>
    </tr>
  );

  const tableBody = stock.map((item, index) => (
    <tr
      key={index}
      className="bg-white text-black border-b-[1px] hover:bg-gray-50 text-center"
    >
      <td className="px-6 py-4 whitespace-nowrap text-start">{item.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
      <td
        className={`px-6 py-4 whitespace-nowrap ${
          item.reorder_level >= item.quantity
            ? "text-red-600 font-semibold"
            : "text-black"
        }`}
      >
        {item.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{item.reorder_level}</td>
      <td className="p-6 whitespace-nowrap flex gap-2">
        <span className="text-blue cursor-pointer" onClick={() => {}}>
          <Edit2 size={17} />
        </span>
        <span className="text-red-700 cursor-pointer" onClick={() => {}}>
          <Trash2 size={17} />
        </span>
      </td>
    </tr>
  ));

  return <Table header={tableHeader} body={tableBody} />;
}

export default StockTable;
