import { LibraryMusic } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useRef } from "react";

type AddPlaylistDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (playlistName: string) => void;
};

const AddPlaylistDialog = (props: AddPlaylistDialogProps) => {
  const { open, onClose, onConfirm } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handledConfirm = () => {
    onClose();

    if (inputRef.current?.value && onConfirm) {
      onConfirm(inputRef.current?.value);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter une nouvelle playlist</DialogTitle>
      <DialogContent sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <LibraryMusic sx={{ fontSize: "5rem", margin: "10px" }} />
        <TextField
          autoFocus
          id="playlistName"
          label="Entrer le nom de la playlist"
          type="text"
          fullWidth
          inputRef={inputRef}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="contained" onClick={handledConfirm}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlaylistDialog;
