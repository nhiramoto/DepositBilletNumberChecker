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

`/api/boleto`

- **Método**

`POST`


- **Parâmetros dos Dados**

`linhaDigitavel=[string]`


- **Resposta bem sucedida**

    - **Código**: 200
    - **Exemplo do conteúdo**:

    ```json
    {
        valido: true,
        valor: 30,
        vencimento: 'Tue Oct 09 2018 21:00:00 GMT-0300 (Brasilia Standard Time)',
        linhaDigitavel: '00000000000000000000000000000000000000000000000'
    }
    ```

- **Resposta de Erro**

    - **Parâmetro ausente**

        - **Código**: 422
        - **Conteúdo**:

        ```json
        {
            error: "Linha digitável não definida."
        }
        ```

    - **Erro no processamento**

        - **Código**: 500
        - **Conteúdo**:

        ```json
        {
            error: "Erro durante processamento da linha digitável."
        }
        ```
