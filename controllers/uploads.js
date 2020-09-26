const path = require("path");
const fs = require("fs");

const {
  response
} = require("express");
const {
  v4: uuidv4
} = require("uuid");
const {
  updateImage
} = require("../helpers/update-image");

const fileUpload = (req, res = response) => {
  const type = req.params.type;
  const id = req.params.id;

  // Validar el tipo
  const validTypes = ["publications", "users"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      message: "No es del tipo publicación o usuario.",
    });
  }

  // Validar que exista un archivo subido
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      message: "No se ha seleccionado ningún archivo.",
    });
  }

  // Procesar la imagen...
  const file = req.files.image;

  const shortName = file.name.split(".");
  const fileExtension = shortName[shortName.length - 1];

  // Validar la extensión del archivo seleccionado
  const validExtensions = ["png", "jpg", "jpeg", "gif"];
  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      message: "Extensión inválida, seleccione una imagen.",
    });
  }

  // Generar el nombre del archivo
  const fileName = `${uuidv4()}.${fileExtension}`;

  // Path automático para guardar la imagen
  const path = `./uploads/${type}/${fileName}`;

  // Mover la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        message: "Error al intentar mover el fichero.",
      });
    }

    // Actualizar la base de datos (MongoDB)
    updateImage(type, id, fileName);

    res.json({
      ok: true,
      message: "Archivo subido correctamente.",
      fileName,
    });
  });
};

const getImage = (req, res = response) => {
  const type = req.params.type;
  const photo = req.params.photo;

  const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);

  // Default Image
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/noimg.png`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  getImage,
};