import { AddToQueueRounded, ClearRounded, EditRounded, PlayArrowRounded } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { PageAction } from "@/@types/Page";
import { Track } from "@/@types/State";
import { Page } from "@/components/pages/Page";
import { Action } from "@/components/pages/components/page-actions/Action";
import { NotFoundPage } from "@/components/pages/errors/NotFoundPage";
import { TrackDetails } from "@/components/pages/playlist-details/components/TrackDetails";
import { useMassSelection } from "@/hooks/useMassSelection";
import { usePlaylist } from "@/hooks/usePlaylist";
import { usePlaylistNameDialog } from "@/hooks/usePlaylistNameDialog";
import { remove as removePlaylist, removeTracks, rename } from "@/stores/slices/playlistsReducer";
import { addTracks as addTracksToQueue, setTrack } from "@/stores/slices/queueReducer";

import "./PlaylistDetailsPage.scss";

export const PlaylistDetailsPage = () => {
  const { playlistUUID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getPlaylist } = usePlaylist();

  const playlist = getPlaylist(playlistUUID!);
  if (playlist === undefined) {
    return <NotFoundPage>Playlist introuvable ou supprimé</NotFoundPage>;
  }

  const { renderDialog, setOpen } = usePlaylistNameDialog({
    title: "Renommer la playlist",
    value: playlist.name,
    onConfirm: (newName: string) => dispatch(rename({ uuid: playlist.uuid, newName }))
  });

  const { selectedItems, setSelectedItem, renderMassActions } = useMassSelection<Track>(playlist.tracks, [
    {
      caption: "Lire",
      icon: <PlayArrowRounded />,
      variant: "contained",
      onClick: () => {
        dispatch(setTrack(selectedItems[0]));
        if (selectedItems.length > 1) {
          dispatch(addTracksToQueue(selectedItems.slice(1)));
        }
        setSelectedItem([]);
      }
    },
    {
      caption: "Lire ensuite",
      icon: <AddToQueueRounded />,
      onClick: () => {
        dispatch(addTracksToQueue(selectedItems));
        setSelectedItem([]);
      }
    },
    {
      caption: "Supprimer",
      icon: <ClearRounded />,
      color: "error",
      onClick: () => {
        dispatch(removeTracks({ uuid: playlist.uuid, tracks: selectedItems.map(t => t.uuid) }));
        setSelectedItem([]);
      }
    }
  ]);

  const handlePlayPlaylist = () => {
    dispatch(setTrack(playlist.tracks[0]));
    dispatch(addTracksToQueue(playlist.tracks.slice(1)));
  };

  const handleRemovePlaylist = () => {
    dispatch(removePlaylist(playlist.uuid));
    navigate("/playlists");
  };

  const actions: PageAction[] = [
    <Action key="playlist-play" variant="contained" icon={<PlayArrowRounded />} onClick={handlePlayPlaylist}>
      Tout lire
    </Action>,
    <Action key="playlist-rename" icon={<EditRounded />} onClick={() => setOpen(true)}>
      Renommer
    </Action>,
    <Action key="playlist-remove" color="error" icon={<ClearRounded />} onClick={handleRemovePlaylist}>
      Supprimer
    </Action>
  ];

  return (
    <Page title={`Playlist · ${playlist.name}`} actions={actions} className="page-playlist-details">
      <div className="playlist-details">
        {playlist.tracks.map(track => (
          <TrackDetails
            key={track.uuid}
            playlist={playlist}
            track={track}
            selectedState={[selectedItems, setSelectedItem]}
          />
        ))}
      </div>

      {renderMassActions}
      {renderDialog}
    </Page>
  );
};
