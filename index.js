// Variables de entorno
require('dotenv').config();
const path = require("path");

const express = require("express");
const cors = require("cors");

// Conexión a la base de datos
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

// Directorio público
app.use(express.static("public"));

// Rutas
app.use("/api/usuarios", require("./routes/users"));
app.use("/api/publicaciones", require("./routes/publications"));
app.use("/api/all", require("./routes/searches"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/upload", require("./routes/uploads"));

// Path del index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// Conexión al puerto localhost
app.listen(process.env.PORT, () => {
  console.log(
    "Servidor corriendo en http://localhost:" + process.env.PORT + " \x1b[32m%s\x1b[0m",
    "conectado"
  );
});