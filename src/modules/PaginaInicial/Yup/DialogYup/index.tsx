import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, TextField,
  Box
} from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { FC } from 'react';

type DialogYupProps = {
  renderTrigger?: (open: () => void) => React.ReactNode;
  title?: string;
  desc?: string;
};

const YupExemplo = yup.object({
    nome: yup.string()
    .required("O nome é obrigatório")
    .min(5, "O nome deve ter pelo menos 5 caracteres")
    .max(50, "O nome não pode ter mais de 50 caracteres"),
    email: yup.string()
    .email("Email inválido")
    .required("O email é obrigatório")
}) 

export const DialogYup: FC<DialogYupProps> = ({
  renderTrigger,
  title = "Yup",
  desc = "O Yup adiciona validação de dados.",
}: DialogYupProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, formState: { errors } } = useForm({
    resolver: yupResolver(YupExemplo),
    mode: "onChange"
  });

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
          <Typography variant="caption" color="text.secondary">Exemplo</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <TextField {...field} 
              label="Nome"
              sx={{ mb: 2 }}
              fullWidth
              error={!!errors.nome}
              helperText={errors.nome?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} 
              label="Email"
              sx={{ mb: 2 }}
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              />
            )}
          />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
