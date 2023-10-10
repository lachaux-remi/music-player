import { Track } from "@/@types/State";
import { formatTime } from "@/utils/TimeUtil";

type TrackDetailsProps = {
  track: Track;
};

const TrackDetails = (props: TrackDetailsProps) => {
  const { track } = props;

  return (
    <div className="playlist__track-details">
      <div className="track-details__title">{track.title}</div>
      <div className="track-details__artist">{track.artist}</div>
      <div className="track-details__album">{track.album}</div>
      <div className="track-details__duration">{formatTime(track.duration)}</div>
    </div>
  );
};

export default TrackDetails;
