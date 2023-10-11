import { Button, Checkbox, Paper } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect } from "react";

import { MassActionItem, MassActionItemProps } from "@/components/mass-actions/mass-action-item/MassActionItem";

import "./MassActions.scss";

type MassActionsProps<T> = {
  items: T[];
  selectedItems: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
  massActionItems: MassActionItemProps[];
};

export const MassActions = <T,>(props: MassActionsProps<T>) => {
  const { items, selectedItems, setSelectedItems, massActionItems } = props;

  useEffect(() => {
    setSelectedItems(selectedItems.filter(item => items.find(i => i === item) !== undefined));
  }, [items]);

  return (
    <Paper elevation={1} square className="mass-actions">
      <div className="mass-actions__checkbox">
        <Checkbox onChange={(_, checked) => setSelectedItems(checked ? items : [])} />
        {selectedItems.length} élément{selectedItems.length > 1 ? "s" : ""}
        <Button variant="text" size="small" onClick={() => setSelectedItems([])}>
          Effacer
        </Button>
      </div>

      <div className="mass-actions__actions">
        {massActionItems.map((item, index) => (
          <MassActionItem key={index} {...item} />
        ))}
      </div>
    </Paper>
  );
};
