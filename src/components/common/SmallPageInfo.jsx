import React from "react";

function SmallPageInfo({ title, description }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-base text-gray-500">{description}</p>
    </div>
  );
}

export default SmallPageInfo;
