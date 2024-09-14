import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMedicalHistories } from "../data/medicalHistories/medicalsThunk";
import { useNavigate } from "react-router-dom";
import { search } from "../data/patients/patientsSlice";
import { NotepadText } from "lucide-react";
import { getPatients } from "../data/patients/patientsThunk";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import SearchBox from "../components/atoms/SearchBox";
import Button from "../components/atoms/Button";
import Table from "../components/atoms/Table";

function MedicalHistory() {
  const dispatch = useDispatch();
  const medicals = useSelector((state) => state.medicals.medicalHistories);
  const patients = useSelector((state) => state.patients.patients);
  const [isLoading, setIsLoading] = useState(false);
  const [showMedicals, setShowMedicals] = useState([]);

  useEffect(() => {
    if (!medicals.length) {
      setIsLoading(true);
      dispatch(getPatients());
      dispatch(getMedicalHistories()).then(() => setIsLoading(false));
    }
  }, []);

  const navigate = useNavigate();
  const patientNavigation = (name) => {
    dispatch(search(name));
    navigate("/patients");
  };

  const showPatientMedicals = (patient) => {
    setShowMedicals(
      medicals.filter((medical) => {
        return medical.patient.id == patient.id;
      })
    );
    // navigate(`${patient.id}`);
  };

  const tableHeader = (
    <tr>
      {["Patient", ""].map((header, index) => (
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

  const tableBody = patients.map((patient) => (
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

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col items-start justify-around w-full gap-12">
          <div className="flex items-center justify-between w-full">
            <SearchBox
              placeholder="patient name"
              // action={searchPatient}
            />
            <Button
              label="New Sheet"
              // onClick={createModal}
            />
          </div>
          <div className="w-1/2 mx-auto">
            {patients.length ? (
              <Table header={tableHeader} body={tableBody} />
            ) : (
              <div className="flex justify-center items-center h-64">
                <p>No results found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MedicalHistory;
