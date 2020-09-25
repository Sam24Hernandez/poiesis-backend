// Controladores de los Usuarios
const {
  response
} = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const {
  generateJWT
} = require("../helpers/jwt");

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  const users = await User.find({}, "name email role google");

  res.json({
    ok: true,
    users
  });
};

// Crear un usuario (USER_ROLE por default)
const createUser = async (req, res = response) => {
  const {
    email,
    password
  } = req.body;

  try {
    const existEmail = await User.findOne({
      email,
    });

    // Validación del correo electrónico, si es único o ya existe
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        message: "Esta dirección de correo ya está en uso.",
      });
    }

    const user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar usuario
    await user.save();

    // Generar el TOKEN - JWT
    const token = await generateJWT(user.id);

    // Creación del usuario
    res.json({
      ok: true,
      user,
      token
    });

    // Error en la respuesta del servidor
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "Error en el servidor",
    });
  }
};

// Actualizar los datos del usuario
const updateUser = async (req, res = response) => {

  // TODO: Validar token y comprobar si es el usuario correcto
  const uid = req.params.id;

  try {

    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: "No existe un usuario con ese ID"
      });
    }

    // Actualizaciones
    const {
      password,
      google,
      email,
      ...fields
    } = req.body;

    // comprobar si el email es del usuario
    if (userDB.email !== email) {

      const existEmail = await User.findOne({
        email
      });
      if (existEmail) {
        return res.status(400).json({
          ok: false,
          message: "Esta dirección de correo ya está en uso."
        });
      }
    }

    // Tomar los campos
    fields.email = email;

    const userUpdated = await User.findByIdAndUpdate(uid, fields, {
      new: true
    });

    res.json({
      ok: true,
      user: userUpdated
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "Error en el servidor"
    });
  }
}

// Eliminación de un usuario
const deleteUser = async (req, res = response) => {

  const uid = req.params.id;

  try {

    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: "No existe un usuario con ese ID"
      });
    }

    await User.findOneAndDelete(uid);

    res.json({
      ok: true,
      message: "Usuario eliminado"
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "Error en el servidor"
    });
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};