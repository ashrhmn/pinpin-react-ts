import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import service from "../service";
import { isAddingNewData, messageState, showMessage } from "../store";
import { IpinData } from "../types";

const AddPinData = () => {
  const queryClient = useQueryClient();
  const [, setAdding] = useRecoilState(isAddingNewData);
  const [, setMessage] = useRecoilState(messageState);
  const [localPinData, setLocalPinData] = useState<IpinData>({
    id: 0,
    username: "",
    name: "",
    description: "",
    secret: "",
    createdDate: "",
    updatedDate: "",
  });

  const saveNewData = async ({ name, description, secret }: INewData) => {
    try {
      const response = await service.post(
        `/pindata/`,
        {
          name,
          description: description == "" ? null : description,
          secret: secret == "" ? null : secret,
        },
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const addNewDataMutation = useMutation(saveNewData, {
    onMutate: async ({ name, description, secret }: INewData) => {
      setAdding(false);
      setMessage("Saving New Data");
      console.log({ name, description, secret });
      await queryClient.cancelQueries("pindata");
      const preData = queryClient.getQueryData<IpinData[]>("pindata");
      console.log(preData);

      if (preData) {
        queryClient.setQueryData("pindata", [
          ...preData,
          { name, description, secret },
        ]);
        return { preData };
      } else {
        queryClient.setQueryData("pindata", []);
        return null;
      }
    },
    onError: (error, _variable, context) => {
      showMessage("Saving Error", setMessage);
      console.log(error);
      queryClient.setQueryData("pindata", context?.preData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("pindata");
    },
    onSuccess: () => {
      showMessage("Saved Successfully", setMessage);
    },
  });

  return (
    <Container>
      <InputContainer>
        <InputLabel>Name :</InputLabel>
        <Input
          value={localPinData.name}
          onChange={(e) =>
            setLocalPinData({ ...localPinData, name: e.target.value })
          }
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>Description :</InputLabel>
        <Input
          value={localPinData.description ? localPinData.description : ""}
          onChange={(e) =>
            setLocalPinData({ ...localPinData, description: e.target.value })
          }
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>Secret :</InputLabel>
        <Input
          value={localPinData.secret}
          onChange={(e) =>
            setLocalPinData({ ...localPinData, secret: e.target.value })
          }
        />
      </InputContainer>
      <ButtonContainer>
        <Button onClick={() => addNewDataMutation.mutate(localPinData)}>
          <SaveIcon />
          <p>Save</p>
        </Button>
        <Button onClick={() => setAdding(false)}>
          <CancelIcon />
          <p>Cancel</p>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default AddPinData;

const ButtonContainer = tw.div`flex w-full justify-evenly mt-2`;
const Container = tw.div`flex flex-col items-center p-2 bg-green-600 rounded-lg text-lg mt-2 mb-2`;
const Button = tw.button`text-green-100 bg-blue-700 rounded w-32 pl-5 pr-5 pt-2 pb-2 flex items-center space-x-2 justify-center`;
const InputLabel = tw.h1`text-white`;
const InputContainer = tw.div`flex items-center justify-between space-x-2 w-full`;
const Input = tw.input`border-2 border-green-700 rounded focus:outline-none p-1 mt-1 mb-1 w-60`;
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

const CancelIcon = () => (
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
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

interface INewData {
  name: string;
  description: string | null;
  secret: string;
}
