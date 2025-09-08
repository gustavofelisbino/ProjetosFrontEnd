import { 
    Dialog, 
    DialogContent, 
    Button, 
    Typography, 
    Box, 
    Paper, 
    Card, 
    CardContent, 
    Chip 
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ZoomIn from '@mui/icons-material/ZoomIn';
import { alpha } from "@mui/material/styles";
import type { Fruta } from "../../../../components/Tabela";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { formatDate } from "../../../../utils/formatDate";
import theme from "../../../../themes";
import { useTranslation } from "react-i18next";
import type { FC } from "react";

interface IDetalhes {
    open: boolean;
    onClose: () => void;
    fruta?: Fruta;
}

export const DialogDetalhes: FC<IDetalhes> = ({ open, onClose, fruta }) => {
    const { t } = useTranslation();
    if (!fruta) return null;

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            sx={{ borderRadius: 2, color: '#616161' }}
        >
            <Paper 
                elevation={0}
                sx={{
                    p: 2,
                    background: 'linear-gradient(to bottom, #f5f5f5 0%, #e0e0e0 100%)',
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <ZoomIn 
                        sx={{ 
                            p: 1, 
                            fontSize: 32, 
                            backgroundColor: alpha(theme.palette.primary.dark, 0.3), 
                            borderRadius: 20, 
                            color: '#000' 
                        }} 
                    />
                    <Typography fontWeight="bold" sx={{ fontSize: 24, color: '#616161' }}>
                        {fruta.fruta}
                    </Typography>
                </Box>

                <Card elevation={2} sx={{ borderRadius: 2, width: '100%', bgcolor: 'background.paper' }}>
                    <CardContent>
                        <DialogContent>
                            <Typography variant="h5" sx={{ color: '#616161', mb: 2 }}>
                                {t('dadosDaFruta')}
                            </Typography>

                            <Box display="flex" justifyContent="space-between">
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="h6" fontWeight="400" color="text.secondary">
                                        {t('identificacao')}
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold">{fruta.id}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="h6" fontWeight="400" color="text.secondary">
                                        {t('valor')}
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold">
                                        {formatCurrency(fruta.valor)}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="h6" fontWeight="400" color="text.secondary">
                                        {t('dataDeVencimento')}
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold">
                                        {formatDate(fruta.dataVencimento)}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="h6" fontWeight="400" color="text.secondary">
                                        {t('status')}
                                    </Typography>
                                    <Chip
                                        icon={fruta.status === 'Ativo' 
                                            ? <CheckCircleIcon fontSize="small" /> 
                                            : <CancelIcon fontSize="small" />
                                        }
                                        label={fruta.status}
                                        variant="outlined"
                                        sx={{
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            '& .MuiChip-icon': {
                                                color: fruta.status === 'Ativo' 
                                                    ? theme.palette.success.dark 
                                                    : theme.palette.error.dark,
                                            },
                                            borderColor: fruta.status === 'Ativo' 
                                                ? theme.palette.success.main 
                                                : theme.palette.error.main,
                                            color: fruta.status === 'Ativo' 
                                                ? theme.palette.success.dark 
                                                : theme.palette.error.dark,
                                        }}
                                    />
                                </Box>
                            </Box>
                        </DialogContent>
                    </CardContent>
                </Card>

                <Card 
                    elevation={2}
                    sx={{ borderRadius: 2, width: '100%', bgcolor: 'background.paper', mt: 2 }}
                >
                    <CardContent>
                        <DialogContent>
                            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                                {t('descricao')}
                            </Typography>
                            <Box>
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
                        {t('fechar')}
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
                        {t('adicionarAoCarrinho')}
                    </Button>
                </Box>
            </Paper>
        </Dialog>
    );
};
