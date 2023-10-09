import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import { NewPlaylist, Playlist, PlaylistUUID, PlaylistsState, RenamePlaylist, TracksPlaylist } from "@/@types/State";

export const playlistsSlice = createSlice({
  name: "playlists",
  initialState: [] as PlaylistsState,
  reducers: {
    add: (state: PlaylistsState, action: PayloadAction<NewPlaylist>) => {
      const playlist: Playlist = { uuid: uuid(), name: action.payload.name, tracks: action.payload.tracks || [] };
      state.push(playlist);
    },

    remove: (state: PlaylistsState, action: PayloadAction<PlaylistUUID>) => {
      return state.filter(playlist => playlist.uuid !== action.payload);
    },

    rename: (state: PlaylistsState, action: PayloadAction<RenamePlaylist>) => {
      const playlist = state.find(playlist => playlist.uuid === action.payload.uuid);
      if (!playlist) {
        throw new Error("Playlist not found");
      }
      playlist.name = action.payload.newName;
    },

    addTracks: (state: PlaylistsState, action: PayloadAction<TracksPlaylist>) => {
      const playlist = state.find(playlist => playlist.uuid === action.payload.uuid);
      if (!playlist) {
        throw new Error("Playlist not found");
      }

      playlist.tracks = [...new Set([...playlist.tracks, ...action.payload.tracks])];
    },

    removeTracks: (state: PlaylistsState, action: PayloadAction<TracksPlaylist>) => {
      const playlist = state.find(playlist => playlist.uuid === action.payload.uuid);
      if (!playlist) {
        throw new Error("Playlist not found");
      }
      playlist.tracks = playlist.tracks.filter(t => !action.payload.tracks.includes(t));
    }
  }
});

export const { add, remove, rename, addTracks, removeTracks } = playlistsSlice.actions;

export default playlistsSlice.reducer;
