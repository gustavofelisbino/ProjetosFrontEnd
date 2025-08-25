import { Dialog, DialogContent, Button, Typography, Box, Avatar, Paper, Card, CardContent, Chip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { Fruta } from "../../../../components/Tabela";
import { formatCurrency } from "../../../../utils/formatCurrency";

interface IDetalhes {
    open: boolean;
    onClose: () => void;
    fruta?: Fruta;
}

export const DialogDetalhes = ({ open, onClose, fruta }: IDetalhes) => {
    if (!fruta) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <Paper 
                elevation={0}
                sx={{
                    p: 2,
                    background: 'linear-gradient(to bottom, #f5f5f5 0%, #e0e0e0 100%)',
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                <Avatar 

                    alt={fruta.fruta}
                    sx={{ width: 56, height: 56 }}
                />
                <Typography variant="h6" fontWeight="bold">{fruta.fruta}</Typography>
                <Typography variant="body2" color="text.secondary">Código: {fruta.id}</Typography>
                </Box>
                <Card 
                    elevation={3}
                    sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        width: '100%',
                        bgcolor: 'background.paper'
                    }}
                >
                    <CardContent sx={{ p: 0 }}>
                        
                        <DialogContent>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">Valor</Typography>
                                <Typography variant="h6" fontWeight="bold">{formatCurrency(fruta.valor)}</Typography>
                            </Box>
                            
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Status</Typography>
                                <Chip
                                    icon={fruta.status === 'Ativo' ? 
                                        <CheckCircleIcon fontSize="small" /> : 
                                        <CancelIcon fontSize="small" />
                                    }
                                    label={fruta.status}
                                    color={fruta.status === 'Ativo' ? 'success' : 'error'}
                                    variant="outlined"
                                    sx={{
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        '& .MuiChip-icon': {
                                            color: fruta.status === 'Ativo' ? 'success.main' : 'error.main',
                                        },
                                        borderColor: fruta.status === 'Ativo' ? 'success.main' : 'error.main',
                                        color: fruta.status === 'Ativo' ? 'success.dark' : 'error.dark',
                                    }}
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">Descrição</Typography>
                                <Typography variant="body2">
                                    {fruta.descricao}
                                </Typography>
                            </Box>
                        </DialogContent>
                    </CardContent>                
                </Card>
                        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2, mt: 3 }}>
                            <Button 
                                variant="outlined" 
                                onClick={onClose}
                                sx={{
                                    py: 1,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 'bold'
                                }}
                            >
                                Fechar
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary"
                                disabled={fruta.status !== 'Ativo'}
                                sx={{
                                    py: 1,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                Adicionar ao Carrinho
                            </Button>
                        </Box>
        </Paper>
    </Dialog>
    );
};