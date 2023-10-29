import { Middleware } from "redux";

export const shufflerMiddleware: Middleware = store => next => action => {
  const state = store.getState();

  if (action.type === "settings/setShuffle" && state.settings.shuffle !== action.payload) {
    /* empty */
  }

  return next(action);
};
