# aaossa_fansclub_backend

# Descripción
* :pencil2: **Nombre Grupo:** aaossa_fansclub
* **Link https://aaossa-fansclub-backend-ws9l.onrender.com/**

# Documentación
* **Link https://documenter.getpostman.com/view/34092389/2sA3XQh23m/**

## Postgres y Base de Datos Local
```
1. Inicializar psql
sudo -u postgres psql
2. Crear el usuario de postgres
sudo -u postgres createuser --superuser backend_planossa_user
3. Crear la base de datos
sudo -u postgres createdb backend_planossa
4. Crear la clave del usuario dentro de postgres:
ALTER USER backend_planossa_user WITH PASSWORD "DjburEh9tMsOU79ooPFt5sT9F238C2Ev";
5. Conectarse a la base de datos
psql -U backend_planossa_user -d backend_planossa -h 127.0.0.1
```
## Sequelize

### Migraciones
```
yarn sequelize-cli db:migrate
```
### Seeds
```
yarn sequelize-cli db:seed:all
para revertir los seeds:
yarn sequelize-cli db:seed:undo:all
```
## Deploy
Nuestra aplicación utiliza Render para realizar el deploy del backend. En este se configura `src` como directorio base y el comando para la build es `yarn`. Luego se ejecutan los siguientes comandos
`yarn sequelize-cli db:migrate --migrations-path=src/migrations --config=src/config/config.js && yarn dev` y se desactiva el deploy automático para realizarlo desde la Github Action correspondiente.