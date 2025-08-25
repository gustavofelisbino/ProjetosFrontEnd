import { Dialog, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { alpha } from '@mui/material/styles';
import type { Fruta } from '../../components/Tabela';

export const DialogExcluir = ({ open, onClose, onConfirm, fruta }: { open: boolean; onClose: () => void; onConfirm: () => void; fruta: Fruta }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth sx={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
            <DialogContent>
                <Box sx={{ display: 'flex', gap: 2, p: 1 }}>
                    <ErrorIcon sx={{ color: 'error.main', padding: 1, backgroundColor: (theme) => alpha(theme.palette.error.main, 0.2), borderRadius: 20 }} />
                    <Typography variant="h5" fontWeight="bold" sx={{ mt: 1, color: '#616161' }}>Excluir</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, p: 1, mt: 2 }}>
                    <Typography variant="h6" fontWeight="400" sx={{ mb: 2 }}>Tem certeza que deseja excluir a fruta:</Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>{fruta.fruta}?</Typography>
                </Box>
                <DialogActions sx={{ display: 'flex', gap: 1 }}>
                    <Button onClick={onClose} sx={{ fontFamily: 'Roboto', backgroundColor: 'primary.main', color: 'white'}}>Cancelar</Button>
                    <Button onClick={onConfirm} sx={{ fontFamily: 'Roboto', backgroundColor: 'error.main', color: 'white'}}>Excluir</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};