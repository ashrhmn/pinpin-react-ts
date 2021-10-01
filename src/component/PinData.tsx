import React, { useState } from "react";
import { useQuery } from "react-query";
import service from "../service";
import { IpinData } from "../types";
import AddPinData from "./AddPinData";
import PinCard from "./PinCard";

const PinData = ({ isBin = false }: { isBin: boolean }) => {
  const pinDataQuery = useQuery(`pindata${isBin ? "bin" : ""}`, () =>
    service
      .get(`/pindata/${isBin ? "bin/" : ""}`, {
        headers: { authToken: localStorage.getItem("authToken") },
      })
      .then((response) => response.data)
  );

  switch (pinDataQuery.status) {
    case "loading":
      return <>Loading...</>;
    case "error":
      return <>Error Loading PinData...</>;
    case "success":
      return (
        <>
          {pinDataQuery.data.map((data: IpinData) => (
            <PinCard
              key={
                data.id +
                data.name +
                data.description +
                data.secret +
                data.isFavourite +
                data.isTrashed +
                data.createdDate +
                data.updatedDate
              }
              data={data}
            />
          ))}
        </>
      );
    case "idle":
      return <>Query Idle...</>;
  }
};

export default PinData;
