import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-white rounded-lg p-5 flex flex-col items-center gap-4 w-3/12 mx-auto mt-16">
      <Heading label={"Sign Up"} />
      <SubHeading subtext={"Enter your information to create an account"} d />
      <div action="" className="w-11/12">
        <InputBox
          input={"First Name"}
          placeholder={"John"}
          onchange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <InputBox
          input={"Last Name"}
          placeholder={"Doe"}
          onchange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <InputBox
          input={"Email"}
          placeholder={"johndoe@example.com"}
          onchange={(e) => {
            console.log("email", e.target.value);
            setEmail(e.target.value);
          }}
        />
        <InputBox
          input={"Password"}
          onchange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="w-full my-1 p-2 rounded-md bg-black text-white font-medium"
          onClick={() => {
            axios.post("http://localhost:3000/api/v1/user/signup", {
              username: email,
              firstName: firstName,
              lastName: lastName,
              password: password,
            });

            navigate("/signin");
          }}
        >
          Sign Up
        </button>
      </div>
      <p className="font-medium text-sm">
        Already have an account?{" "}
        <Link className="pointer underline" to={"/signin"}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
