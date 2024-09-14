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

function Patients() {
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.patients.search);
  const patients = useSelector((state) => state.patients.patients);

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

  const filteredPatients = patients.filter((patient) =>
    `${patient.first_name} ${patient.last_name}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  const tableBody = filteredPatients.map((patient, index) => (
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
      />
    ),
    edit: (
      <EditPatient
        isOpen={isModalOpen}
        onClose={closeModal}
        data={targetedPatient}
        triggerEffect={fetchDataAgain}
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
      />
    ),
  };

  return (
    <>
      <div className="flex flex-col items-start justify-around w-full gap-12">
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
          ) : filteredPatients.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p>No results found</p>
            </div>
          ) : (
            <Table header={tableHeader} body={tableBody} />
          )}
        </div>
      </div>
      {modals[currentModal]}
    </>
  );
}

export default Patients;
