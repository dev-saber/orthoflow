import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCache,
  getMedicalHistories,
  prefetchMedicalHistories,
} from "../data/medicalHistories/medicalsThunk";
import { useNavigate } from "react-router-dom";
import { search } from "../data/patients/patientsSlice";
import { NotepadText } from "lucide-react";
import usePatientSearch from "../hooks/usePatientSearch";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import SearchBox from "../components/atoms/SearchBox";
import Button from "../components/atoms/Button";
import Table from "../components/atoms/Table";
import AddMedicalHistory from "../components/modals/AddMedicalHistory";
import Toast from "../components/atoms/Toast";
import usePaginate from "../hooks/usePaginate";

function MedicalHistory() {
  const dispatch = useDispatch();

  const medicals = useSelector((state) => state.medicals.medicalHistories);
  const searchValue = useSelector((state) => state.patients.search);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { loading: patientsLoading } = usePatientSearch();
  const paginate = usePaginate(medicals, getMedicalHistories);

  useEffect(() => {
    if (!medicals.data?.length) {
      setIsLoading(true);
      dispatch(getMedicalHistories()).then(() => {
        setIsLoading(false);
        dispatch(prefetchMedicalHistories());
      });
    }
  }, []);

  useEffect(() => {
    clearCache();
    dispatch(getMedicalHistories());
  }, [triggerEffect]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage("");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const navigate = useNavigate();
  const patientNavigation = (name) => {
    dispatch(search(name));
    navigate("/patients");
  };

  const showPatientMedicals = (patient) => navigate(`${patient.id}`);

  const tableHeader = (
    <tr>
      {["Patient", "number of visits", "last visit", "more details"].map(
        (header, index) => (
          <th
            key={index}
            scope="col"
            className="px-6 py-3 text-start text-sm medium text-blue font-bold"
          >
            {header}
          </th>
        )
      )}
    </tr>
  );

  const filteredPatients = medicals.data?.filter((patient) =>
    `${patient.first_name} ${patient.last_name}`
      .toLowerCase()
      .startsWith(searchValue.toLowerCase())
  );

  const tableBody = filteredPatients?.map((patient) => (
    <tr
      key={patient.id}
      className="bg-white text-black border-b-[1px] hover:bg-gray-50"
    >
      <td
        className="px-6 py-4 whitespace-nowrap cursor-pointer"
        onClick={() =>
          patientNavigation(`${patient.first_name} ${patient.last_name}`)
        }
      >
        {patient.first_name} {patient.last_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
        {patient.medical_histories_count}
      </td>
      <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
        {patient.last_visit_date ?? "N/A"}
      </td>

      <td
        className="px-6 py-4 whitespace-nowrap text-blue"
        onClick={() => showPatientMedicals(patient)}
      >
        <span className="cursor-pointer w-fit">
          <NotepadText />
        </span>
      </td>
    </tr>
  ));

  const fetchDataAgain = () => {
    setTriggerEffect(!triggerEffect);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {isLoading || patientsLoading ? (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col items-start justify-around w-full gap-12">
          {toastMessage && <Toast message={toastMessage} />}
          <div className="flex items-center justify-between w-full">
            <SearchBox
              placeholder="patient name"
              action={search}
              value={searchValue}
            />
            <Button label="New Sheet" onClick={openModal} />
          </div>
          <div className="w-4/5 mx-auto relative">
            {medicals.data?.length ? (
              <Table header={tableHeader} body={tableBody} />
            ) : (
              <div className="flex justify-center items-center h-64">
                <p>No results found</p>
              </div>
            )}
            <div className="flex justify-center mt-4">{paginate}</div>
          </div>
        </div>
      )}
      <AddMedicalHistory
        isOpen={isModalOpen}
        onClose={closeModal}
        triggerEffect={fetchDataAgain}
        toast={setToastMessage}
      />
    </>
  );
}

export default MedicalHistory;
