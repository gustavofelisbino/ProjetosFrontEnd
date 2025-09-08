import { Chip } from "@mui/material";
import type { FC } from 'react';

type StatusType = "Disponível" | "Em estoque" | "Indisponível";

interface StatusChipProps {
  status: StatusType;
}

const statusColors: Record<StatusType, "success" | "default" | "error"> = {
  Disponível: "success",
  "Em estoque": "default",
  Indisponível: "error",
};

export const StatusChip: FC<StatusChipProps> = ({ status }) => {
  return (
    <Chip
      label={status}
      color={statusColors[status]}
      variant="outlined"
      size="small"
    />
  );
}

export default StatusChip;