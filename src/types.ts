export interface User {
  id: number;
  name: string;
}
export interface IauthUser {
  isLoggedIn: boolean;
  msg: string;
  user: IjwtPayload;
}

export interface IjwtPayload {
  username: string;
  iat: number;
}
