import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAppointment,
  getAppointments,
} from "../data/appointments/appointmentsThunk";
import { setPatientSearch } from "../data/appointments/appointmentsSlice";
import { useNavigate } from "react-router-dom";
import { search } from "../data/patients/patientsSlice";
import Button from "../components/atoms/Button";
import SearchBox from "../components/atoms/SearchBox";
import CalendarView from "../components/molecules/CalendarView";
import AddAppointment from "../components/modals/AddAppointment";
import ShowAppointment from "../components/modals/ShowAppointment";
import EditAppointment from "../components/modals/EditAppointment";
import DeleteModal from "../components/modals/DeleteModal";

function Appointments() {
  const [triggerEffect, setTriggerEffect] = useState(false); // trigger useEffect to fetch appointments after changes
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);

  useEffect(() => {
    if (appointments.length == 0) {
      setIsLoading(true);
      dispatch(getAppointments()).then(() => setIsLoading(false));
    }
  }, [triggerEffect]);

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

  const [appointmentToShow, setAppointmentToShow] = useState({});
  const showAppointment = (appointment) => {
    setAppointmentToShow(appointment);
    openModal("show");
  };

  const editAppointmentModal = () => {
    openModal("edit");
  };

  const deleteAppointmentModal = () => {
    openModal("delete");
  };

  const fetchDataAgain = () => {
    setTriggerEffect(!triggerEffect);
  };

  const navigate = useNavigate();

  const patientNavigation = (name) => {
    dispatch(search(name));
    navigate("/patients");
  };

  const modals = {
    add: <AddAppointment isOpen={isModalOpen} onClose={closeModal} />,
    show: (
      <ShowAppointment
        isOpen={isModalOpen}
        onClose={closeModal}
        data={appointmentToShow}
        edit={editAppointmentModal}
        deleteModal={deleteAppointmentModal}
        patientNavigation={patientNavigation}
      />
    ),
    edit: (
      <EditAppointment
        isOpen={isModalOpen}
        onClose={closeModal}
        data={appointmentToShow}
        triggerEffect={fetchDataAgain}
      />
    ),
    delete: (
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        type="appointment"
        action={() => dispatch(deleteAppointment(appointmentToShow.id))}
        id={appointmentToShow.id}
        triggerEffect={fetchDataAgain}
      />
    ),
  };

  return (
    <>
      <div className="flex flex-col items-start justify-around w-full gap-4">
        <div className="flex items-center justify-between w-full">
          <SearchBox placeholder="patient name" action={setPatientSearch} />
          <Button label="New Appointment" onClick={() => openModal("add")} />
        </div>
        <CalendarView show={showAppointment} isLoading={isLoading} />
      </div>
      {modals[currentModal]}
    </>
  );
}

export default Appointments;
