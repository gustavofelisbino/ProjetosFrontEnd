# Projeto de Estudos no React

## Utilizei os seguintes hooks para o estudo:

- useState

- useReducer

- useEffect

- useContext

A aplicação consiste em um contador de frutas e um carrinho de compras, no qual é possível adicionar itens, trocar a fruta que será exibida/adicionada e visualizar a lista no carrinho.

Foi utilizado React com TypeScript e os hooks acima, além de um CSS simples para estilização.

## Estrutura e Funcionamento

1. useReducer

- Utilizado no contador de frutas.

- Implementa um switch para controlar as ações incrementar e decrementar.

- A vantagem é evitar múltiplos useState para operações de incremento/decremento.

2. useState

- Mantém o estado da fruta selecionada (iniciando com "Banana").

- Controla a visibilidade do carrinho (true ou false).

- No CarrinhoContext, mantém a lista de itens do carrinho.

3. useEffect

- Usado para observar mudanças no contador.

- Dispara um console.log toda vez que o valor do contador é incrementado ou decrementado.

4. useContext

- Criado para gerenciar o estado global do carrinho.

- Implementado com createContext e CarrinhoProvider.

- Permite adicionar itens e exibir o total de forma global, sem necessidade de passar props manualmente.

## Objetivo
Este projeto foi desenvolvido exclusivamente para fins de estudo, com o objetivo de consolidar conceitos de hooks e contexto no React.

Evitei ao máximo o uso de inteligência artificial como o ChatGPT, utilizando apenas o autocomplete no Windsurf.

Além disso, procurei seguir a linha de código utilizada na Next Fit.