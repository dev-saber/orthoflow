import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAppointments } from "../data/appointments/appointmentsThunk";
import Button from "../components/atoms/Button";
import SearchBox from "../components/atoms/SearchBox";
import CalendarView from "../components/molecules/CalendarView";
import AddAppointment from "../components/modals/addAppointment";
import ShowAppointment from "../components/modals/showAppointment";
import EditAppointment from "../components/modals/EditAppointment";

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

  const editAppointment = () => {
    openModal("edit");
  };

  const modals = {
    add: <AddAppointment isOpen={isModalOpen} onClose={closeModal} />,
    show: (
      <ShowAppointment
        isOpen={isModalOpen}
        onClose={closeModal}
        data={appointmentToShow}
        edit={editAppointment}
      />
    ),
    edit: (
      <EditAppointment
        isOpen={isModalOpen}
        onClose={closeModal}
        data={appointmentToShow}
        triggerEffect={() => setTriggerEffect(!triggerEffect)}
      />
    ),
  };

  return (
    <>
      <div className="flex flex-col items-start justify-around w-full gap-4">
        <div className="flex items-center justify-between w-full">
          <SearchBox />
          <Button label="New Appointment" onClick={() => openModal("add")} />
        </div>
        <CalendarView show={showAppointment} />
      </div>
      {modals[currentModal]}
    </>
  );
}

export default Appointments;
