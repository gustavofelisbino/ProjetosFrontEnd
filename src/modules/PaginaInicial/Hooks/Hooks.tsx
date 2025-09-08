import {
  Button,
  Typography,
  Stack,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { theme } from "../../../themes";
import DialogUseState from "./Dialogs/UseState";
import DialogUseEffect from "./Dialogs/UseEffect";
import DialogUseContext from "./Dialogs/UseContext";
import DialogUseMemo from "./Dialogs/UseMemo";
import DialogUseRef from "./Dialogs/UseRef";
import DialogUseReducer from "./Dialogs/UseReducer";
import DialogUseCallback from "./Dialogs/UseCallback";

export default function Hooks() {
  return (
<Stack spacing={3} sx={{ maxWidth: 1000, mx: "auto", p: 2, mt: 2, display: "flex" }}>
 <Typography 
    variant="h5" fontWeight={400} fontSize={32}
    sx={{ 
        textAlign: "center",
        color: "#e0dee3"
    }}>
    Uso de Hooks
 </Typography>
 <Typography variant="body1" color="#e0dee3"
    sx={{
        textAlign: "center",
    }}>
    Explicação sobre cada tipo de hook.
 </Typography>

 <Box
  sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
    gap: 2,
    maxWidth: 1000,
    mx: "auto",
    p: 2,
    mt: 2,
  }}
>
  <Card
    sx={{
      backgroundColor: "transparent",
      border: "1px solid #e4e3e6",
      borderRadius: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      '&:hover': {
        backgroundColor: "#1A1027",
        transition: "background-color 0.3s ease-in-out",
        color: "#e0dee3",
      },
    }}
  >
    <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 2 }}>
      <Typography variant="h6" fontWeight={500} fontSize={24} sx={{ color: "#e4e3e6", fontWeight: "bold" }}>
        useState
      </Typography>
      <DialogUseState 
        renderTrigger={(open) => (
          <Button 
            variant="outlined" 
            color="primary"
            onClick={open}
            sx={{ 
              mt: "auto",
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                transition: "background-color 0.4s ease-in-out",
                color: theme.palette.primary.contrastText,
              },
            }}>
            Ver exemplo
          </Button>
        )}
      />
    </CardContent>
  </Card>
  <Card
    sx={{
      backgroundColor: "transparent",
      border: "1px solid #e4e3e6",
      borderRadius: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      '&:hover': {
        backgroundColor: "#1A1027",
        transition: "background-color 0.3s ease-in-out",
        color: "#e0dee3",
      },
    }}
  >
    <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 2 }}>
      <Typography variant="h6" fontWeight={500} fontSize={24} sx={{ color: "#e4e3e6", fontWeight: "bold" }}>
        useEffect
      </Typography>
      <DialogUseEffect 
        renderTrigger={(open) => (
          <Button 
            variant="outlined" 
            color="primary"
            onClick={open}
            sx={{ 
              mt: "auto",
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                transition: "background-color 0.4s ease-in-out",
                color: theme.palette.primary.contrastText,
              },
            }}>
            Ver exemplo
          </Button>
        )}
      />
    </CardContent>
  </Card>
  <Card
    sx={{
      backgroundColor: "transparent",
      border: "1px solid #e4e3e6",
      borderRadius: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      '&:hover': {
        backgroundColor: "#1A1027",
        transition: "background-color 0.3s ease-in-out",
        color: "#e0dee3",
      },
    }}
  >
    <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 2 }}>
      <Typography variant="h6" fontWeight={500} fontSize={24} sx={{ color: "#e4e3e6", fontWeight: "bold" }}>
        useContext
      </Typography>
      <DialogUseContext
        renderTrigger={(open) => (
          <Button 
            variant="outlined" 
            color="primary"
            onClick={open}
            sx={{ 
              mt: "auto",
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                transition: "background-color 0.4s ease-in-out",
                color: theme.palette.primary.contrastText,
              },
            }}>
            Ver exemplo
          </Button>
        )}
      />
    </CardContent>
  </Card>
  <Card
    sx={{
      backgroundColor: "transparent",
      border: "1px solid #e4e3e6",
      borderRadius: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      '&:hover': {
        backgroundColor: "#1A1027",
        transition: "background-color 0.3s ease-in-out",
        color: "#e0dee3",
      },
    }}
  >
    <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 2 }}>
      <Typography variant="h6" fontWeight={500} fontSize={24} sx={{ color: "#e4e3e6", fontWeight: "bold" }}>
        useMemo
      </Typography>
      <DialogUseMemo 
        renderTrigger={(open) => (
          <Button 
            variant="outlined" 
            color="primary"
            onClick={open}
            sx={{ 
              mt: "auto",
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                transition: "background-color 0.4s ease-in-out",
                color: theme.palette.primary.contrastText,
              },
            }}>
            Ver exemplo
          </Button>
        )}
      />
    </CardContent>
  </Card>
  <Card
    sx={{
      backgroundColor: "transparent",
      border: "1px solid #e4e3e6",
      borderRadius: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      '&:hover': {
        backgroundColor: "#1A1027",
        transition: "background-color 0.3s ease-in-out",
        color: "#e0dee3",
      },
    }}
  >
    <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 2 }}>
      <Typography variant="h6" fontWeight={500} fontSize={24} sx={{ color: "#e4e3e6", fontWeight: "bold" }}>
        useRef
      </Typography>
      <DialogUseRef 
        renderTrigger={(open) => (
          <Button 
            variant="outlined" 
            color="primary"
            onClick={open}
            sx={{ 
              mt: "auto",
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                transition: "background-color 0.4s ease-in-out",
                color: theme.palette.primary.contrastText,
              },
            }}>
            Ver exemplo
          </Button>
        )}
      />
    </CardContent>
  </Card>
  <Card
    sx={{
      backgroundColor: "transparent",
      border: "1px solid #e4e3e6",
      borderRadius: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      '&:hover': {
        backgroundColor: "#1A1027",
        transition: "background-color 0.3s ease-in-out",
        color: "#e0dee3",
      },
    }}
  >
    <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 2 }}>
      <Typography variant="h6" fontWeight={500} fontSize={24} sx={{ color: "#e4e3e6", fontWeight: "bold" }}>
        useReducer
      </Typography>
      <DialogUseReducer 
        renderTrigger={(open) => (
          <Button 
            variant="outlined" 
            color="primary"
            onClick={open}
            sx={{ 
              mt: "auto",
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                transition: "background-color 0.4s ease-in-out",
                color: theme.palette.primary.contrastText,
              },
            }}>
            Ver exemplo
          </Button>
        )}
      />
    </CardContent>
  </Card>
  <Card
    sx={{
      backgroundColor: "transparent",
      border: "1px solid #e4e3e6",
      borderRadius: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      '&:hover': {
        backgroundColor: "#1A1027",
        transition: "background-color 0.3s ease-in-out",
        color: "#e0dee3",
      },
    }}
  >
    <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 2 }}>
      <Typography variant="h6" fontWeight={500} fontSize={24} sx={{ color: "#e4e3e6", fontWeight: "bold" }}>
        useCallback
      </Typography>
      <DialogUseCallback 
        renderTrigger={(open) => (
          <Button
            variant="outlined"
            color="primary"
            onClick={open}
            sx={{ 
              mt: "auto",
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                transition: "background-color 0.4s ease-in-out",
                color: theme.palette.primary.contrastText,
              },
            }}>
            Ver exemplo
          </Button>
        )}
      />
    </CardContent>
  </Card>
</Box>
</Stack>)
}