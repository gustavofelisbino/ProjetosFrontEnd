import { Avatar, Box, Button, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { FC } from 'react';

interface AvatarHeaderInicioProps {
  userIcon: any;
  nomeUsuario: string;
  nomeUnidade?: string;
}

export const CustomAvatarHeaderInicio: FC<AvatarHeaderInicioProps> = (props: AvatarHeaderInicioProps) => {
  const { userIcon, nomeUsuario = "Usuário", nomeUnidade = "Unidade" } = props;
  return (
    <Button color="inherit" sx={{ textTransform: "none" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 0 }}>
        <Avatar sx={{ width: 40, height: 40 }}>{userIcon}</Avatar>

        <Box sx={{ textAlign: "left" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", lineHeight: 1 }}
          >
            {nomeUsuario}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1 }}>
            {nomeUnidade}
          </Typography>
        </Box>
        <KeyboardArrowDownIcon sx={{ color: "white" }} />
      </Box>
    </Button>
  );
};

export default CustomAvatarHeaderInicio;
