import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePatient, getPatients } from "../data/patients/patientsThunk";
import { search } from "../data/patients/patientsSlice";
import { Edit2, Trash2 } from "lucide-react";
import Table from "../components/atoms/Table";
import SearchBox from "../components/atoms/SearchBox";
import Button from "../components/atoms/Button";
import AddPatient from "../components/modals/AddPatient";
import EditPatient from "../components/modals/EditPatient";
import DeleteModal from "../components/modals/DeleteModal";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import Toast from "../components/atoms/Toast";

function Patients() {
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.patients.search);
  const patients = useSelector((state) => state.patients.patients);

  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if (patients.current_page) {
      setCurrentPage(patients.current_page);
    }
  }, [patients]);

  const paginate = (data) => {
    const pageNavigation = (page) => {
      setCurrentPage(page);
      dispatch(getPatients(page));
    };

    const pages = Array.from({ length: data.last_page }, (_, i) => (
      <button
        key={i + 1}
        className={`min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-blue ${
          i + 1 == currentPage ? "bg-blue text-white" : ""
        }`}
        onClick={() => pageNavigation(i + 1)}
      >
        {i + 1}
      </button>
    ));

    return (
      <nav className="flex items-center gap-x-1" aria-label="Pagination">
        <button
          type="button"
          className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Previous"
          onClick={() => currentPage > 1 && pageNavigation(currentPage - 1)}
          disabled={currentPage == 1}
        >
          <svg
            className="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <span>Previous</span>
        </button>
        <div className="flex items-center gap-x-1">{pages}</div>
        <button
          type="button"
          className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Next"
          onClick={() =>
            currentPage < data.last_page && pageNavigation(currentPage + 1)
          }
          disabled={currentPage == data.last_page}
        >
          <span>Next</span>
          <svg
            className="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </nav>
    );
  };

  useEffect(() => {
    !patients.length && setIsLoading(true);
    dispatch(getPatients()).then(() => setIsLoading(false));
  }, [triggerEffect]);

  const fetchDataAgain = () => {
    setTriggerEffect(!triggerEffect);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [targetedPatient, setTargetedPatient] = useState(null);

  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage("");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const openModal = (modalName) => {
    setIsModalOpen(true);
    setCurrentModal(modalName);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentModal(null);
  };

  const editModal = () => {
    openModal("edit");
  };

  const deleteModal = () => {
    openModal("delete");
  };

  const tableHeader = (
    <tr>
      {[
        "First name",
        "Last Name",
        "Date of Birth",
        "Phone Number",
        "Actions",
      ].map((header, index) => (
        <th
          key={index}
          scope="col"
          className="px-6 py-3 text-start text-sm medium text-blue font-bold"
        >
          {header}
        </th>
      ))}
    </tr>
  );

  let filteredPatients = [];
  if (patients.data) {
    filteredPatients = patients.data.filter((patient) =>
      `${patient.first_name} ${patient.last_name}`
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  }

  const tableBody =
    filteredPatients.length > 0 &&
    filteredPatients.map((patient, index) => (
      <tr
        key={index}
        className="bg-white text-black border-b-[1px] hover:bg-gray-50"
      >
        <td className="px-6 py-4 whitespace-nowrap">{patient.first_name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{patient.last_name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{patient.date_of_birth}</td>
        <td className="px-6 py-4 whitespace-nowrap">{patient.phone}</td>
        <td className="p-6 whitespace-nowrap flex gap-2">
          <span
            className="text-blue cursor-pointer"
            onClick={() => {
              setTargetedPatient(patient);
              editModal();
            }}
          >
            <Edit2 size={17} />
          </span>
          <span
            className="text-red-700 cursor-pointer"
            onClick={() => {
              setTargetedPatient(patient);
              deleteModal();
            }}
          >
            <Trash2 size={17} />
          </span>
        </td>
      </tr>
    ));

  const modals = {
    add: (
      <AddPatient
        isOpen={isModalOpen}
        onClose={closeModal}
        triggerEffect={fetchDataAgain}
        toast={setToastMessage}
      />
    ),
    edit: (
      <EditPatient
        isOpen={isModalOpen}
        onClose={closeModal}
        data={targetedPatient}
        triggerEffect={fetchDataAgain}
        toast={setToastMessage}
      />
    ),
    delete: (
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        type="patient"
        action={() => dispatch(deletePatient(targetedPatient.id))}
        id={targetedPatient?.id}
        triggerEffect={fetchDataAgain}
        toast={setToastMessage}
      />
    ),
  };

  return (
    <>
      <div className="flex flex-col items-start justify-around w-full gap-12">
        {toastMessage && <Toast message={toastMessage} />}

        <div className="flex items-center justify-between w-full">
          <SearchBox
            placeholder="patient name"
            action={search}
            value={searchValue}
          />
          <Button label="Add a Patient" onClick={() => openModal("add")} />
        </div>
        <div className="w-11/12 mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <LoadingSpinner />
            </div>
          ) : filteredPatients.length == 0 ? (
            <div className="flex justify-center items-center h-64">
              <p>No results found</p>
            </div>
          ) : (
            <>
              <Table header={tableHeader} body={tableBody} />
              {paginate(patients)}
            </>
          )}
        </div>
      </div>
      {modals[currentModal]}
    </>
  );
}

export default Patients;
