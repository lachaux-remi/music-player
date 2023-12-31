import {
  AddRounded,
  AddToQueueRounded,
  ClearRounded,
  MusicNoteRounded,
  PlayArrowRounded,
  QueueMusicRounded
} from "@mui/icons-material";
import { ButtonBase, Checkbox } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, Track } from "@/@types/State";
import { useContextMenu } from "@/hooks/useContextMenu";
import { usePlaylistNameDialog } from "@/hooks/usePlaylistNameDialog";
import { add, addTracks as addTracksToPlaylist } from "@/stores/slices/playlistsReducer";
import { addTracksToPlayNext, addTracks as addTracksToQueue, setTrack } from "@/stores/slices/queueReducer";
import { remove } from "@/stores/slices/tracksReducer";

export type TrackInfoProps = {
  track: Track;
  selectedState: [Track[], React.Dispatch<React.SetStateAction<Track[]>>];
};

export const TrackInfo = (props: TrackInfoProps) => {
  const { selectedState, track } = props;
  const [selectedTrack, setSelectedTrack] = selectedState;

  const dispatch = useDispatch();
  const { renderDialog, setOpen } = usePlaylistNameDialog({
    title: "Ajouter une nouvelle playlist",
    onConfirm: (name: string) => dispatch(add({ name, tracks: [track.uuid] }))
  });
  const playlists = useSelector((state: RootState) => state.playlists);
  const { contextMenu, onContextMenu } = useContextMenu([
    {
      caption: "Lire",
      icon: <PlayArrowRounded />,
      onClick: () => {
        dispatch(setTrack(track));
      }
    },
    {
      caption: "Lire ensuite",
      icon: <AddToQueueRounded />,
      onClick: () => {
        dispatch(addTracksToPlayNext([track]));
      }
    },
    {
      caption: "divider"
    },
    {
      caption: "Ajouter à",
      icon: <AddRounded />,
      items: [
        {
          caption: "File d'attente de lecture",
          icon: <QueueMusicRounded />,
          onClick: () => {
            dispatch(addTracksToQueue([track]));
          }
        },
        {
          caption: "divider"
        },
        {
          caption: "Nouvelle playlist",
          icon: <AddRounded />,
          onClick: () => setOpen(true)
        },
        ...playlists.map(playlist => {
          return {
            caption: playlist.name,
            inset: true,
            onClick: () => dispatch(addTracksToPlaylist({ uuid: playlist.uuid, tracks: [track.uuid] }))
          };
        })
      ]
    },
    {
      caption: "Supprimer",
      icon: <ClearRounded />,
      onClick: () => dispatch(remove([track]))
    }
  ]);

  const isSelected = selectedTrack.find(t => t.uuid === track.uuid) !== undefined;
  const handleSelectTrack = () => {
    if (isSelected) {
      setSelectedTrack(selectedTrack.filter(t => t.uuid !== track.uuid));
    } else {
      setSelectedTrack([...selectedTrack, track]);
    }
  };

  const handleDoubleClick = () => {
    dispatch(setTrack(track));
  };

  return (
    <ButtonBase
      component="div"
      className="tracks__track"
      disableRipple={true}
      onContextMenu={onContextMenu}
      onDoubleClick={handleDoubleClick}
      data-selected={isSelected}
    >
      <Checkbox
        className="track__checkbox"
        onDoubleClick={e => e.stopPropagation()}
        onChange={handleSelectTrack}
        checked={isSelected}
      />
      <div className="track__cover">
        {track.cover !== "" ? <img src={track.cover} alt={track.title} /> : <MusicNoteRounded />}
      </div>
      <div className="track__infos ">
        <div className="infos__name">{track.title}</div>
        <div className="infos__artist">{track.artist}</div>
      </div>

      {contextMenu}
      {renderDialog}
    </ButtonBase>
  );
};
