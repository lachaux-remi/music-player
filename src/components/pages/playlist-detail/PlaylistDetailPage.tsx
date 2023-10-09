import { ClearRounded, EditRounded, PlayArrowRounded } from "@mui/icons-material";
import React from "react";
import { useParams } from "react-router-dom";

import { PageAction } from "@/@types/Page";
import Page from "@/components/pages/Page";
import Action from "@/components/pages/components/page-actions/Action";
import NotFoundPage from "@/components/pages/errors/NotFoundPage";
import usePlaylist from "@/hooks/usePlaylist";

import "./PlaylistDetailPage.scss";

const PlaylistDetailPage = () => {
  const { getPlaylist } = usePlaylist();
  const { playlistID } = useParams();

  const playlist = getPlaylist(playlistID!);
  if (playlist === undefined) {
    return <NotFoundPage>Playlist introuvable ou supprimé</NotFoundPage>;
  }

  const actions: PageAction[] = [
    <Action key="" variant="contained" icon={<PlayArrowRounded />} onClick={() => {}}>
      Tout lire
    </Action>,
    <Action key="playlist-add" icon={<EditRounded />} onClick={() => {}}>
      Renommer
    </Action>,
    <Action key="playlist-add" color="error" icon={<ClearRounded />} onClick={() => {}}>
      Supprimer
    </Action>
  ];

  return (
    <Page title={`Playlist · ${playlist.name}`} actions={actions} className="page-playlist-details">
      <div className="playlist-details">
        {playlist.tracks.map(track => (
          <div key={track.uuid} className="track">
            <div className="track__title">{track.title}</div>
            <div className="track__artist">{track.artist}</div>
          </div>
        ))}
      </div>
    </Page>
  );
};

export default PlaylistDetailPage;
