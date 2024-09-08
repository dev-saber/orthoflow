import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import Title from "../atoms/Title";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function StockInventory({ isLoading }) {
  const stock = useSelector((state) => state.stock.data);
  const data = {
    labels: stock.map((item) => item.name),
    datasets: [
      {
        label: "Quantity",
        data: stock.map((item) => item.quantity),
        backgroundColor: stock.map((item) =>
          item.quantity > item.reorder_level ? "#4a72ff" : "#d32f2f"
        ),
        borderColor: stock.map((item) =>
          item.quantity > item.reorder_level ? "#4a72ff" : "#d32f2f"
        ),
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <>
      {!isLoading && (
        <div className="flex flex-col items-center gap-16">
          <Title text="Stock Inventory" />
          <Bar data={data} options={options} />
        </div>
      )}
    </>
  );
}

export default StockInventory;
