import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { messageState } from "../store";

const MessageBox = () => {
  const [message, setMessage] = useRecoilState(messageState);
  //   useEffect(() => {
  //     const timerId = setTimeout(() => {
  //       setMessage(null);
  //     }, 3000);
  //     clearTimeout(timerId);
  //   }, [message]);
  return (
    <div>
      {message ? (
        <div className="flex items-center space-x-3 bg-blue-700 rounded text-white justify-center shadow-2xl px-2 py-1 m-2 absolute bottom-2 right-2">
          <h1>{message}</h1>
          <button
            className="bg-red-700 text-white rounded-full"
            onClick={() => setMessage(null)}
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MessageBox;

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
