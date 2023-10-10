import {
  AddRounded,
  AddToQueueRounded,
  ClearRounded,
  KeyboardArrowDown,
  PlayArrowRounded,
  QueueMusicRounded
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover
} from "@mui/material";
import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, Track } from "@/@types/State";
import ResponsiveButton from "@/components/@extends/ResponsiveButton";
import AddPlaylistDialog from "@/components/pages/playlists/components/AddPlaylistDialog";
import { add, addTracks as addTracksToPlaylist } from "@/stores/slices/playlistsReducer";
import { addTracksToPlayNext, addTracks as addTracksToQueue, setTrack } from "@/stores/slices/queueReducer";
import { remove } from "@/stores/slices/tracksReducer";

type MassActionsProps = {
  tracks: Track[];
  state: [Track[], React.Dispatch<React.SetStateAction<Track[]>>];
};

const MassActions = (props: MassActionsProps) => {
  const { tracks, state } = props;
  const [selectedTrack, setSelectedTrack] = state;

  const dispatch = useDispatch();
  const playlists = useSelector((state: RootState) => state.playlists);
  const [openAddPlaylist, setOpenAddPlaylist] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenAddTo = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddToNewPlaylist = (name: string) => {
    dispatch(add({ name, tracks: selectedTrack.map(track => track.uuid) }));
    setSelectedTrack([]);
  };

  if (selectedTrack.length === 0) {
    return null;
  }

  return (
    <Paper elevation={1} square className="mass-actions">
      <div className="mass-actions__checkbox">
        <Checkbox onChange={(_, checked) => setSelectedTrack(checked ? tracks : [])} />
        <span>
          {selectedTrack.length} élément{selectedTrack.length > 1 ? "s" : ""}
        </span>
        <Button variant="text" size="small" onClick={() => setSelectedTrack([])}>
          Effacer
        </Button>
      </div>

      <div className="mass-actions__actions">
        <ResponsiveButton
          variant="contained"
          size="small"
          startIcon={<PlayArrowRounded />}
          onClick={() => {
            dispatch(setTrack(selectedTrack[0]));
            dispatch(addTracksToQueue(selectedTrack.slice(1)));
            setSelectedTrack([]);
          }}
        >
          Lire
        </ResponsiveButton>
        <ResponsiveButton
          variant="outlined"
          size="small"
          startIcon={<AddToQueueRounded />}
          onClick={() => {
            dispatch(addTracksToPlayNext(selectedTrack));
            setSelectedTrack([]);
          }}
        >
          Lire ensuite
        </ResponsiveButton>
        <ResponsiveButton
          variant="outlined"
          size="small"
          startIcon={<AddRounded />}
          endIcon={<KeyboardArrowDown />}
          onClick={handleOpenAddTo}
        >
          Ajouter à
        </ResponsiveButton>
        <ResponsiveButton
          variant="outlined"
          color="error"
          size="small"
          startIcon={<ClearRounded />}
          onClick={() => {
            dispatch(remove(selectedTrack));
            setSelectedTrack([]);
          }}
        >
          Supprimer
        </ResponsiveButton>
      </div>

      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Paper elevation={10}>
          <MenuList dense>
            <MenuItem>
              <ListItemIcon>
                <QueueMusicRounded />
              </ListItemIcon>
              <ListItemText>File d'attente de lecture</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                setOpenAddPlaylist(true);
              }}
            >
              <ListItemIcon>
                <AddRounded />
              </ListItemIcon>
              <ListItemText>Nouvelle playlist</ListItemText>
            </MenuItem>
            {playlists.map(playlist => (
              <MenuItem
                key={playlist.uuid}
                onClick={() => {
                  selectedTrack.every(track =>
                    dispatch(
                      addTracksToPlaylist({
                        uuid: playlist.uuid,
                        tracks: [track.uuid]
                      })
                    )
                  );
                  setSelectedTrack([]);
                  setAnchorEl(null);
                }}
              >
                <ListItemText inset>{playlist.name}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popover>

      <AddPlaylistDialog
        open={openAddPlaylist}
        onClose={() => setOpenAddPlaylist(false)}
        onConfirm={handleAddToNewPlaylist}
      />
    </Paper>
  );
};

export default MassActions;
