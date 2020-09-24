const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

// Crear el servidor de express
const app = express();

// Configurar CORS para peticiones HTTP
app.use(cors());

// Base de datos
dbConnection();

// Rutas
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Hola mundo desde Node",
  });
});

// Conexión al puerto localhost
app.listen(3000, () => {
  console.log(
    "Server corriendo en http://localhost:" + 3000 + ": \x1b[32m%s\x1b[0m",
    "conectado"
  );
});
