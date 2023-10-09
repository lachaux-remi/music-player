import { Middleware } from "redux";

import { RootState, Track } from "@/@types/State";
import { removeTracks as removeTracksInPlaylist } from "@/stores/slices/playlistsReducer";
import { nextTrack, removeTracks as removeTracksInQueue } from "@/stores/slices/queueReducer";

const trackMiddleware: Middleware = store => next => action => {
  const state: RootState = store.getState();

  switch (action.type) {
    case "tracks/remove": {
      const tracks: Track[] = action.payload;

      // Remove the track from all playlists
      state.playlists.forEach(playlist => {
        store.dispatch(removeTracksInPlaylist({ uuid: playlist.uuid, tracks: tracks.map(track => track.uuid) }));
      });

      // remove the track from the queue
      store.dispatch(removeTracksInQueue(tracks));

      // If the track is the current track, go to the next track
      const currentTrack = state.queue.currentTrack;
      if (currentTrack && tracks.some(track => track.uuid === currentTrack.uuid)) {
        store.dispatch(nextTrack());
      }

      break;
    }
  }

  return next(action);
};

export default trackMiddleware;
