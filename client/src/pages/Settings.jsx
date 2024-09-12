import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../data/auth/authThunk";
import Title from "../components/atoms/Title";
import Button from "../components/atoms/Button";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import EditUserInfo from "../components/modals/EditUserInfo";

function Settings() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);

  useEffect(() => {
    !user && setIsLoading(true);
    dispatch(userInfo()).then(() => setIsLoading(false));
  }, [triggerEffect]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchDataAgain = () => {
    setTriggerEffect(!triggerEffect);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-16">
          <Title text="Personal Information" />
          <div className="flex flex-col w-1/2 m-auto gap-8">
            <div className="flex justify-between items-center border-b-2 pb-4">
              <div className="text-blue font-semibold text-lg">first name</div>
              <div>{user?.first_name}</div>
            </div>
            <div className="flex justify-between items-center border-b-2 pb-4">
              <div className="text-blue font-semibold text-lg">last name</div>
              <div>{user?.last_name}</div>
            </div>
            <div className="flex justify-between items-center border-b-2 pb-4">
              <div className="text-blue font-semibold text-lg">
                email address
              </div>
              <div>{user?.email}</div>
            </div>
            <div className="flex justify-between items-center border-b-2 pb-4">
              <div className="text-blue font-semibold text-lg">start time</div>
              <div>{user?.start_time}</div>
            </div>
            <div className="flex justify-between items-center border-b-2 pb-4">
              <div className="text-blue font-semibold text-lg">end time</div>
              <div>{user?.end_time}</div>
            </div>
          </div>
          <div className="w-2/5 mx-auto flex items-center justify-around">
            <Button label="Edit" onClick={openModal} className="w-28" />
            <Button label="Log Out" className="bg-red-700 w-28" />
          </div>
          {user && (
            <EditUserInfo
              data={user}
              isOpen={isModalOpen}
              onClose={closeModal}
              triggerEffect={fetchDataAgain}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Settings;
