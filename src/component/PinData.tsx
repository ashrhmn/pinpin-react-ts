import React from "react";
import { IpinData } from "../types";
import PinCard from "./PinCard";

const PinData = ({ pinData }: { pinData: IpinData[] }) => {
  return (
    <div>
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
