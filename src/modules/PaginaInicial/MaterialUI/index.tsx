import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { theme } from "../../../themes";
import { useNavigate } from "react-router-dom";
import type { FC } from 'react';

export const MaterialUI: FC = () => {
    const navigate = useNavigate();
    const navigateToProjetoCompleto = () => navigate("/projeto-completo");
    return (
        <>
        <Box sx={{ maxWidth: 1000, mx: "auto", p: 2, mt: 2 }}>
            <Typography variant="h5" fontWeight={400} fontSize={32} sx={{ textAlign: "center", color: "#e0dee3" }}>
                Material UI
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center", color: "#e0dee3" }}>
                Explicação sobre o Material UI.
            </Typography>
        </Box>
        <Box sx={{ maxWidth: 800, mx: "auto", p: 2, mt: 1 }}>
            <Card 
            sx={{ 
                backgroundColor: "transparent",
                border: "1px solid #e4e3e6",
                borderRadius: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                '&:hover': {
                    backgroundColor: "#1A1027",
                    transition: "background-color 0.3s ease-in-out",
                    color: "#e0dee3",
                  },
                }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 2 }}>
                    <Typography variant="h6" fontWeight={500} fontSize={24} sx={{ color: "#e4e3e6", fontWeight: "bold" }}>
                        Material UI
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#e4e3e6" }}>
                        Material UI é uma biblioteca JS para componentes React.
                    </Typography>
                    <Button onClick={navigateToProjetoCompleto} 
                    variant="outlined" color="primary" sx={{ 
                      mt: "auto",
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        transition: "background-color 0.4s ease-in-out",
                        color: theme.palette.primary.contrastText,
                      },
                    }}>
                        Ir para projeto
                    </Button>
                </CardContent>
            </Card>
        </Box>
        </>
    )
}