import { atom } from "recoil";

export const playlistAtom = atom({
  key: "playlistAtomState",
  default: null,
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "61e0bdce6a9d484e901b0003a1805213",
});
