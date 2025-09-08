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

export default function DialogUseCallback({
  renderTrigger,
  title = "useCallback",
  desc = "useCallback memoriza uma função para evitar que ela seja recriada a cada renderização do componente.",
  code = `const handleClick = useCallback(() => {
  console.log("handleClick");
}, []);`,
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
