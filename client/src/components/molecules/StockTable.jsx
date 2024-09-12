import React from "react";
import { useSelector } from "react-redux";
import { Edit2, TriangleAlert } from "lucide-react";
import Table from "../atoms/Table";
import EditStockModal from "../modals/EditStockModal";

function StockTable({ modal, isOpen, onClose, itemRecord, triggerEffect }) {
  const stock = useSelector((state) => state.stock.data);

  const tableHeader = (
    <tr>
      {["item name", "price", "quantity", "reorder level", "action"].map(
        (header, index) => (
          <th
            key={index}
            scope="col"
            className={`px-5 py-3 text-start text-sm medium text-blue font-bold ${
              header == "item name" && "pl-12"
            }`}
          >
            {header}
          </th>
        )
      )}
    </tr>
  );

  const tableBody = stock.map((item, index) => (
    <tr
      key={index}
      className="bg-white text-black border-b-[1px] hover:bg-gray-50 text-center"
    >
      <td className="px-6 py-4 whitespace-nowrap text-start flex gap-2 items-center">
        {item.reorder_level >= item.quantity && (
          <span className="text-red-700">
            <TriangleAlert size={15} />
          </span>
        )}
        <span className={`${!(item.reorder_level >= item.quantity) && "ml-6"}`}>
          {item.name}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
      <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
      <td className="px-6 py-4 whitespace-nowrap">{item.reorder_level}</td>
      <td className="py-5 whitespace-nowrap flex justify-center">
        <span
          className="text-blue cursor-pointer"
          onClick={() => {
            modal(item);
          }}
        >
          <Edit2 size={17} />
        </span>
      </td>
    </tr>
  ));

  return (
    <>
      <Table header={tableHeader} body={tableBody} />
      <EditStockModal
        isOpen={isOpen}
        onClose={onClose}
        data={itemRecord}
        triggerEffect={triggerEffect}
      />
    </>
  );
}

export default StockTable;
