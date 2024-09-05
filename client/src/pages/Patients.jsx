import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, Trash2 } from "lucide-react";
import { getPatients } from "../data/patients/patientsThunk";
import Table from "../components/atoms/Table";
import SearchBox from "../components/atoms/SearchBox";
import Button from "../components/atoms/Button";
import { search } from "../data/patients/patientsSlice";
import AddPatient from "../components/modals/AddPatient";

function Patients() {
  const [triggerEffect, setTriggerEffect] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatients());
  }, [triggerEffect]);

  const fetchDataAgain = () => {
    setTriggerEffect(!triggerEffect);
  };

  const patients = useSelector((state) => state.patients.patients);
  const tableHeader = (
    <tr>
      {["First name", "Last Name", "Date of Birth", "Phone Number"].map(
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
      <th
        scope="col"
        className="px-6 py-3 text-start text-sm medium text-blue font-bold"
      >
        Action
      </th>
    </tr>
  );

  const tableBody = patients
    .filter((patient) => patient !== undefined) // Filter out undefined elements
    .map((patient, index) => (
      <tr
        key={index}
        className="bg-white text-black border-b-[1px] hover:bg-gray-50"
      >
        <td className="px-6 py-4 whitespace-nowrap">{patient.first_name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{patient.last_name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{patient.date_of_birth}</td>
        <td className="px-6 py-4 whitespace-nowrap">{patient.phone}</td>
        <td className="px-4 py-4 whitespace-nowrap flex gap-2">
          <span className="text-blue cursor-pointer">
            <Edit2 size={20} />
          </span>
          <span className="text-red-700 cursor-pointer">
            <Trash2 size={20} />
          </span>
        </td>
      </tr>
    ));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

  const openModal = (modalName) => {
    setIsModalOpen(true);
    setCurrentModal(modalName);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentModal(null);
  };

  const modals = {
    add: (
      <AddPatient
        isOpen={isModalOpen}
        onClose={closeModal}
        triggerEffect={fetchDataAgain}
      />
    ),
    // edit: ,
    // delete: ,
  };

  return (
    <>
      <div className="flex flex-col items-start justify-around w-full gap-12">
        <div className="flex items-center justify-between w-full">
          <SearchBox placeholder="name" action={search} />
          <Button label="Add a Patient" onClick={() => openModal("add")} />
        </div>
        <div className="w-11/12 mx-auto ">
          <Table header={tableHeader} body={tableBody} />
        </div>
      </div>
      {modals[currentModal]}
    </>
  );
}

export default Patients;
