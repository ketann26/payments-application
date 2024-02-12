import React from "react";

import Initials from "./Initials";

const Navbar = ({ firstName, lastName }) => {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b-2">
      <div className="text-2xl font-bold tracking-tight">Payments App</div>
      <div className="flex items-center">
        <div className="font-medium tracking-tight mr-4">
          Hello, {firstName}
        </div>
        <Initials
          firstName={firstName}
          lastName={lastName}
          style={{ height: "40px", width: "40px" }}
        />
      </div>
    </div>
  );
};

export default Navbar;
