import React, { useState, useReducer, useEffect, Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { CarrinhoProvider, useCarrinho } from "../../../contexts/CarrinhoContext";
import {
  Box,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ThemeProvider,
} from "@mui/material";
import AppBar from "../../../components/AppBar";
import { theme } from "../../../themes";
import { useFrutas } from "../../../contexts/FrutasContext";
import type { Fruta } from "../../../contexts/FrutasContext";

interface IState {
  count: number;
}

type TAction = { type: "incrementar" | "decrementar" };

const contadorReducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case "incrementar":
      return { count: state.count + 1 };
    case "decrementar":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const BotaoPrimario: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <Button variant="contained" color="primary" sx={{ padding: "6px" }} onClick={onClick}>
    {children}
  </Button>
);

const FrutasActions: React.FC<{ frutaAtual: string; onTrocar: () => void }> = ({
  frutaAtual,
  onTrocar,
}) => {
  const { adicionar } = useCarrinho();

  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
      <BotaoPrimario onClick={onTrocar}>Trocar</BotaoPrimario>
      <BotaoPrimario onClick={() => adicionar(frutaAtual)}>
        Adicionar ao Carrinho
      </BotaoPrimario>
    </Box>
  );
};

const CarrinhoToggle: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const { totalItens } = useCarrinho();

  return (
    <BotaoPrimario onClick={onToggle}>
      Carrinho ({totalItens})
    </BotaoPrimario>
  );
};

const CarrinhoItens: React.FC<{ mostrar: boolean }> = ({ mostrar }) => {
  const { carrinho } = useCarrinho();

  if (!mostrar) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          Itens no Carrinho
        </Typography>

        {carrinho.length === 0 ? (
          <Typography variant="h6" sx={{ color: "red", fontWeight: "bold" }}>
            O carrinho está vazio
          </Typography>
        ) : (
          <List sx={{ color: "black", fontWeight: "300", fontFamily: "Roboto" }}>
            {carrinho.map((item, idx) => (
              <ListItem key={idx}>
                {item.nome} - {item.quantidade}x
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

const AppInterno: React.FC = () => {
  const { frutas } = useFrutas();
  const [frutaAtual, setFrutaAtual] = useState<Fruta | null>(null);
  const [state, dispatch] = useReducer(contadorReducer, { count: 0 });
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  useEffect(() => {
    if (frutas.length > 0 && !frutaAtual) {
      setFrutaAtual(frutas[0]);
    }
  }, [frutas, frutaAtual]);

  const handleTrocarFruta = () => {
    if (frutaAtual && frutas.length > 0) {
      const currentIndex = frutas.findIndex(f => f.id === frutaAtual.id);
      const nextIndex = (currentIndex + 1) % frutas.length;
      setFrutaAtual(frutas[nextIndex]);
    }
  };

  useEffect(() => {
    console.log(`O valor do contador é: ${state.count}`);
  }, [state.count]);

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
      <Paper
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          width: "60%",
          bgcolor: "grey.50",
        }}
      >
        <CarrinhoToggle onToggle={() => setMostrarCarrinho((prev) => !prev)} />

        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Contador
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <BotaoPrimario onClick={() => dispatch({ type: "incrementar" })}>
            Incrementar
          </BotaoPrimario>
          <BotaoPrimario onClick={() => dispatch({ type: "decrementar" })}>
            Decrementar
          </BotaoPrimario>
        </Box>

        <Typography variant="h5" sx={{ color: "purple", fontWeight: "500" }}>
          {state.count}
        </Typography>

        {frutaAtual && (
          <>
            <Typography variant="h5">{frutaAtual.fruta} - R$ {frutaAtual.valor.toFixed(2)}</Typography>
            <FrutasActions frutaAtual={frutaAtual.fruta} onTrocar={handleTrocarFruta} />
          </>
        )}

        <CarrinhoItens mostrar={mostrarCarrinho} />
      </Paper>
    </Box>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Ocorreu um erro inesperado
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {this.state.error?.message || 'Por favor, recarregue a página e tente novamente.'}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Recarregar Página
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <AppBar color="primary" />
    <CarrinhoProvider>
      <ErrorBoundary>
        <AppInterno />
      </ErrorBoundary>
    </CarrinhoProvider>
  </ThemeProvider>
);

export default App;
