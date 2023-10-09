import { IconButton } from "@mui/material";
import { IconButtonProps } from "@mui/material/IconButton/IconButton";
import { styled } from "@mui/material/styles";

type IconButtonToggleProps = {
  isActive: boolean;
  color?: string;
} & IconButtonProps;

const IconButtonToggle = (props: IconButtonToggleProps) => {
  const { children, isActive, color, ...iconButtonProp } = props;

  const ButtonToggle = styled(IconButton)(({ theme }) => {
    return {
      color: isActive ? color || theme.palette.primary.main : theme.palette.text.primary
    };
  });

  return <ButtonToggle {...iconButtonProp}>{children}</ButtonToggle>;
};

export default IconButtonToggle;
