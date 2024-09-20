import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStock } from "../data/stock/stockThunk";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import StockInventory from "../components/molecules/StockInventory";
import Title from "../components/atoms/Title";
import { billsStats } from "../data/bills/billsThunk";
import Stats from "../components/atoms/Stats";

function Dashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const stock = useSelector((state) => state.stock.data);
  const stats = useSelector((state) => state.bills.stats);

  useEffect(() => {
    async function fetchStats() {
      if (!stock.length) {
        await dispatch(getStock());
      }
      if (!stats.length) {
        await dispatch(billsStats());
      }
      setLoading(false);
    }

    fetchStats();

    setLoading(false);
  }, [stock]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col gap-4 h-full">
          <div className="flex gap-8 items-center h-full">
            <div className="w-1/2 flex flex-col items-center gap-8 h-screen">
              <Title text="Stock Inventory" />
              <StockInventory isLoading={loading} />
            </div>
            <div className="w-1/2 flex flex-col items-center gap-12">
              <Stats
                beginText="estimated"
                data={`MAD ${stats.unpaidSum}`}
                endText="unpaid bills"
              />
              <Stats data={stats.unpaidClients} endText="unpaid clients" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
