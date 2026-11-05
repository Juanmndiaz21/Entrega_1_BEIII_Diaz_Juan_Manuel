# Entrega N°1 - Desafio de Mocking (Backend III)

Proyecto desarrollado sobre la base de Adoptme para la primera pre-entrega del curso de Backend III en Coderhouse.
Alumno: Diaz Juan Manuel

---

## Requisitos Previos

- Node.js (v18 o superior)
- MongoDB local o Atlas corriendo

---

## Instalacion y Puesta en Marcha

1. Clonar el repositorio e instalar las dependencias:
   ```bash
   npm install
   ```

2. Configurar las variables de entorno:
   Copiar el archivo `.env.example` a `.env` (ya viene preconfigurado para MongoDB local):
   ```bash
   PORT=8080
   MONGO_URL=mongodb://127.0.0.1:27017/adoptme
   ```

3. Levantar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

---

## Endpoints Desarrollados

### 1. Obtener Mascotas Simuladas (Mocking Pets)
- **Metodo**: `GET`
- **Ruta**: `/api/mocks/mockingpets`
- **Descripcion**: Devuelve 50 mascotas simuladas generadas con Faker sin persistir en la base de datos.
- **Ejemplo**:
  ```bash
  curl -X GET http://localhost:8080/api/mocks/mockingpets
  ```

---

### 2. Obtener 50 Usuarios Simulados (Mocking Users)
- **Metodo**: `GET`
- **Ruta**: `/api/mocks/mockingusers`
- **Descripcion**: Genera y devuelve 50 usuarios ficticios con:
  - Formato compatible con Mongoose (incluyendo `_id`).
  - Contrasena `"coder123"` hasheada con bcrypt.
  - Rol asignado aleatoriamente entre `"user"` y `"admin"`.
  - Array de `pets` vacio (`[]`).
- **Ejemplo**:
  ```bash
  curl -X GET http://localhost:8080/api/mocks/mockingusers
  ```

---

### 3. Generar e Insertar Datos en MongoDB (Generate Data)
- **Metodo**: `POST`
- **Ruta**: `/api/mocks/generateData`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "users": 10,
    "pets": 5
  }
  ```
- **Descripcion**: Genera la cantidad especificada de usuarios y mascotas y los inserta fisicamente en la base de datos de MongoDB a traves de los servicios correspondientes (`usersService` y `petsService`).
- **Ejemplo**:
  ```bash
  curl -X POST http://localhost:8080/api/mocks/generateData \
       -H "Content-Type: application/json" \
       -d '{"users": 10, "pets": 5}'
  ```

---

## Comprobacion de los Registros Insertados

Luego de ejecutar el `POST /api/mocks/generateData`, se puede verificar que los datos se guardaron correctamente en MongoDB consultando las rutas oficiales:

1. **Verificar Usuarios Insertados**:
   ```bash
   curl -X GET http://localhost:8080/api/users
   ```

2. **Verificar Mascotas Insertadas**:
   ```bash
   curl -X GET http://localhost:8080/api/pets
   ```

---

## Capturas de Pruebas (Evidencias de Funcionamiento)

### 1. GET /api/mocks/mockingpets
![Prueba Mocking Pets](<img width="752" height="789" alt="1 " src="https://github.com/user-attachments/assets/38b4ade8-ac26-49c6-ab65-6f03c21e0793" />)

### 2. GET /api/mocks/mockingusers (50 usuarios generados)
![Prueba Mocking Users](docs/capturas/2-mockingusers.png)

### 3. POST /api/mocks/generateData (Insercion en MongoDB)
![Prueba Generate Data](docs/capturas/3-generatedata.png)

### 4. Comprobacion de registros insertados en MongoDB (GET /api/users y /api/pets)
![Prueba Comprobacion BD](docs/capturas/4-check-users-pets.png)
