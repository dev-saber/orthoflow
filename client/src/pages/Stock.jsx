import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStock } from "../data/stock/stockThunk";
import StockInventory from "../components/molecules/StockInventory";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import StockTable from "../components/molecules/StockTable";

function Stock() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const stock = useSelector((state) => state.stock.data);

  const [triggerEffect, setTriggerEffect] = useState(false);

  useEffect(() => {
    dispatch(getStock());
  }, [triggerEffect]);

  useEffect(() => {
    stock.length && setLoading(false);
  }, [stock]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState({});

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
        <div className="mx-auto w-4/5 -mt-8">
          <StockTable
            modal={openModal}
            isOpen={isModalOpen}
            onClose={closeModal}
            itemRecord={item}
            triggerEffect={fetchDataAgain}
          />
        </div>
      )}
    </>
  );
}

export default Stock;
