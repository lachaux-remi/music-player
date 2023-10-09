import {
  PauseRounded,
  PlayArrowRounded,
  RepeatOneRounded,
  RepeatRounded,
  ShuffleRounded,
  SkipNextRounded,
  SkipPreviousRounded
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ipcRenderer } from "electron";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PlayerActionType } from "@/@types/MusicPlayer";
import { MediaState, RepeatMode, RootState } from "@/@types/State";
import IconButtonBordered from "@/components/@extends/IconButtonBordered";
import IconButtonToggle from "@/components/@extends/IconButtonToggle";
import { playOrPause } from "@/stores/slices/playingReducer";
import { switchRepeat, toggleShuffle } from "@/stores/slices/settingsReducer";

import "./Controls.scss";

const Controls = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.playing);
  const { shuffle, repeat } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    ipcRenderer.on("media", (_, action: PlayerActionType) => {
      switch (action) {
        case "play-pause":
          dispatch(playOrPause());
          break;
        case "previous":
          break;
        case "next":
          break;
      }
    });

    return () => {
      ipcRenderer.removeAllListeners("media");
    };
  });

  const playOrPauseIcon = (): ReactElement => {
    switch (status) {
      case MediaState.PAUSED:
      case MediaState.STOPPED:
        return <PlayArrowRounded fontSize="large" />;
      case MediaState.PLAYING:
        return <PauseRounded fontSize="large" />;
    }
  };

  const repeatIcon = (): ReactElement => {
    switch (repeat) {
      case RepeatMode.NONE:
      case RepeatMode.ALL:
        return <RepeatRounded />;
      case RepeatMode.ONE:
        return <RepeatOneRounded />;
    }
  };

  return (
    <div className="controls">
      <div className="controls__buttons">
        <IconButtonToggle isActive={shuffle} onClick={() => dispatch(toggleShuffle())}>
          <ShuffleRounded />
        </IconButtonToggle>
        <IconButton onClick={() => {}}>
          <SkipPreviousRounded />
        </IconButton>
        <IconButtonBordered borderSize={5} onClick={() => dispatch(playOrPause())}>
          {playOrPauseIcon()}
        </IconButtonBordered>
        <IconButton onClick={() => {}}>
          <SkipNextRounded />
        </IconButton>
        <IconButtonToggle isActive={repeat !== RepeatMode.NONE} onClick={() => dispatch(switchRepeat())}>
          {repeatIcon()}
        </IconButtonToggle>
      </div>
    </div>
  );
};

export default Controls;
