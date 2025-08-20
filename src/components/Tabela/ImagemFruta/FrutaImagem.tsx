import { Avatar, Stack, Typography } from "@mui/material";

interface FrutaAvatarProps {
  name: string;
  image?: string;
}

export default function FrutaImagem({ name, image }: FrutaAvatarProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar src={image} alt={name} />
      <Typography>{name}</Typography>
    </Stack>
  );
}