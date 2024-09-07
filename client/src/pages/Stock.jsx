import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStock } from "../data/stock/stockThunk";

function Stock() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStock());
  }, []);
  
  return <div>Stock</div>;
}

export default Stock;
