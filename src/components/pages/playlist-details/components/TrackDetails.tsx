import { Checkbox } from "@mui/material";
import React from "react";

import { Track } from "@/@types/State";
import { formatTime } from "@/utils/TimeUtil";

type TrackDetailsProps = {
  track: Track;
  selectedState: [Track[], React.Dispatch<React.SetStateAction<Track[]>>];
};

const TrackDetails = (props: TrackDetailsProps) => {
  const { track, selectedState } = props;
  const [selectedTrack, setSelectedTrack] = selectedState;

  const isSelected = selectedTrack.find(t => t.uuid === track.uuid) !== undefined;
  const handleSelectTrack = () => {
    if (isSelected) {
      setSelectedTrack(selectedTrack.filter(t => t.uuid !== track.uuid));
    } else {
      setSelectedTrack([...selectedTrack, track]);
    }
  };

  return (
    <div className="playlist__track-details">
      <div className="track-details__checkbox">
        <Checkbox onChange={handleSelectTrack} checked={isSelected} />
      </div>
      <div className="track-details__title">{track.title}</div>
      <div className="track-details__artist">{track.artist}</div>
      <div className="track-details__album">{track.album}</div>
      <div className="track-details__duration">{formatTime(track.duration)}</div>
    </div>
  );
};

export default TrackDetails;
