import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import service from "../service";
import { messageState, showMessage } from "../store";
import { IpinData } from "../types";
import { sortByFav, sortByName } from "../utils";
import EditPinData from "./EditPinData";

const PinCard = ({ data }: { data: IpinData }) => {
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();

  const [, setMessage] = useRecoilState(messageState);

  const deleteData = async ({ id }: { id: number }) => {
    try {
      const response = data.isTrashed
        ? await service.delete(`/pindata/id/${id}`, {
            headers: {
              authToken: localStorage.getItem("authToken"),
            },
          })
        : await service.put(`/pindata/toogleTrashed/${id}`, {
            headers: {
              authToken: localStorage.getItem("authToken"),
            },
          });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const toogleTrashed = async ({ id }: { id: number }) => {
    try {
      const response = await service.put(`/pindata/toogleTrashed/${id}`, {
        headers: {
          authToken: localStorage.getItem("authToken"),
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const toogleFavourite = async ({ id }: { id: number }) => {
    try {
      const response = await service.put(`/pindata/toogleFavourite/${id}`, {
        headers: {
          authToken: localStorage.getItem("authToken"),
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const toogleFavouriteMutation = useMutation(toogleFavourite, {
    onMutate: async ({ id }: { id: number }) => {
      setMessage("Toogling...");
      await queryClient.cancelQueries("pindata");
      const preData = queryClient.getQueryData<IpinData[]>("pindata");
      if (preData) {
        queryClient.setQueryData(
          "pindata",
          preData
            .map((data) => {
              if (data.id == id) {
                return { ...data, isFavourite: !data.isFavourite };
              } else {
                return data;
              }
            })
            .sort(sortByName)
            .sort(sortByFav)
        );
        return { preData };
      } else {
        return null;
      }
    },
    onError: (error, _variable, context) => {
      showMessage("Error toogling, reverting...", setMessage);
      console.log(error);
      queryClient.setQueryData("pindata", context?.preData);
    },
    onSuccess: () => {
      showMessage("Done", setMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries("pindata");
    },
  });

  const queryKey = data.isTrashed ? "pindatabin" : "pindata";

  const mutationOnMutate = async ({ id }: { id: number }) => {
    setMessage(data.isTrashed ? "Deleting..." : "Moving to bin...");
    await queryClient.cancelQueries(queryKey);
    const preData = queryClient.getQueryData<IpinData[]>(queryKey);
    if (preData) {
      queryClient.setQueryData(
        queryKey,
        preData.filter((data) => data.id != id)
      );
      return { preData };
    } else {
      return null;
    }
  };

  const deleteDataMutation = useMutation(deleteData, {
    onMutate: mutationOnMutate,
    onError: (error, _variable, context) => {
      showMessage(
        `Error ${
          data.isTrashed ? "deleting data" : "moving data to bin"
        }, reverting....`,
        setMessage
      );
      console.log(error);
      queryClient.setQueryData(queryKey, context?.preData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("pindatabin");
      queryClient.invalidateQueries("pindata");
    },
    onSuccess: () => {
      showMessage(
        (data.isTrashed ? "Deleted" : "Moved to bin") + " succesfully",
        setMessage
      );
    },
  });

  const toogleTrashedMutation = useMutation(toogleTrashed, {
    onMutate: async ({ id }: { id: number }) => {
      setMessage("Restoring...");
      await queryClient.cancelQueries(queryKey);
      const preData = queryClient.getQueryData<IpinData[]>(queryKey);
      if (preData) {
        queryClient.setQueryData(
          queryKey,
          preData.filter((data) => data.id != id)
        );
        return { preData };
      } else {
        return null;
      }
    },
    onError: (error, _variable, context) => {
      showMessage("Error restoring data, reverting....", setMessage);
      console.log(error);
      queryClient.setQueryData(queryKey, context?.preData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("pindatabin");
      queryClient.invalidateQueries("pindata");
    },
    onSuccess: () => {
      showMessage("Restored succesfully", setMessage);
    },
  });

  return (
    <>
      {!editing ? (
        <div
          className={`flex items-center justify-between text-2xl mt-4 mb-4 p-2 ${
            data.isTrashed ? "bg-red-600" : "bg-blue-600"
          } text-white rounded-lg shadow-lg`}
        >
          <div className="flex flex-col w-2/3">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
          </div>
          <div className="flex flex-col w-1/3">
            <p className="break-words text-center">{data.secret}</p>
            <div className="flex justify-evenly">
              {data.isTrashed ? (
                <>
                  <button onClick={() => toogleTrashedMutation.mutate(data)}>
                    <SaveIcon />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => toogleFavouriteMutation.mutate(data)}>
                    {data.isFavourite ? <FavIconFilled /> : <FavIcon />}
                  </button>
                  <button onClick={() => setEditing(true)}>
                    <EditIcon />
                  </button>
                </>
              )}
              <button onClick={() => deleteDataMutation.mutate(data)}>
                <DeleteIcon />
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

const SaveIcon = () => (
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
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    />
  </svg>
);

const DeleteIcon = () => (
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

const EditIcon = () => (
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

const FavIcon = () => (
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
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const FavIconFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
