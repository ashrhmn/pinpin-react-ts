import React from "react";
import { useRecoilState } from "recoil";
import { countState } from "../store";

const Comp2 = () => {
  const [count, setCount] = useRecoilState(countState);
  return (
    <div>
      <h1>Comp2</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Inc</button>
      <button onClick={() => setCount(count - 1)}>Dec</button>
    </div>
  );
};

export default Comp2;
