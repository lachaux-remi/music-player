import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Track, TracksState } from "@/@types/State";

export const tracksSlice = createSlice({
  name: "tracks",
  initialState: [] as Track[],
  reducers: {
    add: (state: TracksState, action: PayloadAction<Track>) => {
      if (state.find(track => track.uuid === action.payload.uuid)) {
        return;
      }
      state.push(action.payload);
    },

    remove: (state: TracksState, action: PayloadAction<Track[]>) => {
      const tracksUUID = action.payload.map(track => track.uuid);
      return state.filter(track => !tracksUUID.includes(track.uuid));
    }
  }
});

export const { add, remove } = tracksSlice.actions;

export default tracksSlice.reducer;
