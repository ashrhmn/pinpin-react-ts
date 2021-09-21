import React from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../store";

const Home = () => {
  const history = useHistory();
  const baseUrl = useRecoilValue(baseUrlState);
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => history.push(baseUrl + "login")}>Go Login</button>
    </div>
  );
};

export default Home;
