import React from "react";
import { Redirect } from "react-router";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  authUserState,
  baseUrlState,
  pinDataState,
  tokenState,
} from "../store";
import { IpinData } from "../types";

const Dashboard = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const authUser = useRecoilValueLoadable(authUserState);
  const pinData = useRecoilValueLoadable(pinDataState);
  const [token, setToken] = useRecoilState(tokenState);
  switch (authUser.state) {
    case "hasValue":
      if (authUser.contents?.isLoggedIn) {
        return (
          <div>
            <h1>{authUser.contents?.user.username}</h1>
            {pinData.state == "hasValue" ? (
              pinData.contents?.map((data: IpinData) => (
                <li
                  key={
                    data.id +
                    data.name +
                    data.description +
                    data.secret +
                    data.createdDate +
                    data.updatedDate
                  }
                >
                  {data.name + " " + data.description + " " + data.secret}
                </li>
              ))
            ) : (
              <>Loading PinData...</>
            )}
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
