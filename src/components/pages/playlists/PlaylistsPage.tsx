import { AddRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PageAction } from "@/@types/Page";
import { RootState } from "@/@types/State";
import Page from "@/components/pages/Page";
import Action from "@/components/pages/components/page-actions/Action";
import AddPlaylistDialog from "@/components/pages/playlists/components/AddPlaylistDialog";
import PlaylistInfo from "@/components/pages/playlists/components/PlaylistInfo";
import { add } from "@/stores/slices/playlistsReducer";

import "./PlaylistsPage.scss";

const PlaylistsPage = () => {
  const dispatch = useDispatch();

  const playlists = useSelector((state: RootState) => state.playlists);
  const [openAddPlaylist, setOpenAddPlaylist] = useState(false);

  const actions: PageAction[] = [
    <Action key="playlist-add" icon={<AddRounded />} onClick={() => setOpenAddPlaylist(true)}>
      Nouvelle playlist
    </Action>
  ];

  const handleAddPlaylist = (name: string) => {
    dispatch(add({ name }));
  };

  return (
    <Page title="Playlists" className="page-playlists" actions={actions}>
      <div className="playlists">
        {playlists.map(playlist => (
          <PlaylistInfo playlistUUID={playlist.uuid} key={playlist.uuid} />
        ))}
      </div>

      <AddPlaylistDialog
        open={openAddPlaylist}
        onClose={() => setOpenAddPlaylist(false)}
        onConfirm={handleAddPlaylist}
      />
    </Page>
  );
};

export default PlaylistsPage;
