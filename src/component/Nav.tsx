import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { baseUrlState } from "../store";

const Nav = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  return (
    <div>
      <Link to={baseUrl}>Home</Link>
      <Link to={baseUrl + "dashboard"}>Dashboard</Link>
      <Link to={baseUrl + "signup"}>SignUp</Link>
      <Link to={baseUrl + "login"}>Login</Link>
    </div>
  );
};

export default Nav;
