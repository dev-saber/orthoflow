import React, { useState } from "react";
import Button from "../components/atoms/Button";
import SearchBox from "../components/atoms/SearchBox";
import CalendarView from "../components/molecules/CalendarView";
import ModalContainer from "../components/modals/ModalContainer";

function Appointments() {
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
      <ModalContainer isOpen={isModalOpen} onClose={closeModal}>
        test
      </ModalContainer>
    </>
  );
}

export default Appointments;
