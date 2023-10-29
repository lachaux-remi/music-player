import { Middleware } from "redux";

import { MediaState, RootState } from "@/@types/State";
import { play } from "@/stores/slices/playingReducer";

export const audio = new Audio();

export const audioMiddleware: Middleware = store => next => async action => {
  const state: RootState = store.getState();

  switch (action.type) {
    case "queue/setCurrentTime": {
      if (action.payload.currentTime === state.queue.currentTime) {
        return;
      }

      if (action.payload.forced === true) {
        audio.currentTime = action.payload.currentTime;
      }
      break;
    }
    case "queue/setTrack":
    case "queue/setCurrentTrack": {
      if (action.payload !== null) {
        audio.src = action.payload.path;
        audio.currentTime = 0;
        store.dispatch(play());
      }
      break;
    }
    case "queue/nextTrack": {
      break;
    }
    case "queue/previousTrack": {
      break;
    }
    case "playing/play": {
      await audio.play();
      break;
    }
    case "playing/pause": {
      audio.pause();
      break;
    }
    case "playing/playOrPause": {
      if (state.queue.currentTrack === undefined) {
        return;
      }

      if (state.playing !== MediaState.PLAYING) {
        await audio.play();
      } else {
        audio.pause();
      }
      break;
    }
    case "settings/setVolume": {
      audio.volume = action.payload.level / 100;
      audio.muted = action.payload.muted;
      break;
    }
  }

  return next(action);
};
