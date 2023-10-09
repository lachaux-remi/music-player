import { createSlice } from "@reduxjs/toolkit";

import { MediaState, PlayingState } from "@/@types/State";

export const playingSlice = createSlice({
  name: "playing",
  initialState: MediaState.STOPPED as MediaState,
  reducers: {
    stop: () => MediaState.STOPPED,
    play: () => MediaState.PLAYING,
    pause: () => MediaState.PAUSED,
    playOrPause: (state: PlayingState) => {
      return state === MediaState.PLAYING ? MediaState.PAUSED : MediaState.PLAYING;
    }
  }
});

export const { stop, play, pause, playOrPause } = playingSlice.actions;

export default playingSlice.reducer;
