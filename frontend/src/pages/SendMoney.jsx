import React, { useState } from "react";

import Initials from "../components/Initials";
import InputBox from "../components/InputBox";

import axios from "axios";

const SendMoney = ({ toUser, onClose, setShowModal }) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex flex-col justify-center items-center border rounded-lg w-3/12 mx-auto bg-white px-8 py-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl">
      <h1 className="font-bold text-3xl pb-10">Send Money</h1>
      <div className="w-full">
        <div className="flex items-center">
          <Initials
            firstName={toUser.firstName}
            lastName={toUser.lastName}
            style={{ height: "48px", width: "48px" }}
          />
          <h1 className="text-xl font-semibold ml-4">
            {toUser.firstName} {toUser.lastName}
          </h1>
        </div>
        <InputBox
          input={"Amount (in ₹)"}
          placeholder={"Enter Amount"}
          onchange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button
          className="w-full my-1 p-2 rounded-md bg-lime-500 text-white font-medium"
          onClick={() => {
            axios
              .post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: toUser._id,
                  amount: amount,
                },
                {
                  headers: {
                    Authorization: `Bearer ${sessionStorage.accessToken}`,
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                setShowModal(false);
                alert("Transfer successful");
              });
          }}
        >
          Transfer Money
        </button>
        <button
          onClick={onClose}
          className="absolute flex items-center justify-center top-4 right-4 bg-red-500 rounded-full px-2 text-white font-bold leading-6"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default SendMoney;
