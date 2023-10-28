import { useSelector } from "react-redux";

import { RootState, Track } from "@/@types/State";

export type Playlist = {
  uuid: string;
  name: string;
  tracks: Track[];
};

type usePlaylistReturn = {
  getPlaylists: () => Playlist[];
  getPlaylist: (playlistUuid: string) => Playlist | undefined;
};

const usePlaylist = (): usePlaylistReturn => {
  const playlists = useSelector((state: RootState) => state.playlists);
  const tracks = useSelector((state: RootState) => state.tracks);

  const getPlaylists = () => {
    return playlists.map(playlist => {
      return {
        ...playlist,
        tracks: playlist.tracks.map(trackUuid => tracks.find(track => track.uuid === trackUuid) as Track)
      };
    });
  };

  const getPlaylist = (playlistUuid: string) => {
    const playlist = playlists.find(playlist => playlist.uuid === playlistUuid);
    if (!playlist) {
      return undefined;
    }

    return {
      ...playlist,
      tracks: playlist?.tracks.map(trackUuid => tracks.find(track => track.uuid === trackUuid) as Track)
    };
  };

  return {
    getPlaylists,
    getPlaylist
  };
};

export default usePlaylist;
