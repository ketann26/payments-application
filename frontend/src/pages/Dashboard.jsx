import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Recipient from "../components/Recipient";
import SendMoney from "./SendMoney";

import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState({});
  const [balance, setBalance] = useState(0);
  const [toUser, setToUser] = useState({});
  const [filter, setFilter] = useState("");

  const [showModal, setShowModal] = useState(false);

  const token = sessionStorage.accessToken;
  const userId = sessionStorage.userId;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUsers(res.data.filter((obj) => obj._id != userId));
      });
  }, [filter]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/user/${userId}`).then((res) => {
      setCurrUser(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setBalance(res.data.balance);
      });
  }, []);

  const handleOpenModal = (toUserId) => {
    setShowModal(true);
    axios.get(`http://localhost:3000/api/v1/user/${toUserId}`).then((res) => {
      setToUser(res.data);
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full h-full bg-white">
      <Navbar firstName={currUser.firstName} lastName={currUser.lastName} />
      <div className={`w-8/12 mx-auto mt-10 ${showModal ? "blur-xs" : ""}`}>
        <div className="mb-5">
          <span className="text-xl font-bold mr-8">Your Balance</span>
          <span className="text-xl font-medium">₹{balance}</span>
        </div>
        <div className="mb-5">
          <span className="text-xl font-bold">Users</span>
        </div>
        <input
          type="text"
          className="w-full py-1 px-2 border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search users..."
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="my-5">
          {users.map((user) => {
            return (
              <Recipient
                key={user._id}
                user={user}
                handleOpenModal={handleOpenModal}
              />
            );
          })}
        </div>
      </div>
      {showModal && (
        <SendMoney
          toUser={toUser}
          onClose={handleCloseModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
