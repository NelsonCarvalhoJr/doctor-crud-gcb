# Cadastro de Médicos

Sistema para teste da empresa GCB Investimentos contendo um CRUD de médicos.

## Entidades

| Tabela | Campos |
| - | - |
| doctor | id, name, crm, telephone, cell_phone, postcode, speciality_id |
| speciality | id, name |

## Funcionalidades

- Cadastro, alteração e consulta e exclusão de médicos

## Recursos

- Api padrão REST
- Validação com Yup
- Funções especializadas (apenas uma operação)
- Uso do Insomnia
- Uso de Docker
- Testes unitários com Jest
- Banco de Dados MySQL

## Tecnologias

- Backend em TypeScript
- TypeORM,
- Express
- Migrations
- Front-end em ReactJS

## Configurações

**Pasta *./backend***
- criar um arquivo **ormconfig.json** com o conteúdo de **ormconfig.example.json**, preenchendo o campo   de senha
- Instalar dependênciar, executar migrações e iniciar a aplicação conforme abaixo

```bash
yarn
yarn typeorm migration:run
yarn dev:server
```

## Testes

- Testes no backend através do comando abaixo

```bash
yarn test
```
## Build

- Gerar build do backend através do comando abaixo

```bash
yarn build
```