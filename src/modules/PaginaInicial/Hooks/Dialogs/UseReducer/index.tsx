import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box
} from "@mui/material";

type Props = {
  renderTrigger?: (open: () => void) => React.ReactNode;
  title?: string;
  desc?: string;
  code?: string;
};

export default function DialogUseReducer({
  renderTrigger,
  title = "useReducer",
  desc = "useReducer ajuda a controlar estados mais complexos de forma organizada, parecido com o useState, mas com regras definidas.",
  code = `const [state, dispatch] = useReducer(reducer, initialState);
return <button onClick={() => dispatch({ type: "increment" })}>{state}</button>;`,
}: Props) {
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
