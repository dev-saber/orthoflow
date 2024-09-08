import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
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
          item.quantity > item.reorder_level
            ? "rgba(74, 114, 255, 0.5)"
            : "rgba(211, 47, 47, 0.5)"
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
    maintainAspectRatio: false,
  };
  return (
    <>
      {!isLoading && (
        <div style={{ width: "100%", height: "80%" }}>
          <Bar data={data} options={options} />
        </div>
      )}
    </>
  );
}

export default StockInventory;
