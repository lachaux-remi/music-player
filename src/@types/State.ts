import { store } from "@/stores/store";

export type RootState = ReturnType<typeof store.getState>;

/**
 * Playlist
 */
export type PlaylistUUID = string;
export type PlaylistName = string;
export type PlaylistTracks = TrackUUID[];
export type Playlist = { uuid: PlaylistUUID; name: PlaylistName; tracks: PlaylistTracks };
export type PlaylistsState = Playlist[];
export type NewPlaylist = { name: PlaylistName; tracks?: PlaylistTracks };
export type TracksPlaylist = { uuid: PlaylistUUID; tracks: PlaylistTracks };
export type RenamePlaylist = { uuid: PlaylistUUID; newName: string };

/**
 * Track
 */
export type TrackUUID = string;
export type Track = {
  uuid: TrackUUID;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  path: string;
};
export type TracksState = Track[];

/**
 * Playing
 */
export enum MediaState {
  STOPPED = 0,
  PLAYING = 1,
  PAUSED = 2
}

export type PlayingState = MediaState;

/**
 * Settings
 */
export type VolumeSettings = { level: number; muted: boolean };

export enum RepeatMode {
  NONE = 0,
  ALL = 1,
  ONE = 2
}

export type SettingsState = { volume: VolumeSettings; shuffle: boolean; repeat: RepeatMode };

/**
 * Queue
 */
export type TimeSettings = { currentTime: number; forced?: boolean };
export type QueueState = {
  currentTime: TimeSettings["currentTime"];
  currentTrack?: Track;
  tracks: Track[];
};
