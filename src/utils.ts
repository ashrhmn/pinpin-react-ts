import { IpinData } from "./types";

export const sortByName = (
  a: IpinData | InewPinData,
  b: IpinData | InewPinData
) => {
  //   if (!a.name) return -1;
  //   if (!b.name) return 1;
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0;
};

export const sortByFav = (
  a: IpinData | InewPinData,
  b: IpinData | InewPinData
) => {
  if (a.isFavourite && !b.isFavourite) return -1;
  if (!a.isFavourite && b.isFavourite) return 1;
  return 0;
};

interface InewPinData {
  name: string;
  description: string | null;
  secret: string;
  isFavourite?: boolean;
}
