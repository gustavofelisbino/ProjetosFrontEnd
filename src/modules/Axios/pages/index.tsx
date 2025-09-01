import PrimarySearchAppBar from "../../../components/AppBar";
import { GetFrutas, CreateFruta } from "../../../api";
import { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";

export default function AxiosPage() {
    const [frutas, setFrutas] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
          const data = await GetFrutas();
          setFrutas(data.products);
        })();
      }, []);

      const adicionar = async () => {
        const nova = await CreateFruta({ title: "Maracujá", price: 7 });
        setFrutas((prev) => [...prev, nova]);
      };
      
    return (
        <>
        <PrimarySearchAppBar />
        <Button onClick={adicionar}>Adicionar</Button>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {frutas.map((fruta: any) => (
                <Box key={fruta.id} sx={{ display: "flex", gap: 2 }}>
                    <Typography>{fruta.title}</Typography>
                    <Typography>{fruta.price}</Typography>
                </Box>
            ))}
        </Box>
        </>
    );
}
