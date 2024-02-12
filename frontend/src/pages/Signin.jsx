import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";

const Signin = () => {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <div className="bg-white rounded-lg p-5 flex flex-col items-center gap-4 w-3/12 mx-auto mt-24">
      <Heading label={"Sign In"} />
      <SubHeading subtext={"Enter your credentials to access your account"} />
      <div className="w-11/12">
        <InputBox
          input={"Email"}
          placeholder={"Email"}
          onchange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <InputBox
          input={"Password"}
          placeholder={"Password"}
          onchange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button
          className="w-full my-1 p-2 rounded-md bg-black text-white font-medium"
          onClick={async () => {
            const res = await axios.post(
              "http://localhost:3000/api/v1/user/signin",
              {
                username: loginEmail,
                password: loginPassword,
              }
            );

            const token = res.data.token;
            const userId = res.data.userId;

            sessionStorage.setItem("accessToken", token);
            sessionStorage.setItem("userId", userId);

            navigate("/dashboard");
          }}
        >
          Sign In
        </button>
      </div>
      <p className="font-medium text-sm">
        Don't have an account?{" "}
        <Link className="pointer underline" to={"/signup"}>
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Signin;
