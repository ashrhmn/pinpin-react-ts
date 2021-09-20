import { atom } from "recoil";
import { User } from "../types";

export const countState = atom({
  key: "countState",
  default: 0,
});

export const authUserState = atom({
  key: "authUserState",
  default: null,
});

export const usersState = atom({
  key: "usersState",
  default: [{id:1,name:'Ashik'},{id:2,name:'Ash'}] as User[],
});
