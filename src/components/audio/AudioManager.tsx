import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RepeatMode, RootState } from "@/@types/State";
import { audio } from "@/stores/middlewares/audioMiddleware";
import { play, stop } from "@/stores/slices/playingReducer";
import { setCurrentTime, setCurrentTrack } from "@/stores/slices/queueReducer";

const AudioManager = () => {
  const dispatch = useDispatch();
  const { currentTime, currentTrack, tracks } = useSelector((state: RootState) => state.queue);
  const { volume, repeat } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    audio.src = currentTrack?.path || "";
    audio.currentTime = currentTime;
    audio.volume = volume.level / 100;
    audio.muted = volume.muted;
    audio.ontimeupdate = () => {
      dispatch(setCurrentTime({ currentTime: Math.trunc(audio.currentTime) }));
    };
  }, []);

  useEffect(() => {
    audio.onended = () => {
      const index = tracks.findIndex(track => track.uuid === currentTrack?.uuid);

      if (repeat === RepeatMode.ONE) {
        dispatch(setCurrentTime({ currentTime: 0 }));
        dispatch(play());
      } else if (index < tracks.length - 1) {
        dispatch(setCurrentTime({ currentTime: 0 }));
        dispatch(setCurrentTrack(tracks[index + 1]));
        dispatch(play());
      } else if (repeat === RepeatMode.ALL) {
        dispatch(setCurrentTime({ currentTime: 0 }));
        dispatch(setCurrentTrack(tracks[0]));
        dispatch(play());
      } else {
        dispatch(stop());
      }
    };
  }, [repeat, tracks, currentTrack]);

  return null;
};

export default AudioManager;
