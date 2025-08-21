import { Box, Typography } from "@mui/material";
import PrimarySearchAppBar from "../../components/AppBar";

export default function DetalhesFrutas() {

    return (
        <Box>
            <PrimarySearchAppBar color="primary" />
            <Typography variant="h5" sx={{ fontWeight: "600"}}>Detalhes da Fruta</Typography>
        </Box>
    );
}
