import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import tw from "tailwind-styled-components";
import {
  authUserState,
  baseUrlState,
  messageState,
  showMessage,
  tokenState,
} from "../store";
import Grid from "../svg/Grid.svg";

const Nav = () => {
  const baseUrl = useRecoilValue(baseUrlState);
  const authUser = useRecoilValueLoadable(authUserState);
  switch (authUser.state) {
    case "hasValue":
      if (authUser.contents?.isLoggedIn) {
        return (
          <Container>
            <div>
              <Link to={baseUrl}>
                <NavButton>Home</NavButton>
              </Link>
            </div>
            <RightContainer>
              <Link to={baseUrl + "dashboard"}>
                <NavButton>
                  <GridIcon />
                  <p>Dashboard</p>
                </NavButton>
              </Link>
              <LogOutButton />
            </RightContainer>
          </Container>
        );
      } else {
        return (
          <Container>
            <div>
              <Link to={baseUrl}>
                <NavButton>Home</NavButton>
              </Link>
            </div>
            <RightContainer>
              {/* <Link to={baseUrl + "signup"}>
                <NavButton>SignUp</NavButton>
              </Link> */}
              <Link to={baseUrl + "login"}>
                <NavButton>Login</NavButton>
              </Link>
            </RightContainer>
          </Container>
        );
      }
    case "loading":
      return <>Loading...</>;
    case "hasError":
      localStorage.removeItem('authToken')
      return (
        <>
          <h1 className="text-red-600">
            Error loading Conditional Nav, showing all routes
          </h1>
          <Container>
            <div>
              <Link to={baseUrl}>
                <NavButton>Home</NavButton>
              </Link>
            </div>
            <RightContainer>
              <Link to={baseUrl + "signup"}>
                <NavButton>SignUp</NavButton>
              </Link>
              <Link to={baseUrl + "login"}>
                <NavButton>Login</NavButton>
              </Link>
              <Link to={baseUrl + "dashboard"}>
                <NavButton>Dashboard</NavButton>
              </Link>
            </RightContainer>
          </Container>
        </>
      );
  }
};

export default Nav;

const Container = tw.div`flex justify-between mt-4`;

const RightContainer = tw.div`flex space-x-3`;

const NavButton = tw.button`bg-blue-700 text-white rounded hover:bg-blue-900 transition-all px-2 py-1 flex items-center space-x-1`;

const GridIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const LogOutButton = () => {
  const [, setToken] = useRecoilState(tokenState);
  const [, setMessage] = useRecoilState(messageState);
  return (
    <NavButton
      onClick={() => {
        localStorage.removeItem("authToken");
        setToken(null);
        showMessage("Logged out", setMessage);
      }}
    >
      Logout
    </NavButton>
  );
};
