# DepositBilletNumberChecker

Este programa define uma API para verificar se o número de um boleto é válido.

## Requisitos

Para executar o projeto, devem estar instalados:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Instalando

- Clone o repositório:

```sh
git clone https://github.com/nhtoshiaki/DepositBilletNumberChecker.git
cd DepositBilletNumberChecker
```

- Instale as dependências:

```sh
npm install
```

## Como usar

Para executar o servidor:

```sh
npm start
```

Com o servidor em execução, para testar utilize algum programa de consumo de API como o [Postman](https://www.getpostman.com/).

## API

### Checa Boleto

Retorna JSON com informações se o boleto é válido, a data de vencimento e o valor.

- **URL**

```
/boleto
```

- **Método**

```
POST
```

- **Parâmetros dos Dados**

```
linhaDigitavel=[string]
```

- **Resposta bem sucedida**

    - **Código**: 200
    - **Exemplo do conteúdo**: `{ valido: true, valorAPagar: 30, vencimento: '2019-12-30' }`

- **Resposta de Erro**

    - **Parâmetro ausente**
    
        - **Código**: 422
        - **Conteúdo**: `{ error: "Linha digitável não definida." }`
    
    - **Erro no processamento**

        - **Código**: 500
        - **Conteúdo**: `{ error: "Erro durante processamento da linha digitável." }`