import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import Login from "./component/Login";
import MessageBox from "./component/MessageBox";
import Nav from "./component/Nav";
import SignUp from "./component/SignUp";
import { baseUrlState } from "./store";

const App = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  return (
    <StyledDiv className="">
      <BrowserRouter>
        <Nav />
        <div className="flex justify-center">
          <MessageBox />
        </div>
        <Switch>
          <Route exact path={baseUrl}>
            <Home />
          </Route>
          <Route path={baseUrl + "dashboard"}>
            <Dashboard />
          </Route>
          <Route path={baseUrl + "login"}>
            <Login />
          </Route>
          <Route path={baseUrl + "signup"}>
            <SignUp />
          </Route>
        </Switch>
      </BrowserRouter>
    </StyledDiv>
  );
};

export default App;

const StyledDiv = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 0 1rem;
`;
