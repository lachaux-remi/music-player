import { VolumeDownRounded, VolumeMuteRounded, VolumeOffRounded, VolumeUpRounded } from "@mui/icons-material";
import { IconButton, Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/@types/State";
import { setVolume } from "@/stores/slices/settingsReducer";

import "./VolumeBar.scss";

export const VolumeBar = () => {
  const dispatch = useDispatch();
  const { volume } = useSelector((state: RootState) => state.settings);

  const handleToggleMute = () => {
    dispatch(setVolume({ ...volume, muted: !volume.muted }));
  };

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    dispatch(setVolume({ ...volume, level: value as number, muted: false }));
  };

  const renderIcon = () => {
    if (volume.muted) {
      return <VolumeOffRounded />;
    } else if (volume.level <= 20) {
      return <VolumeMuteRounded />;
    } else if (volume.level > 20 && volume.level <= 80) {
      return <VolumeDownRounded />;
    } else {
      return <VolumeUpRounded />;
    }
  };

  return (
    <div className="volume-bar">
      <IconButton className="volume-bar__btn" onClick={handleToggleMute}>
        {renderIcon()}
      </IconButton>
      <Slider
        className="volume-bar__slider"
        value={volume.muted ? 0 : volume.level}
        onChange={handleVolumeChange}
        step={1}
        min={0}
        max={100}
      />
    </div>
  );
};
