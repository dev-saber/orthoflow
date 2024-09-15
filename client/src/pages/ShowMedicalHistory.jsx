import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { filterMedics } from "../data/medicalHistories/medicalsSlice";
import { getPatient } from "../data/patients/patientsSlice";
import { search } from "../data/patients/patientsSlice";
import Table from "../components/atoms/Table";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";

function ShowMedicalHistory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patients.patientIDSearch);
  const medicals = useSelector((state) => state.medicals.filteredMedics);
  const medicalsFullData = useSelector(
    (state) => state.medicals.medicalHistories
  );

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!medicalsFullData.length) {
      navigate("/medical-history");
    }

    const fetchData = async () => {
      await dispatch(filterMedics(id));
      await dispatch(getPatient(id));
      setIsLoading(false);
    };
    fetchData();
  }, [id, dispatch, medicalsFullData.length, navigate]);

  if (isLoading) return <div>Loading...</div>;

  const patientNavigation = (name) => {
    dispatch(search(name));
    navigate("/patients");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-CA", options);
  };

  const tableHeader = (
    <tr>
      {["visit date", "diagnosis", "treatment", "notes", "actions"].map(
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

  const tableBody = medicals.map((medical) => (
    <tr
      key={medical.id}
      className="bg-white text-black border-b-[1px] hover:bg-gray-50"
    >
      <td className="px-6 py-4 whitespace-normal break-words max-w-60 min-w-min">
        {formatDate(medical.visit_date)}
      </td>
      <td className="px-6 py-4 whitespace-normal break-words max-w-60 min-w-min">
        {medical.diagnosis}
      </td>
      <td className="px-6 py-4 whitespace-normal break-words max-w-60 min-w-min">
        {medical.treatment}
      </td>
      <td className="px-6 py-4 whitespace-normal break-words max-w-60 min-w-min">
        {medical.notes}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex gap-2">
          <span
            className="text-blue cursor-pointer"
            // onClick={}
          >
            <Edit2 size={17} />
          </span>
          <span
            className="text-red-700 cursor-pointer"
            // onClick={}
          >
            <Trash2 size={17} />
          </span>
        </div>
      </td>
    </tr>
  ));

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 items-center">
        <motion.div
          className="text-blue cursor-pointer"
          whileTap={{ x: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          onAnimationComplete={handlePrev}
        >
          <ArrowLeft />
        </motion.div>
        <div className="text-gray-800 text-lg">
          Patient:{" "}
          <span
            className="cursor-pointer font-semibold"
            onClick={() =>
              patientNavigation(`${patient.first_name} ${patient.last_name}`)
            }
          >
            {patient.first_name} {patient.last_name}
          </span>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        {medicals.length ? (
          <Table header={tableHeader} body={tableBody} />
        ) : (
          <div className="text-center">
            No medical history found for this patient
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowMedicalHistory;
