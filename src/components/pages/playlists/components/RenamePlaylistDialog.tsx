import { LibraryMusic } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useRef } from "react";

type RenamePlaylistDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (playlistName: string) => void;
  currentName: string;
};

const RenamePlaylistDialog = (props: RenamePlaylistDialogProps) => {
  const { open, onClose, onConfirm, currentName } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handledConfirm = () => {
    onClose();

    if (inputRef.current?.value && onConfirm) {
      onConfirm(inputRef.current?.value);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Renommer la playlist</DialogTitle>
      <DialogContent sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <LibraryMusic sx={{ fontSize: "5rem", margin: "10px" }} />
        <TextField
          autoFocus
          id="playlistName"
          label="Entrer le nouveau nom de la playlist"
          type="text"
          fullWidth
          inputRef={inputRef}
          defaultValue={currentName}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="contained" onClick={handledConfirm}>
          Renommer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenamePlaylistDialog;
