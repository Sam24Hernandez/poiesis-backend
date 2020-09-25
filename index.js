const express = require("express");
require('dotenv').config();
const cors = require("cors");
const {
  dbConnection
} = require("./database/config");

// Crear el servidor de express
const app = express();

// Configurar CORS para peticiones HTTP
app.use(cors());

// Read y parse del request body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas
app.use("/api/usuarios", require("./routes/users"));
app.use("/api/login", require("./routes/auth"));

// Conexión al puerto localhost
app.listen(process.env.PORT, () => {
  console.log(
    "Server corriendo en http://localhost:" + process.env.PORT + " \x1b[32m%s\x1b[0m",
    "conectado"
  );
});