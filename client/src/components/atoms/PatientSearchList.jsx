import React from "react";

function PatientSearchList({
  isShowing,
  filteredData,
  formData,
  hide,
  search,
  selected,}) {
  return (
    <>
      {/* search patients list (filtered by searchValue) */}
      {isShowing && filteredData.length > 0 && (
        <ul className="absolute z-50 w-full bg-white rounded-xl shadow-lg mt-1 max-h-60 overflow-auto">
          {filteredData.map((patient) => (
            <li
              key={patient.id}
              onClick={() => {
                search(`${patient.first_name} ${patient.last_name}`);
                formData.setFieldValue("patient_id", patient.id);
                hide();
                selected(true);
              }}
              className="cursor-pointer px-3 py-2 hover:bg-gray-200"
            >
              {patient.first_name} {patient.last_name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default PatientSearchList;
