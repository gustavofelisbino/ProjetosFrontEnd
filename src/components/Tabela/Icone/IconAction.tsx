import { IconButton, Tooltip } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface IconActionProps {
  onClick: () => void;
  title?: string;
}

export default function IconAction({ onClick, title = "Abrir" }: IconActionProps) {
  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick}>
        <OpenInNewIcon />
      </IconButton>
    </Tooltip>
  );
}
