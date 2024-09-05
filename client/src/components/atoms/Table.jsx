import React from "react";

const Table = ({ header, body }) => {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>{header}</thead>
              <tbody>{body}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
