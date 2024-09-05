import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteAppointment,
  getAppointments,
} from "../data/appointments/appointmentsThunk";
import Button from "../components/atoms/Button";
import SearchBox from "../components/atoms/SearchBox";
import CalendarView from "../components/molecules/CalendarView";
import AddAppointment from "../components/modals/AddAppointment";
import ShowAppointment from "../components/modals/ShowAppointment";
import EditAppointment from "../components/modals/EditAppointment";
import DeleteModal from "../components/modals/DeleteModal";
import { setPatientSearch } from "../data/appointments/appointmentsSlice";

function Appointments() {
  const [triggerEffect, setTriggerEffect] = useState(false); // triggrer useEffect to fetch appointments after changes

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppointments());
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

  const modals = {
    add: <AddAppointment isOpen={isModalOpen} onClose={closeModal} />,
    show: (
      <ShowAppointment
        isOpen={isModalOpen}
        onClose={closeModal}
        data={appointmentToShow}
        edit={editAppointmentModal}
        deleteModal={deleteAppointmentModal}
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
        <CalendarView show={showAppointment} />
      </div>
      {modals[currentModal]}
    </>
  );
}

export default Appointments;
