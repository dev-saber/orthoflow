import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getBills } from "../data/bills/billsThunk";
import { search } from "../data/patients/patientsSlice";
import { Edit2, Trash2, Vault, VaultIcon } from "lucide-react";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import Table from "../components/atoms/Table";
import SearchBox from "../components/atoms/SearchBox";
import Button from "../components/atoms/Button";
import EditBill from "../components/modals/EditBill";

function Bills() {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bills.bills);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);

  useEffect(() => {
    !bills.length && setIsLoading(true);
    dispatch(getBills()).then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    dispatch(getBills()).then(() => setIsLoading(false));
  }, [triggerEffect]);

  const navigate = useNavigate();
  const patientNavigation = (name) => {
    dispatch(search(name));
    navigate("/patients");
  };

  const tableHeader = (
    <tr>
      {["Patient", "Amount", "Date", "Status", "Actions"].map(
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

  const tableBody = bills.map((bill) => (
    <tr
      key={bill.id}
      className="bg-white text-black border-b-[1px] hover:bg-gray-50"
    >
      <td
        className="px-6 py-4 whitespace-nowrap cursor-pointer"
        onClick={() =>
          patientNavigation(
            `${bill.patient.first_name} ${bill.patient.last_name}`
          )
        }
      >
        {bill.patient.first_name} {bill.patient.last_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{bill.amount}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {moment(bill.created_at).format("YYYY-MM-DD")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{bill.status}</td>
      <td className="p-6 whitespace-nowrap flex gap-2">
        <span
          className="text-blue cursor-pointer"
          onClick={() => {
            setBillToShow(bill);
            editModal();
          }}
        >
          <Edit2 size={17} />
        </span>
        <span
          className="text-red-700 cursor-pointer"
          onClick={() => {
            setBillToShow(bill);
            deleteModal();
          }}
        >
          <Trash2 size={17} />
        </span>
      </td>
    </tr>
  ));

  const fetchDataAgain = () => {
    setTriggerEffect(!triggerEffect);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [billToShow, setBillToShow] = useState({});

  const openModal = (modal) => {
    setIsModalOpen(true);
    setCurrentModal(modal);
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
      <EditBill
        isOpen={isModalOpen}
        onClose={closeModal}
        data={billToShow}
        triggerEffect={fetchDataAgain}
      />
    ),
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col items-start justify-around w-full gap-12">
          <div className="flex items-center justify-between w-full">
            <SearchBox placeholder="patient name" />
            <Button label="New Invoice" />
          </div>
          <div className="w-11/12 mx-auto">
            <Table header={tableHeader} body={tableBody} />
          </div>
        </div>
      )}
      {modals[currentModal]}
    </>
  );
}

export default Bills;
