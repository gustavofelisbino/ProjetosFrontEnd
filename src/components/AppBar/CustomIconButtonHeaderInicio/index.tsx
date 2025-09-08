import { IconButton } from "@mui/material";
import type { FC } from 'react';

interface ButtonProps {
  icon: any;
  color?: any;
}

export const CustomIconButtonHeaderInicio: FC<ButtonProps> = (props: ButtonProps) => {
  const { icon, color = "inherit" } = props;
  return <IconButton color={color}>{icon}</IconButton>;
};

export default CustomIconButtonHeaderInicio;