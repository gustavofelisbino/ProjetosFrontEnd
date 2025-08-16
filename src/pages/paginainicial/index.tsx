import React, { useState, useReducer, useEffect } from "react";
import { CarrinhoProvider, useCarrinho } from "../../contexts/CarrinhoContext";
import {
  Box,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ThemeProvider,
} from "@mui/material";
import AppBar from "../../components/AppBar";
import Theme from "../../themes";

const frutas = ["Banana", "Maçã", "Laranja", "Uva"];

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
  const [frutaAtual, setFrutaAtual] = useState(frutas[0]);
  const [state, dispatch] = useReducer(contadorReducer, { count: 0 });
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  const handleTrocarFruta = () => {
    const proximaIndex = (frutas.indexOf(frutaAtual) + 1) % frutas.length;
    setFrutaAtual(frutas[proximaIndex]);
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
          bgcolor: "secondary.main",
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

        <Typography variant="h5">{frutaAtual}</Typography>
        <FrutasActions frutaAtual={frutaAtual} onTrocar={handleTrocarFruta} />

        <CarrinhoItens mostrar={mostrarCarrinho} />
      </Paper>
    </Box>
  );
};

const App: React.FC = () => (
  <ThemeProvider theme={Theme}>
    <AppBar />
    <CarrinhoProvider>
      <AppInterno />
    </CarrinhoProvider>
  </ThemeProvider>
);

export default App;
