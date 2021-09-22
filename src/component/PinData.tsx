import React, { useState } from "react";
import { IpinData } from "../types";
import AddPinData from "./AddPinData";
import PinCard from "./PinCard";

const PinData = ({ pinData }: { pinData: IpinData[] }) => {
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <button
        onClick={() => setAdding(!adding)}
        className="flex items-center bg-green-600 text-white rounded p-2"
      >
        <AddIcon />
        <p>Add New</p>
      </button>
      {adding ? <AddPinData /> : <></>}
      {pinData.map((data) => (
        <PinCard
          key={
            data.id +
            data.name +
            data.description +
            data.secret +
            data.createdDate +
            data.updatedDate
          }
          data={data}
        />
      ))}
    </div>
  );
};

export default PinData;

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
