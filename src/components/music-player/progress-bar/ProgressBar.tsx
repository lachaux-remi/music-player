import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/@types/State";
import { setCurrentTime } from "@/stores/slices/queueReducer";
import { formatTime } from "@/utils/TimeUtil";

import "./ProgressBar.scss";

const ProgressBar = () => {
  const dispatch = useDispatch();
  const { currentTrack, currentTime } = useSelector((state: RootState) => state.queue);

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
