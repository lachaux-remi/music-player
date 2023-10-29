import { Button, ButtonProps, IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";

export type ResponsiveButtonProps = ButtonProps;

export const ResponsiveButton = (props: ResponsiveButtonProps) => {
  const { children, ...buttonProps } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  if (matches) {
    return (
      <Tooltip title={children}>
        <IconButton size={buttonProps.size} color={buttonProps.color} onClick={buttonProps.onClick}>
          {buttonProps.startIcon}
        </IconButton>
      </Tooltip>
    );
  }
  return <Button {...buttonProps}>{children}</Button>;
};
