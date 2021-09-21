import React, { useState } from "react";
import { Redirect } from "react-router";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { authUserState, baseUrlState, messageState } from "../store";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import service from "../service";

const SignUp = () => {
  const authUser = useRecoilValueLoadable(authUserState);
  const baseUrl = useRecoilValue(baseUrlState);
  const [message, setMessage] = useRecoilState(messageState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSIgnUp = async () => {
    if (password != confirmPassword) return;
    const response = await service.post(`/auth/signup/`, {
      username,
      password,
      email,
      name,
    });
    console.log(response.data);
    setMessage(response.data.msg);
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  switch (authUser.state) {
    case "hasValue" || "hasError":
      if (authUser.contents?.isLoggedIn) {
        return <Redirect to={baseUrl + "dashboard"} />;
      } else {
        return (
          <div className="flex flex-col items-center">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <div>
              <SignUpButton onClick={handleSIgnUp}>Sign Up</SignUpButton>
            </div>
            <p>
              Already have an account?{" "}
              <Link to={baseUrl + "login"}>
                <span className="underline hover:text-blue-500 hover:no-underline transition-all">
                  Sign In
                </span>
              </Link>
            </p>
          </div>
        );
      }
    case "loading":
      return <div>Loading...</div>;
  }

  return <div>SignUp</div>;
};

export default SignUp;

const Input = tw.input`border-2 border-black w-60 m-2 p-2 rounded focus:outline-none`;
const Button = tw.button`transition-all rounded w-60 px-2 py-2 m-1`;
const SignUpButton = tw(Button)`bg-blue-600 text-white hover:bg-blue-700`;
