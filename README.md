# skate-shop

## `.env`

```bash
DB_DATABASE=
DB_USER=
DB_PASSWORD=
HTTP_PORT=
```

## Como rodar o projeto

### Desenvolvimento

```bash
yarn run dev
```

### Produção

```
yarn run start
```

## Rotas

### Clientes

- /clients [POST, GET, DELETE]
- /clients/update [POST]
- /clients/order/:orderId [GET]

### Products

- /products [GET, POST]

### Orders

- /orders [GET, POST, DELETE]
- /orders/products/orderId [GET]
