import {
  AddToQueueRounded,
  ClearRounded,
  EditRounded,
  MusicNoteRounded,
  PlayArrowRounded,
  SubscriptionsRounded
} from "@mui/icons-material";
import { ButtonBase } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useContextMenu } from "@/hooks/useContextMenu";
import usePlaylist from "@/hooks/usePlaylist";
import { usePlaylistNameDialog } from "@/hooks/usePlaylistNameDialog";
import { remove, rename } from "@/stores/slices/playlistsReducer";

type PlaylistInfoProps = {
  playlistUUID: string;
};

const PlaylistInfo = (props: PlaylistInfoProps) => {
  const { playlistUUID } = props;

  const dispatch = useDispatch();
  const { getPlaylist } = usePlaylist();
  const playlist = getPlaylist(playlistUUID)!;

  const { renderDialog, setOpen } = usePlaylistNameDialog({
    title: "Renommer la playlist",
    value: playlist.name,
    onConfirm: (newName: string) => dispatch(rename({ uuid: playlist.uuid, newName }))
  });

  const { contextMenu, onContextMenu } = useContextMenu([
    {
      caption: "Lire",
      icon: <PlayArrowRounded />,
      onClick: () => {}
    },
    {
      caption: "Lire ensuite",
      icon: <AddToQueueRounded />,
      onClick: () => {}
    },
    {
      caption: "divider"
    },
    {
      caption: "Renommer",
      icon: <EditRounded />,
      onClick: () => setOpen(true)
    },
    {
      caption: "Supprimer",
      icon: <ClearRounded />,
      onClick: () => dispatch(remove(playlistUUID))
    }
  ]);

  return (
    <ButtonBase
      component={Link}
      to={`/playlists/${playlistUUID}`}
      disableRipple={true}
      className="playlists__playlist"
      onContextMenu={onContextMenu}
    >
      <div className="playlist__covers">
        {playlist.tracks.length === 0 && (
          <div className="covers__no-cover">
            <SubscriptionsRounded />
          </div>
        )}

        {playlist.tracks.slice(0, 4).map(track => {
          return (
            <div className="covers__cover" key={track.uuid}>
              {track.cover !== "" ? <img src={track.cover} alt={track.title} /> : <MusicNoteRounded />}
            </div>
          );
        })}
      </div>
      <div className="playlist__infos">
        <div className="infos__name">{playlist.name}</div>
        <div className="infos__tracks">
          {playlist.tracks.length} élément{playlist.tracks.length > 1 ? "s" : ""}
        </div>
      </div>

      {contextMenu}
      {renderDialog}
    </ButtonBase>
  );
};

export default PlaylistInfo;
