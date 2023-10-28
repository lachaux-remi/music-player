import { KeyboardArrowDown } from "@mui/icons-material";
import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popover } from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";

import { ResponsiveButton, ResponsiveButtonProps } from "@/components/@extends/ResponsiveButton";

export type MassActionItemProps = {
  caption: ReactNode;
  icon: ResponsiveButtonProps["startIcon"];
  variant?: ResponsiveButtonProps["variant"];
  color?: ResponsiveButtonProps["color"];
  onClick?: () => void;
  items?: MassActionDropdownProps[];
};
export type MassActionDropdownProps = {
  caption: ReactNode;
  icon?: ResponsiveButtonProps["startIcon"];
  onClick?: () => void;
};

export const MassActionItem = (props: MassActionItemProps) => {
  const { caption, icon, variant = "outlined", color = "primary", onClick, items } = props;

  if (items !== undefined) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (
      <>
        <ResponsiveButton
          variant={variant}
          size="small"
          startIcon={icon}
          endIcon={<KeyboardArrowDown />}
          onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
        >
          {caption}
        </ResponsiveButton>

        <Popover
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Paper elevation={10}>
            <MenuList dense>
              {items.map((item, index) => {
                if (item.caption === "divider") {
                  return <Divider key={index} />;
                }

                return (
                  <MenuItem key={index} onClick={item.onClick}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.caption}</ListItemText>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Paper>
        </Popover>
      </>
    );
  }

  return (
    <ResponsiveButton variant={variant} color={color} size="small" startIcon={icon} onClick={onClick}>
      {caption}
    </ResponsiveButton>
  );
};
