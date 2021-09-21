import React from "react";
import { Redirect } from "react-router";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  authUserState,
  baseUrlState,
  tokenState,
} from "../store";

const Dashboard = () => {
  const baseUrl = useRecoilValue(baseUrlState);
//   const [authUser, setAuthUser] = useRecoilState(authUserState);
  const authUser = useRecoilValueLoadable(authUserState);
  const [token, setToken] = useRecoilState(tokenState);
  switch (authUser.state) {
    case "hasValue":
      if (authUser.contents?.isLoggedIn) {
        return (
          <div>
            <h1>{authUser.contents?.user.username}</h1>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                setToken(null);
              }}
            >
              Logout
            </button>
          </div>
        );
      } else {
        return <Redirect to={baseUrl + "login"} />;
      }
    case "loading":
      return <div>Loading...</div>;
    case "hasError":
      return <Redirect to={baseUrl + "login"} />;
  }
};

export default Dashboard;
