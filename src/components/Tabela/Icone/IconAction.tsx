import { IconButton, Tooltip } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import type { FC } from 'react';

interface IconActionProps {
  onClick: () => void;
  title?: string;
}

export const IconAction: FC<IconActionProps> = ({ onClick, title = "Abrir" }) => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick}>
        <OpenInNewIcon />
      </IconButton>
    </Tooltip>
  );
}

export default IconAction;