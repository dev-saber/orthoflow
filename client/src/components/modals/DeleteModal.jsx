import React from "react";
import ModalContainer from "./ModalContainer";
import { Info } from "lucide-react";
import Button from "../atoms/Button";

function DeleteModal({ isOpen, onClose, type, id, action, triggerEffect }) {
  const handleDelete = async () => {
    await action(id);
    await triggerEffect();
    onClose();
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4">
          <Info className="w-32 h-32 text-red-700" />
          <h3 className="text-xl font-semibold">
            Are you sure you want to delete the {type} with the ID:{" "}
            <span className="text-red-700 font-bold">{id}</span>?
          </h3>
        </div>
        <Button
          label="Confirm Delete"
          onClick={handleDelete}
          className="bg-red-700"
        />
      </div>
    </ModalContainer>
  );
}

export default DeleteModal;
