export interface IauthUser {
  isLoggedIn: boolean;
  msg: string;
  user: IjwtPayload;
}

export interface IjwtPayload {
  username: string;
  iat: number;
}

export interface IpinData {
  id: number;
  name: string;
  username: string;
  description: string;
  secret: string;
  createdDate: string;
  updatedDate: string;
}
