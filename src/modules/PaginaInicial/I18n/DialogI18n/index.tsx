import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography,
  Divider
} from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  renderTrigger?: (open: () => void) => React.ReactNode;
  title?: string;
  desc?: string;
};

export default function DialogI18n({
  renderTrigger,
  title = "I18n",
  desc = "O I18n adiciona internacionalização a aplicação.",
}: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { t } = useTranslation();
  const i18n = useTranslation().i18n;

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
        </DialogContent>
        <Typography variant="caption" color="text.secondary" sx={{ p: 2 }}>Exemplo</Typography>
        <Typography variant="body2" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {t("temcertezaque")}
        </Typography>
        <Divider sx={{ mt: 4 }}/>
        <DialogActions sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => i18n.changeLanguage("pt-BR")}>PT</Button>
            <Button variant="contained" onClick={() => i18n.changeLanguage("en-US")}>EN</Button>
        </DialogActions>
        <DialogActions sx={{ mt: 1 }}>
          <Button onClick={handleClose} variant="contained">Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
