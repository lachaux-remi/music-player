import { IconButton } from "@mui/material";
import { IconButtonProps } from "@mui/material/IconButton/IconButton";
import { styled } from "@mui/material/styles";

type IconButtonBorderedProps = {
  borderSize?: number;
  borderColor?: string;
} & IconButtonProps;

const IconButtonBordered = (prop: IconButtonBorderedProps) => {
  const { children, borderSize = 2, borderColor, ...iconButtonProp } = prop;

  const ButtonBackground = styled(IconButton)(({ theme }) => {
    return {
      border: `${borderSize}px solid ${borderColor ? borderColor : theme.palette.primary.main}`
    };
  });

  return <ButtonBackground {...iconButtonProp}>{children}</ButtonBackground>;
};

export default IconButtonBordered;
