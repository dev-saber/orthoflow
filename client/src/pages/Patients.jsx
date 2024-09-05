import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, Trash2 } from "lucide-react";
import { getPatients } from "../data/patients/patientsThunk";
import Table from "../components/atoms/Table";

function Patients() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

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

  const tableBody = patients.map((patient, index) => (
    <tr key={index} className="bg-white text-black hover:bg-gray-50">
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
  return (
    <div>
      Patients
      <Table header={tableHeader} body={tableBody} />
    </div>
  );
}

export default Patients;
