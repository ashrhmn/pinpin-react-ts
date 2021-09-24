import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import service from "../service";
import { refreshPinDataCountState } from "../store";
import { IpinData } from "../types";
import EditPinData from "./EditPinData";

const PinCard = ({ data }: { data: IpinData }) => {
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();

  const [refreshCount, setRefreshCount] = useRecoilState(
    refreshPinDataCountState
  );

  const deleteData = async ({ id }: { id: number }) => {
    try {
      const response = await service.delete(`/pindata/id/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const deleteDataMutation = useMutation(deleteData, {
    onMutate: async ({ id }: { id: number }) => {
      await queryClient.cancelQueries("pindata");
      const preData = queryClient.getQueryData<IpinData[]>("pindata");
      if (preData) {
        queryClient.setQueryData(
          "pindata",
          preData?.filter((data) => data.id != id)
        );
        return { preData };
      } else {
        return null;
      }
    },
    onError: (error, variable, context) => {
      console.log(error);
      queryClient.setQueryData("pindata", context?.preData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("pindata");
    },
  });

  return (
    <>
      {!editing ? (
        <div className="flex items-center justify-between text-2xl mt-4 mb-4 p-2 bg-blue-600 text-white rounded-lg">
          <div className="flex flex-col w-2/3">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
          </div>
          <div className="flex flex-col w-1/3">
            <p className="break-words text-center">{data.secret}</p>
            <div className="flex justify-evenly">
              <button onClick={() => setEditing(true)}>
                <EditButton />
              </button>
              <button onClick={() => deleteDataMutation.mutate(data)}>
                <DeleteButton />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EditPinData data={data} setEditing={setEditing} />
      )}
    </>
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
