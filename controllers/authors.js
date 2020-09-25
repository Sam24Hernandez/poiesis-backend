// Controladores de los Usuarios
const {
    response
} = require("express");

const Author = require("../models/author.model");

// Obtener todos los usuarios
const getAuthors = async (req, res = response) => {

    const authors = await Author.find()
        .populate("user", "name img")

    res.json({
        ok: true,
        authors
    });
};

// Crear un usuario (USER_ROLE por default)
const createAuthor = async (req, res = response) => {

    const uid = req.uid;
    const author = new Author({
        user: uid,
        ...req.body
    });

    try {

        const authorDB = await author.save();

        // Creación del autor
        res.json({
            ok: true,
            author: authorDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Consulta al administrador"
        });
    }
};

// Actualizar el autor
const updateAuthor = async (req, res = response) => {
    res.json({
        ok: true,
        message: "Actualizar Autor"
    });
}

// Eliminación de autor
const deleteAuthor = async (req, res = response) => {

    res.json({
        ok: true,
        message: "Autor eliminado"
    });

}

module.exports = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
};