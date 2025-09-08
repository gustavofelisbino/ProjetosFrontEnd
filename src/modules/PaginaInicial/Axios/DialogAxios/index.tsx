import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Divider, TextField, Stack
} from "@mui/material";
import { getFrutas, getFrutaById, deleteFruta, createFruta } from "../../../../api/frutas";
import type { Fruta } from "../../../../api/frutas";

type Props = {
  renderTrigger?: (open: () => void) => React.ReactNode;
  title?: string;
  desc?: string;
};

export default function DialogAxios({
  renderTrigger,
  title = "Axios",
  desc = "Exemplo simples de requisições ao backend.",
}: Props) {
  const [open, setOpen] = useState(false);
  const [frutas, setFrutas] = useState<Fruta[]>([]);
  const [idInput, setIdInput] = useState("1");
  const [status, setStatus] = useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStatus("");
  };

  const handleListar = async () => {
    try {
      setStatus("Carregando frutas...");
      const data = await getFrutas();
      setFrutas(data);
      setStatus(`OK: ${data.length} item(ns)`);
    } catch (e: any) {
      setStatus(`Erro ao listar: ${e?.message || e}`);
    }
  };

  const handleBuscarPorId = async () => {
    try {
      setStatus(`Buscando fruta ${idInput}...`);
      const data = await getFrutaById(Number(idInput));
      setFrutas((prev) => prev.map((f) => f.id === Number(idInput) ? data : f));
      setStatus("OK");
    } catch (e: any) {
      setStatus(`Erro ao buscar: ${e?.response?.status || ""} ${e?.message || e}`);
    }
  };

  const handleCriar = async () => {
    try {
      setStatus("Criando fruta...");
      const now = new Date();
      const payload: Fruta = {
        fruta: `Fruta ${Math.floor(Math.random() * 1000)}`,
        valor: Number((Math.random() * 10 + 1).toFixed(2)),
        dataVencimento: new Date(now.getFullYear() + 1, 11, 31).toISOString(),
        descricao: "Criada via front",
        status: "Ativa",
      };
      const criada = await createFruta(payload);
      setStatus(`Criada: #${criada.id} ${criada.fruta}`);
      setFrutas((prev) => [...prev, criada]);
    } catch (e: any) {
      setStatus(`Erro ao criar: ${e?.message || e}`);
    }
  };

  const handleDeletar = async () => {
    try {
      setStatus(`Deletando fruta ${idInput}...`);
      await deleteFruta(Number(idInput));
      setFrutas((prev) => prev.filter((f) => f.id !== Number(idInput)));
      setStatus("Deletada com sucesso");
    } catch (e: any) {
      setStatus(`Erro ao deletar: ${e?.message || e}`);
    }
  };

  return (
    <>
      {renderTrigger ? (
        renderTrigger(handleOpen)
      ) : (
        <Button variant="contained" onClick={handleOpen}>Ver exemplo</Button>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>

        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 2 }}>{desc}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2">Lista:</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {frutas.length
              ? frutas.map((f) => 
                `${f.id} - ${f.fruta}`).join(", ") || "Nenhum selecionado"
              : "Sem itens"}
          </Typography>

          <Typography variant="subtitle2">Descrição:</Typography>
          <Typography variant="body2">
            {frutas.map((f) => f.descricao).join(", ") || "Nenhum selecionado"}
          </Typography>
        </DialogContent>
        <DialogContent sx={{ mt: 2, p: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <TextField
              size="small"
              label="ID"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
            />
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Button variant="outlined" onClick={handleListar}>Listar frutas</Button>
            <Button variant="outlined" onClick={handleCriar}>Criar fruta</Button>
            <Button variant="outlined" onClick={handleBuscarPorId}>Buscar por ID</Button>
            <Button variant="outlined" color="error" onClick={handleDeletar}>Deletar por ID</Button>
        </Stack>
        <Typography variant="caption" color="text.secondary">
            {status || "Clique em uma ação acima."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
