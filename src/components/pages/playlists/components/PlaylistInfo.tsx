import {
  AddToQueueRounded,
  ClearRounded,
  EditRounded,
  MusicNoteRounded,
  PlayArrowRounded,
  SubscriptionsRounded
} from "@mui/icons-material";
import { ButtonBase } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import RenamePlaylistDialog from "@/components/pages/playlists/components/RenamePlaylistDialog";
import { useContextMenu } from "@/hooks/useContextMenu";
import usePlaylist from "@/hooks/usePlaylist";
import { remove, rename } from "@/stores/slices/playlistsReducer";

type PlaylistInfoProps = {
  playlistUUID: string;
};

const PlaylistInfo = (props: PlaylistInfoProps) => {
  const { playlistUUID } = props;

  const dispatch = useDispatch();
  const { getPlaylist } = usePlaylist();
  const playlist = getPlaylist(playlistUUID)!;
  const [openRenamePlaylist, setOpenRenamePlaylist] = useState(false);
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
      onClick: () => setOpenRenamePlaylist(true)
    },
    {
      caption: "Supprimer",
      icon: <ClearRounded />,
      onClick: () => dispatch(remove(playlistUUID))
    }
  ]);

  const handelRRenamePlaylist = (newName: string) => {
    dispatch(rename({ uuid: playlistUUID, newName }));
  };

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

      <RenamePlaylistDialog
        open={openRenamePlaylist}
        onClose={() => setOpenRenamePlaylist(false)}
        onConfirm={handelRRenamePlaylist}
        currentName={playlist.name}
      />
    </ButtonBase>
  );
};

export default PlaylistInfo;
