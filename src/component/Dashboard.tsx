import React from "react";
import { Redirect } from "react-router";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  authUserState,
  baseUrlState,
  isAddingNewData,
  messageState,
  showMessage,
  tokenState,
} from "../store";
import AddPinData from "./AddPinData";
import PinData from "./PinData";

const Dashboard = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const authUser = useRecoilValueLoadable(authUserState);
  switch (authUser.state) {
    case "hasValue":
      if (authUser.contents?.isLoggedIn) {
        return (
          <div>
            <h1>{authUser.contents?.user.username}</h1>
            <AddNewData />
            <PinData />
            {/* <LogOutButton /> */}
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

// const LogOutButton = () => {
//   const [, setToken] = useRecoilState(tokenState);
//   const [, setMessage] = useRecoilState(messageState);
//   return (
//     <button
//       onClick={() => {
//         localStorage.removeItem("authToken");
//         setToken(null);
//         showMessage("Logged out", setMessage);
//       }}
//     >
//       Logout
//     </button>
//   );
// };

const AddNewData = () => {
  const [adding, setAdding] = useRecoilState(isAddingNewData);
  return (
    <>
      <button
        onClick={() => setAdding(!adding)}
        className="flex items-center bg-green-600 text-white rounded p-2"
      >
        <AddIcon />
        <p>Add New</p>
      </button>
      {adding ? <AddPinData /> : <></>}
    </>
  );
};

const AddIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
    />
  </svg>
);
