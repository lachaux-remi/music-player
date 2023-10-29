import { AddToQueueRounded, ClearRounded, MusicNoteRounded, PlayArrowRounded } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import { Track } from "@/@types/State";
import { useContextMenu } from "@/hooks/useContextMenu";
import { Playlist } from "@/hooks/usePlaylist";
import { removeTracks } from "@/stores/slices/playlistsReducer";
import { addTracksToPlayNext, setTrack } from "@/stores/slices/queueReducer";
import { formatTime } from "@/utils/TimeUtil";

export type TrackDetailsProps = {
  track: Track;
  playlist: Playlist;
  selectedState: [Track[], React.Dispatch<React.SetStateAction<Track[]>>];
};

export const TrackDetails = (props: TrackDetailsProps) => {
  const { track, playlist, selectedState } = props;
  const [selectedTrack, setSelectedTrack] = selectedState;

  const dispatch = useDispatch();
  const { contextMenu, onContextMenu } = useContextMenu([
    {
      caption: "Lire",
      icon: <PlayArrowRounded />,
      onClick: () => dispatch(setTrack(track))
    },
    {
      caption: "Lire ensuite",
      icon: <AddToQueueRounded />,
      onClick: () => dispatch(addTracksToPlayNext([track]))
    },
    { caption: "divider" },
    {
      caption: "Supprimer",
      icon: <ClearRounded />,
      onClick: () => dispatch(removeTracks({ uuid: playlist.uuid, tracks: [track.uuid] }))
    }
  ]);

  const handleDoubleClick = () => {
    dispatch(setTrack(track));
  };

  const isSelected = selectedTrack.find(t => t.uuid === track.uuid) !== undefined;

  const handleSelectTrack = () => {
    if (isSelected) {
      setSelectedTrack(selectedTrack.filter(t => t.uuid !== track.uuid));
    } else {
      setSelectedTrack([...selectedTrack, track]);
    }
  };

  return (
    <div
      className="playlist__track-details"
      onContextMenu={onContextMenu}
      onDoubleClick={handleDoubleClick}
      data-selected={isSelected}
    >
      <Checkbox
        className="track-details__checkbox"
        onDoubleClick={e => e.stopPropagation()}
        onChange={handleSelectTrack}
        checked={isSelected}
        size="small"
      />
      <div className="track-details__cover">
        {track.cover !== "" ? <img src={track.cover} alt={track.title} /> : <MusicNoteRounded />}
      </div>
      <div className="track-details__title">{track.title}</div>
      <div className="track-details__artist">{track.artist}</div>
      <div className="track-details__album">{track.album}</div>
      <div className="track-details__duration">{formatTime(track.duration)}</div>

      {contextMenu}
    </div>
  );
};
