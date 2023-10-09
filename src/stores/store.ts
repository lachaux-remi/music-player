import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import audioMiddleware from "@/stores/middlewares/audioMiddleware";
import shufflerMiddleware from "@/stores/middlewares/shufflerMiddleware";
import trackMiddleware from "@/stores/middlewares/trackMiddleware";
import playingReducer from "@/stores/slices/playingReducer";
import playlistsReducer from "@/stores/slices/playlistsReducer";
import queueReducer from "@/stores/slices/queueReducer";
import settingsReducer from "@/stores/slices/settingsReducer";
import tracksReducer from "@/stores/slices/tracksReducer";

export const store = configureStore({
  reducer: persistReducer(
    {
      key: "music-player",
      storage,
      blacklist: ["playing"]
    },
    combineReducers({
      playing: playingReducer,
      playlists: playlistsReducer,
      queue: queueReducer,
      settings: settingsReducer,
      tracks: tracksReducer
    })
  ),
  middleware: [
    thunk,
    audioMiddleware,
    trackMiddleware,
    shufflerMiddleware,
    (store => next => action => {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.debug(store.getState(), action);
      }

      return next(action);
    }) as Middleware
  ]
});

export const persistor = persistStore(store);
