import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RepeatMode, SettingsState, VolumeSettings } from "@/@types/State";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    volume: {
      level: 50,
      muted: false
    },
    shuffle: false,
    repeat: RepeatMode.NONE
  },
  reducers: {
    setVolume: (state: SettingsState, action: PayloadAction<VolumeSettings>) => {
      state.volume = action.payload;
    },
    toggleShuffle: (state: SettingsState) => {
      state.shuffle = !state.shuffle;
    },
    switchRepeat: (state: SettingsState) => {
      state.repeat = (state.repeat + 1) % 3;
    }
  }
});

export const { setVolume, toggleShuffle, switchRepeat } = settingsSlice.actions;

export default settingsSlice.reducer;
