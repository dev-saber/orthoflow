import React from "react";

const ViewToggle = ({ views, activeView, onViewChange }) => {
  return (
    <div
      className="inline-flex rounded-md shadow-sm border border-solid border-gray-300"
      role="group"
    >
      {views.map((view, index) => (
        <React.Fragment key={view}>
          <button
            type="button"
            className={`relative flex items-center justify-center px-4 py-2 text-sm font-medium text-black ${
              activeView === view
                ? ""
                : " bg-white hover:bg-gray-50 hover:text-gray-900"
            } ${index === 0 ? "rounded-l-md" : ""} ${
              index === views.length - 1 ? "rounded-r-md" : ""
            }`}
            onClick={() => onViewChange(view)}
          >
            <span className="z-10">{view}</span>
            {activeView === view && (
              <div className="absolute inset-[2px] flex items-center justify-center bg-gray-300 opacity-50 rounded-md w-[90%] h-[90%]"></div>
            )}
          </button>
          {index < views.length - 1 && (
            <div className="relative">
              <div className="absolute inset-y-2 right-0 w-px bg-gray-300"></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ViewToggle;
