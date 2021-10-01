import React, { useState } from "react";
import { Redirect } from "react-router";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import tw from "tailwind-styled-components";
import { authUserState, baseUrlState, isAddingNewData } from "../store";
import AddPinData from "./AddPinData";
import PinData from "./PinData";

const Dashboard = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const authUser = useRecoilValueLoadable(authUserState);

  const [viewBin, setViewBin] = useState(false);

  switch (authUser.state) {
    case "hasValue":
      if (authUser.contents?.isLoggedIn) {
        return (
          <div>
            <h1>{authUser.contents?.user.username}</h1>
            <div className="flex justify-center text-2xl text-white m-2">
              <NavBtn
                className="rounded-tl-2xl rounded-bl-2xl"
                $active={!viewBin}
                onClick={() => setViewBin(false)}
              >
                Data
              </NavBtn>
              <NavBtn
                className="rounded-tr-2xl rounded-br-2xl"
                $active={viewBin}
                onClick={() => setViewBin(true)}
              >
                Trashed
              </NavBtn>
            </div>
            {viewBin ? <BinView /> : <DataView />}
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

const NavBtn = tw.button<{ $active: boolean }>`w-32 pt-1 pb-1 focus:outline-none hover:bg-green-700 ${(p) =>
  p.$active ? "shadow-inner bg-green-700" : "shadow-none bg-green-600"}`;

const DataView = () => (
  <>
    <AddNewData />
    <PinData isBin={false} />
  </>
);

const BinView = () => <PinData isBin={true} />;

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
