import React from "react";

import Initials from "./Initials";
import { useEffect } from "react";

import axios from "axios";

const Recipient = ({ user, handleOpenModal }) => {
  const toUserId = user._id;

  // useEffect(() => {
  //   axios.get(`http://localhost:3000/api/v1/user/${toUserId}`).then((res) => {
  //     setToUser(res.data);
  //   });
  // }, []);

  return (
    <div className="flex justify-between my-3">
      <div className="flex items-center">
        <Initials
          firstName={user.firstName}
          lastName={user.lastName}
          style={{ height: "40px", width: "40px" }}
        />
        <span className="font-semibold ml-4">
          {user.firstName} {user.lastName}
        </span>
      </div>
      <button
        className="px-4 py-2 rounded-md bg-black text-white font-medium"
        onClick={() => handleOpenModal(user._id)}
      >
        Send Money
      </button>
    </div>
  );
};

export default Recipient;
