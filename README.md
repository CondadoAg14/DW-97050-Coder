# API Ecommerce – Backend

Proyecto de backend desarrollado con Node.js, Express y MongoDB.
Incluye gestión de productos, carritos y un sistema de autenticación
y autorización de usuarios mediante JWT.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Passport
- JWT (jsonwebtoken)
- bcrypt
- Handlebars

---

## 📦 Instalación

1. Clonar el repositorio:

(en bash)
git clone https://github.com/CondadoAg14/DW-97050-Coderhouse.git

2. Instalar Dependencias:

npm install

3. Levantar el servidor:

npm start

El servidor se ejecuta por defecto en:

http://localhost:8080

## 🔐 Autenticación y Sesiones

* POST /api/sessions/login

Autentica un usuario registrado y devuelve un token JWT.

URL: /api/sessions/login

Método: POST

Body (JSON): {
  "email": "usuario@test.com",
  "password": "1234"
}

Respuesta Exitosa: {
  "status": "success",
  "token": "JWT_TOKEN"
}

Errores posibles:

- Credenciales inválidas
- Usuario inexistente

* GET /api/sessions/current

Devuelve los datos del usuario autenticado a partir del token JWT.

URL: /api/sessions/current

Método: GET

Headers Requeridos: Authorization: Bearer JWT_TOKEN

Respuesta Exitosa: {
  "status": "success",
  "user": {
    "first_name": "Nombre",
    "last_name": "Apellido",
    "email": "usuario@test.com",
    "role": "user"
  }
}

Errores posibles:

- Token inexistente
- Token inválido o expirado

## 🧑‍💻 Autor

Proyecto desarrollado como parte del curso de Backend II - Diseño y Arquitectura Backend.

Agustin Condado - Coderhouse