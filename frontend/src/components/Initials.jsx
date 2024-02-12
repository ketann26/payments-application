import React from "react";

const Initials = ({ firstName, lastName, style }) => {
  const initials =
    (firstName ? firstName.charAt(0).toUpperCase() : "") +
    (lastName ? lastName.charAt(0).toUpperCase() : "");

  return (
    <div
      style={style}
      className="flex items-center justify-center bg-lime-300 text-lime-950 text-base rounded-full"
    >
      {initials}
    </div>
  );
};

export default Initials;
