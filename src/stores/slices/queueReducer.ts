import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { QueueState, TimeSettings, Track } from "@/@types/State";

export const queueSlice = createSlice({
  name: "queue",
  initialState: {
    currentTime: 0,
    currentTrack: undefined as QueueState["currentTrack"],
    tracks: [] as QueueState["tracks"]
  },
  reducers: {
    setCurrentTime: (state: QueueState, action: PayloadAction<TimeSettings>) => {
      state.currentTime = action.payload.currentTime;
    },
    setCurrentTrack: (state: QueueState, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
    setTrack: (state: QueueState, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
      state.tracks = [action.payload];
    },
    addTracks: (state: QueueState, action: PayloadAction<Track[]>) => {
      state.tracks = [...state.tracks, ...action.payload.filter(track => !state.tracks.includes(track))];
    },
    addTracksToPlayNext: (state: QueueState, action: PayloadAction<Track[]>) => {
      state.tracks = state.tracks.filter(track => !action.payload.includes(track));

      const index = state.tracks.findIndex(track => track.uuid === state.currentTrack?.uuid);
      state.tracks.splice(index + 1, 0, ...action.payload);
    },
    removeTracks: (state: QueueState, action: PayloadAction<Track[]>) => {
      const tracksUUID = action.payload.map(track => track.uuid);
      state.tracks = state.tracks.filter(track => !tracksUUID.includes(track.uuid));
    },
    nextTrack: () => {},
    previousTrack: () => {}
  }
});

export const {
  setCurrentTime,
  setCurrentTrack,
  setTrack,
  addTracks,
  addTracksToPlayNext,
  removeTracks,
  nextTrack,
  previousTrack
} = queueSlice.actions;

export default queueSlice.reducer;
