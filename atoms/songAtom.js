import { atom } from "recoil";

export const currentTrackState = atom({
  key: "currentTrackState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
