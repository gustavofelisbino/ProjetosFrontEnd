import { IconButton } from "@mui/material";

interface ButtonProps {
  icon: any;
  color?: any;
}

const CustomIconButtonHeaderInicio = (props: ButtonProps) => {
  const { icon, color = "inherit" } = props;
  return <IconButton color={color}>{icon}</IconButton>;
};

export default CustomIconButtonHeaderInicio;