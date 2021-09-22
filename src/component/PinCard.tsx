import React from "react";
import { IpinData } from "../types";

const PinCard = ({ data }: { data: IpinData }) => {
  return (
    <div className="flex items-center justify-between text-2xl mt-4 mb-4">
      <div className="flex flex-col w-2/3">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
      </div>
      <div className="flex flex-col w-1/3">
        <p className="break-words text-center">{data.secret}</p>
        <div className="flex justify-evenly">
          <button>
            <EditButton />
          </button>
          <button>
            <DeleteButton />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinCard;

const DeleteButton = () => (
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
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const EditButton = () => (
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
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
