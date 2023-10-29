import { ButtonProps } from "@mui/material";
import { ReactNode } from "react";

import { ResponsiveButton } from "@/components/@extends/ResponsiveButton";

export type ActionProps = {
  key: string | number;
  onClick?: () => void;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
  icon: ReactNode;
  children: ReactNode;
};

export const Action = (props: ActionProps) => {
  const { onClick, variant, color, icon, children } = props;
  return (
    <ResponsiveButton
      onClick={onClick}
      size="small"
      variant={variant || "outlined"}
      color={color || "primary"}
      startIcon={icon}
    >
      {children}
    </ResponsiveButton>
  );
};
