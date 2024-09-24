import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatients, patientsCache } from "../data/patients/patientsThunk";

const usePatientsData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const patients = useSelector((state) => state.patients.patients.data);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      const cacheKeys = Object.keys(patientsCache);
      if (cacheKeys.length === 0) {
        await dispatch(getPatients());
      }
      setLoading(false);
    };

    fetchPatients();
  }, [dispatch]);

  return { patients, loading };
};

export default usePatientsData;
