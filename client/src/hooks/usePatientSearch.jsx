import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../data/patients/patientsThunk";
import PatientSearchList from "../components/atoms/PatientSearchList";

function usePatientSearch(formData) {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);

  const [searchValue, setSearchValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showFilteredPatients, setShowFilteredPatients] = useState(false);

  useEffect(() => {
    if (patients.length == 0) {
      dispatch(getPatients());
    }
  }, [patients.length]);

  useEffect(() => {
    if (searchValue && !isSelected) {
      setFilteredPatients(
        patients.filter((patient) =>
          `${patient.first_name} ${patient.last_name}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      );
      setShowFilteredPatients(true);
    } else {
      setFilteredPatients([]);
      setShowFilteredPatients(false);
    }
  }, [searchValue, isSelected]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setIsSelected(false);
  };

  const searchResult = (
    <PatientSearchList
      isShowing={showFilteredPatients}
      filteredData={filteredPatients}
      formData={formData}
      hide={() => setShowFilteredPatients(false)}
      search={setSearchValue}
      selected={setIsSelected}
    />
  );
  return {
    searchValue,
    setSearchValue,
    isSelected,
    setIsSelected,
    showFilteredPatients,
    setShowFilteredPatients,
    handleChange,
    searchResult,
  };
}

export default usePatientSearch;
