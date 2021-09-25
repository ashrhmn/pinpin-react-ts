import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  authUserState,
  baseUrlState,
  messageState,
  messageTimeoutIdState,
  showMessage,
  tokenState,
} from "../store";
import tw from "tailwind-styled-components";
import service from "../service";
import { Link } from "react-router-dom";

const Login = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authUser = useRecoilValueLoadable(authUserState);
  const [, setToken] = useRecoilState(tokenState);
  const [, setMessage] = useRecoilState(messageState);
  const [timeOutId, setTimeoutId] = useRecoilState(messageTimeoutIdState);
  const loginHandler = async () => {
    try {
      const response = await service.post(`auth/login/`, {
        username,
        password,
      });
      console.log(response.data);
      showMessage(response.data.msg, setMessage);
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        setToken(response.data.token);

        // clearTimeout(timeOutId);
        // setMessage(response.data.msg);
        // setTimeoutId(
        //   setTimeout(() => {
        //     setMessage(null);
        //     clearTimeout(timeOutId);
        //   }, 2)
        // );
      } else {
        localStorage.removeItem("authToken");
        setToken(null);
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("authToken");
      setToken(null);
    }
  };

  switch (authUser.state) {
    case "hasValue" || "hasError":
      if (authUser.contents?.isLoggedIn) {
        return <Redirect to={baseUrl + "dashboard"} />;
      } else {
        return (
          <div>
            <div className="flex flex-col">
              <div className="flex flex-col items-center">
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  placeholder="Username"
                />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="flex justify-center">
                <LoginButton onClick={loginHandler}>Sign In</LoginButton>
                <SignUpButton>
                  <Link to={baseUrl + "signup"}>Sign Up</Link>
                </SignUpButton>
              </div>
            </div>
          </div>
        );
      }
    case "loading":
      return <div>Loading...</div>;
    case "hasError":
      return <div>Error loading...</div>;
  }
};

export default Login;

const Input = tw.input`border-2 border-black w-60 m-2 p-2 rounded focus:outline-none`;
const Button = tw.button`transition-all rounded px-2 w-20 py-1 m-1`;
const LoginButton = tw(Button)`bg-blue-600 text-white hover:bg-blue-700`;
const SignUpButton = tw(
  Button
)`bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600`;
