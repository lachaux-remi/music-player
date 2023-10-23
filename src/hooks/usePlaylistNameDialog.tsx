import { LibraryMusic } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useRef, useState } from "react";

export type UsePlaylistDialogProps = {
  title: string;
  value?: string;
  onConfirm: (playlistName: string) => void;
  onClose?: () => void;
};

export const usePlaylistNameDialog = (props: UsePlaylistDialogProps) => {
  const { title, value, onConfirm, onClose } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);

    if (onClose) {
      onClose();
    }
  };

  const handledConfirm = () => {
    setOpen(false);

    if (inputRef.current?.value) {
      onConfirm(inputRef.current?.value);
    }
  };

  const renderDialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <LibraryMusic sx={{ fontSize: "5rem", margin: "10px" }} />
        <TextField
          autoFocus={open}
          id="playlistName"
          label="Entrer le nom de la playlist"
          type="text"
          fullWidth
          defaultValue={value}
          inputRef={inputRef}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="contained" onClick={handledConfirm}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );

  return {
    open,
    setOpen,
    renderDialog
  };
};
