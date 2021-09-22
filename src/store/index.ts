import { atom, selector } from "recoil";
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

export const refreshPinDataCountState = atom({
  key: "refreshPinDataCountState",
  default: 1,
});

export const pinDataState = selector<IpinData[]>({
  key: "pinDataState",
  get: async ({ get }) => {
    const token = get(tokenState);
    const refreshCount = get(refreshPinDataCountState);
    if (token && refreshCount) {
      try {
        const response = await service.get(`/pindata/`, {
          headers: { authToken: token },
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  },
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
