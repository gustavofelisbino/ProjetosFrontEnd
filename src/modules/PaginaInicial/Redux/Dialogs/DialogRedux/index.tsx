import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box
} from "@mui/material";
import type { FC } from 'react';

type DialogReduxProps = {
  renderTrigger?: (open: () => void) => React.ReactNode;
  title?: string;
  desc?: string;
  code?: string;
};

export const DialogRedux: FC<DialogReduxProps> = ({
  renderTrigger,
  title = "Redux",
  desc = "Redux centraliza o estado da aplicação em um só lugar, tornando seu gerenciamento previsível e fácil de manter.",
  code = `const store = createStore(reducer);
return <Provider store={store}><App /></Provider>;`,
}: DialogReduxProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Box component="pre" sx={{
            m: 0, mt: .5, p: 1.5, bgcolor: "grey.900", color: "grey.100",
            borderRadius: 1, border: "1px solid", borderColor: "divider",
            overflow: "auto", fontSize: 13.5, lineHeight: 1.5, whiteSpace: "pre-wrap"
          }}>
            <code>{code}</code>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
