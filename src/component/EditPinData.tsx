import React, { useState } from "react";
import { IpinData } from "../types";
import tw from "tailwind-styled-components";
import service from "../service";
import { useRecoilState } from "recoil";
import { refreshPinDataCountState } from "../store";

const EditPinData = ({
  data,
  setEditing,
}: {
  data: IpinData;
  setEditing: Function;
}) => {
  const [localPinData, setLocalPinData] = useState<IpinData>(data);

  const [refreshCount, setRefreshCount] = useRecoilState(
    refreshPinDataCountState
  );

  const handleSaveEdits = async () => {
    try {
      const { id, name, description, secret } = localPinData;
      const response = await service.put(`/pindata/id/${id}`, {
        name,
        description,
        secret,
      });
      console.log(response.data);
      setRefreshCount(refreshCount + 1);
    } catch (error) {
      console.log(error);
    }
  };


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
          value={localPinData.description}
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
        <Button onClick={handleSaveEdits}>
          <SaveIcon />
          <p>Save</p>
        </Button>
        <Button onClick={() => setEditing(false)}>
          <CancelIcon />
          <p>Cancel</p>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default EditPinData;

const ButtonContainer = tw.div`flex w-full justify-evenly mt-2`;
const Container = tw.div`flex flex-col items-center p-2 bg-green-600 rounded-lg text-lg`;
const Button = tw.button`text-green-100 bg-blue-700 rounded w-32 pl-5 pr-5 pt-2 pb-2 flex items-center space-x-2 justify-center`;
const InputLabel = tw.h1`text-white`;
const InputContainer = tw.div`flex items-center justify-between space-x-2 w-full`;
const Input = tw.input`border-2 border-green-700 rounded focus:outline-none p-1 mt-1 mb-1`;
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
