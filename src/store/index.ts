import { atom, selector } from "recoil";
import service from "../service";
import { IauthUser, User } from "../types";

export const countState = atom({
  key: "countState",
  default: 0,
});



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
        // if (authUserResponse.data.isLoggedIn) {
        //   return authUserResponse.data;
        // } else {
        //   return null;
        // }
        return authUserResponse.data;
      } catch (error) {
        // console.log(error);
        // return null;
        throw error;
      }
    } else {
      return { isLoggedIn: false, user: null, msg: "Not logged in" };
    }
  },
});

// export const authUserState = selector({
//   key: "authUserState",
//   get: async ({ get }) => {
//     try {
//       const token = get(tokenState);
//       const response = await service.get(`auth/authUser`, {
//         headers: {
//           authToken: token,
//         },
//       });
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   },
// });

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
});

export const baseUrlState = atom<string>({
  key: "baseUrlState",
  default: "/pinpin-react-ts/",
});

export const usersState = atom<User[]>({
  key: "usersState",
  default: [
    { id: 1, name: "Ashik" },
    { id: 2, name: "Ash" },
  ],
});
