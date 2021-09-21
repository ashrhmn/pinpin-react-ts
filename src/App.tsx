import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import Login from "./component/Login";
import Nav from "./component/Nav";
import { baseUrlState } from "./store";

const App = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  return (
    <>
      <h1>{baseUrl}</h1>
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
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
