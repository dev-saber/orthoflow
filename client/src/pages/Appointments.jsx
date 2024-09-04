import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "../components/atoms/Button";
import SearchBox from "../components/atoms/SearchBox";
import CalendarView from "../components/molecules/CalendarView";
import AddAppointment from "../components/modals/addAppointment";
import { getAppointments } from "../data/appointments/appointmentsThunk";

function Appointments() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppointments());
  }, []);
  const appointments = useSelector(state => state.appointments.appointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className="flex flex-col items-start justify-around w-full gap-4">
        <div className="flex items-center justify-between w-full">
          <SearchBox />
          <Button label="New Appointment" onClick={openModal} />
        </div>
        <CalendarView />
      </div>
      <AddAppointment isOpen={isModalOpen} onClose={closeModal}/>
    </>
  );
}

export default Appointments;
