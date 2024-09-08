import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStock } from "../data/stock/stockThunk";
import StockInventory from "../components/molecules/StockInventory";
import LoadingSpinner from "../components/atoms/LoadingSpinner";

function Stock() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    dispatch(getStock()).then(() =>
      setTimeout(() => {
        setLoading(false);
      }, 500)
    );
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex h-screen gap-8 items-center">
          <div className="w-1/2 h-5/6">
            <StockInventory isLoading={loading} />
          </div>
          <div className="w-1/2">
            <p>stock</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Stock;
