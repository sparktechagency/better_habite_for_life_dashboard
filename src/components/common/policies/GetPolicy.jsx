import React from "react";

function GetPolicy({ getPolicy }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{getPolicy}</h1>
      <p className="text-base text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    </div>
  );
}

export default GetPolicy;
