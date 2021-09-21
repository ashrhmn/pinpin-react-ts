import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import Login from "./component/Login";
import Nav from "./component/Nav";
import SignUp from "./component/SignUp";
import { baseUrlState, messageState } from "./store";

const App = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const message = useRecoilValue(messageState);
  return (
    <StyledDiv>
      <h1>{baseUrl}</h1>
      <h1>{message}</h1>
      <BrowserRouter>
        <Nav />
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
  max-width: 500px;
  margin: 0 auto;
`;
