import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import DialogI18n from "./DialogI18n";
import { theme } from "../../../themes";

export default function I18n() {
    return (
        <>
        <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
        <Typography variant="h5" fontWeight={400} fontSize={32}
            sx={{ 
                textAlign: "center",
                color: "#e0dee3",
                mt: 2
            }}>
            I18n
            </Typography>
            <Typography variant="body1"
            sx={{
                textAlign: "center",
                color: "#e0dee3",
                mt: 2
            }}>
                Explicação sobre o I18n.
            </Typography>
        </Box>
        <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
            <Card 
            sx={{ 
                backgroundColor: "transparent",
                border: "1px solid #e4e3e6",
                borderRadius: 2, height: "100%",
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
                        I18n
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#e4e3e6" }}>
                        I18n é uma biblioteca JS para internacionalização.
                    </Typography>
                    <DialogI18n 
                    renderTrigger={(open) => (
                        <Button 
                            variant="outlined" 
                            color="primary"
                            onClick={open}
                            sx={{ 
                              mt: "auto",
                              '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                transition: "background-color 0.4s ease-in-out",
                                color: theme.palette.primary.contrastText,
                              },
                            }}>
                            Ver exemplo
                        </Button>
                    )}
                    />
                </CardContent>
            </Card>
        </Box>
        </>
    );
}
