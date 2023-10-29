import { Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";

import { ContextSubMenu } from "@/components/context-menu/ContextSubMenu";
import { ContextMenuItem } from "@/hooks/useContextMenu";

export type ContextMenuProps = {
  items: ContextMenuItem[];
};

export const ContextMenu = (props: ContextMenuProps) => {
  const { items } = props;

  return items.map((props, index) => {
    const { caption, items, icon, onClick, inset } = props;

    if (caption === "divider") {
      return <Divider key={index} />;
    }

    if (items !== undefined) {
      return <ContextSubMenu key={index} caption={caption} icon={icon} inset={inset} items={items} />;
    }

    return (
      <MenuItem key={index} onClick={onClick}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText inset={inset}>{caption}</ListItemText>
      </MenuItem>
    );
  });
};
