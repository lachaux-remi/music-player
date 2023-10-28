import { AddRounded } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { PageAction } from "@/@types/Page";
import { RootState } from "@/@types/State";
import Page from "@/components/pages/Page";
import Action from "@/components/pages/components/page-actions/Action";
import PlaylistInfo from "@/components/pages/playlists/components/PlaylistInfo";
import { usePlaylistNameDialog } from "@/hooks/usePlaylistNameDialog";
import { add } from "@/stores/slices/playlistsReducer";

import "./PlaylistsPage.scss";

const PlaylistsPage = () => {
  const dispatch = useDispatch();

  const { renderDialog, setOpen } = usePlaylistNameDialog({
    title: "Ajouter une nouvelle playlist",
    onConfirm: (name: string) => dispatch(add({ name }))
  });
  const playlists = useSelector((state: RootState) => state.playlists);

  const actions: PageAction[] = [
    <Action key="playlist-add" icon={<AddRounded />} onClick={() => setOpen(true)}>
      Nouvelle playlist
    </Action>
  ];

  return (
    <Page title="Playlists" className="page-playlists" actions={actions}>
      <div className="playlists">
        {playlists.map(playlist => (
          <PlaylistInfo playlistUUID={playlist.uuid} key={playlist.uuid} />
        ))}
      </div>

      {renderDialog}
    </Page>
  );
};

export default PlaylistsPage;
