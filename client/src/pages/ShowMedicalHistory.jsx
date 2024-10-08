import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { filterMedics } from "../data/medicalHistories/medicalsSlice";
import { getPatient } from "../data/patients/patientsSlice";
import { search } from "../data/patients/patientsSlice";
import {
  deleteMedicalHistory,
  getMedicalHistories,
} from "../data/medicalHistories/medicalsThunk";
import Table from "../components/atoms/Table";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import EditMedicalHistory from "../components/modals/EditMedicalHistory";
import DeleteModal from "../components/modals/DeleteModal";
import Toast from "../components/atoms/Toast";

function ShowMedicalHistory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const patient = useSelector((state) => state.patients.patientIDSearch);
  const medicals = useSelector((state) => state.medicals.filteredMedics);
  const medicalsFullData = useSelector(
    (state) => state.medicals.medicalHistories.data
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [targetedRecord, setTargetedRecord] = useState(null);

  const fetchDataAgain = () => {
    setTriggerEffect(!triggerEffect);
  };

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

  useEffect(() => {
    const refetchData = async () => {
      await dispatch(getMedicalHistories());
      await dispatch(filterMedics(id));
    };
    refetchData();
  }, [triggerEffect]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage("");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (isLoading) return <LoadingSpinner />;

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
            onClick={() => {
              setTargetedRecord(medical);
              editModal();
            }}
          >
            <Edit2 size={17} />
          </span>
          <span
            className="text-red-700 cursor-pointer"
            onClick={() => {
              setTargetedRecord(medical);
              deleteModal();
            }}
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

  const modals = {
    edit: (
      <EditMedicalHistory
        isOpen={isModalOpen}
        onClose={closeModal}
        triggerEffect={fetchDataAgain}
        data={targetedRecord}
        toast={setToastMessage}
      />
    ),

    delete: (
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        type="medical history"
        action={() => dispatch(deleteMedicalHistory(targetedRecord?.id))}
        id={targetedRecord?.id}
        toast={setToastMessage}
        triggerEffect={fetchDataAgain}
      />
    ),
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        {toastMessage && <Toast message={toastMessage} />}
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
      {modals[currentModal]}
    </>
  );
}

export default ShowMedicalHistory;
