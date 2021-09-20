import React from "react";

import tw from "tailwind-styled-components";
import styled from "styled-components";
import { User } from "../types";
import LoopComp from "./LoopComp";

const WillGenerateDataWithLoop = ({
  users,
  count,
}: {
  count: number;
  users: User[];
}) => {
  return (
    <div>
      <p>Count : {count}</p>

      <StyledDiv>Hello</StyledDiv>
      <VanillaStyledDiv>anillaa</VanillaStyledDiv>
      {users.map((user) => (
        <LoopComp user={user} />
      ))}
    </div>
  );
};

export default WillGenerateDataWithLoop;

const StyledDiv = tw.div`bg-blue-400`;

const VanillaStyledDiv = styled.div`
  background-color: #0366d6;
`;
