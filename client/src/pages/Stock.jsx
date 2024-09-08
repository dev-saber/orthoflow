import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStock } from "../data/stock/stockThunk";
import StockInventory from "../components/molecules/StockInventory";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import StockTable from "../components/molecules/StockTable";

function Stock() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const stock = useSelector((state) => state.stock.data);

  const [triggerEffect, setTriggerEffect] = React.useState(false);

  useEffect(() => {
    dispatch(getStock());
  }, [triggerEffect]);

  useEffect(() => {
    stock.length && setLoading(false);
  }, [stock]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [item, setItem] = React.useState({});

  const openModal = (item) => {
    setItem(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchDataAgain = () => {
    setTriggerEffect(!triggerEffect);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col gap-4 h-full">
          <div className="flex gap-8 items-center h-full">
            <div className="w-1/2 flex items-center h-full">
              <StockInventory isLoading={loading} />
            </div>
            <div className="w-1/2 self-start">
              <StockTable
                modal={openModal}
                isOpen={isModalOpen}
                onClose={closeModal}
                itemRecord={item}
                triggerEffect={fetchDataAgain}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Stock;
