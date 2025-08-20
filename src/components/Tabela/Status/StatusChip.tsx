import { Chip } from "@mui/material";

type StatusType = "Disponível" | "Em estoque" | "Indisponível";

interface StatusChipProps {
  status: StatusType;
}

const statusColors: Record<StatusType, "success" | "default" | "error"> = {
  Disponível: "success",
  "Em estoque": "default",
  Indisponível: "error",
};

export default function StatusChip({ status }: StatusChipProps) {
  return (
    <Chip
      label={status}
      color={statusColors[status]}
      variant="outlined"
      size="small"
    />
  );
}