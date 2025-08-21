import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export const DialogExcluir = ({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth sx={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
            <DialogTitle>Excluir</DialogTitle>
            <DialogContent>
                <p>Tem certeza que deseja excluir?</p>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', gap: 1 }}>
                <Button onClick={onClose} sx={{ fontFamily: 'Roboto', backgroundColor: 'primary.main', color: 'white'}}>Cancelar</Button>
                <Button onClick={onConfirm} sx={{ fontFamily: 'Roboto', backgroundColor: 'error.main', color: 'white'}}>Excluir</Button>
            </DialogActions>
        </Dialog>
    );
};