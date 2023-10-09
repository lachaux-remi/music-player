import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/@types/State";
import { setCurrentTime } from "@/stores/slices/queueReducer";

import "./ProgressBar.scss";

const ProgressBar = () => {
  const dispatch = useDispatch();
  const { currentTrack, currentTime } = useSelector((state: RootState) => state.queue);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = time % 60;

    return [hours, minutes, seconds]
      .map(v => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  const handleSetCurrentTime = (_: Event, value: number | number[]) => {
    if (typeof value === "number") {
      dispatch(setCurrentTime({ currentTime: value, forced: true }));
    }
  };

  return (
    <div className="progress-bar">
      <div className="progress-bar__current">{formatTime(currentTime)}</div>
      <Slider
        className="progress-bar__bar"
        value={currentTime}
        step={1}
        min={0}
        max={currentTrack?.duration || 0}
        onChange={handleSetCurrentTime}
      />
      <div className="progress-bar__total">-{formatTime((currentTrack?.duration || 0) - currentTime)}</div>
    </div>
  );
};

export default ProgressBar;
