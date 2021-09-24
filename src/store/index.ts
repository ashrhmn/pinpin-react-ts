import { atom, selector, useRecoilState } from "recoil";
import service from "../service";
import { IauthUser, IpinData } from "../types";

export const authUserState = selector<IauthUser | null>({
  key: "authUserState",
  get: async ({ get }) => {
    const token = get(tokenState);
    if (token) {
      try {
        const authUserResponse = await service.get(`auth/authUser`, {
          headers: {
            authToken: token,
          },
        });
        console.log(authUserResponse.data);
        return authUserResponse.data;
      } catch (error) {
        throw error;
      }
    } else {
      return { isLoggedIn: false, user: null, msg: "Not logged in" };
    }
  },
});

export const isAddingNewData = atom<boolean>({
  key: "isAddingNewData",
  default: false,
});

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: localStorage.getItem("authToken"),
});

export const baseUrlState = atom<string>({
  key: "baseUrlState",
  default: "/pinpin-react-ts/",
});

export const messageState = atom<string | null>({
  key: "messageState",
  default: null,
});

export const messageTimeoutIdState = atom({
  key: "messageTimeoutIdState",
  default: 0,
});

export const showMessage = (
  msg: string,
  setMessage: Function,
  timeout = 2000
) => {
  setMessage(msg);
  console.log("Showing Message : ", msg);
  const timeOutId = setTimeout(() => {
    setMessage(null);
    console.log("Closing Message : ", msg);
    console.log("tout id : ", timeOutId);
    clearTimeout(timeOutId);
  }, timeout);
};
