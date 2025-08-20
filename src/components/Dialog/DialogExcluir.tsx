import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export const DialogExcluir = ({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth sx={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
            <DialogTitle>Excluir</DialogTitle>
            <DialogContent>
                <p>Tem certeza que deseja excluir?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onConfirm}>Excluir</Button>
            </DialogActions>
        </Dialog>
    );
};