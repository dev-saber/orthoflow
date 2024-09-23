import React, { useState } from "react";
import { useDispatch } from "react-redux";

function usePaginate(data, getData) {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const pageNavigation = (page) => {
    setCurrentPage(page);
    dispatch(getData(page));
  };

  if (data.last_page == 1 || !data.last_page) return null;
  const pages = Array.from({ length: data.last_page }, (_, i) => (
    <button
      key={i + 1}
      className={`min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-blue ${
        i + 1 == currentPage ? "bg-blue text-white hover:bg-blue" : ""
      }`}
      onClick={() => pageNavigation(i + 1)}
    >
      {i + 1}
    </button>
  ));

  return (
    <nav className="flex items-center gap-x-1">
      <button
        type="button"
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => currentPage > 1 && pageNavigation(currentPage - 1)}
        disabled={currentPage == 1}
      >
        <svg
          className="shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span>Previous</span>
      </button>
      <div className="flex items-center gap-x-1">{pages}</div>
      <button
        type="button"
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
        onClick={() =>
          currentPage < data.last_page && pageNavigation(currentPage + 1)
        }
        disabled={currentPage == data.last_page}
      >
        <span>Next</span>
        <svg
          className="shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
  );
}

export default usePaginate;
