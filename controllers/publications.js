// Controladores de las publicaciones
const {
    response
} = require("express");

const Publication = require("../models/publication.model");

// Obtener las publicaciones
const getPublications = async (req, res = response) => {

    const publications = await Publication.find()
        .populate("user", "name img")

    res.json({
        ok: true,
        publications
    });
}

// Buscar una publicación
const searchPublications = async (req, res = response) => {

    const search = req.params.search;

    // Find or
    const [publications] = await Promise.all([
        Publication.find({
            "$or": [{
                    "title": {
                        "$regex": search,
                        "$options": "i"
                    }
                },
                {
                    "content": {
                        "$regex": search,
                        "$options": "i"
                    }
                }
            ]
        })
        .sort([
            ["data", "descending"]
        ])
    ]);

    res.json({
        ok: true,
        publications
    });
}

const getPublicationById = async (req, res = response) => {

    const id = req.params.id;

    try {

        const publication = await Publication.findById(id)
            .populate("user", "name img");

        res.json({
            ok: true,
            publication
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Contacta al administrador'
        });
    }

}

// Crear una publicación 
const createPublication = async (req, res = response) => {

    const uid = req.uid;
    const publication = new Publication({
        user: uid,
        ...req.body
    });

    try {

        const publicationDB = await publication.save();

        // Creación de la publicación
        res.json({
            ok: true,
            publication: publicationDB
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

// Actualizar la publicación
const updatePublication = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                ok: true,
                message: "No se encontro la publicación."
            });
        }

        const changedPublication = {
            ...req.body,
            user: uid
        }

        const publicationUpdated = await Publication.findByIdAndUpdate(id, changedPublication, {
            new: true
        });

        // Actualizando la publicación
        res.json({
            ok: true,
            publication: publicationUpdated
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            ok: false,
            message: "Contacta al administrador",
        });
    }
}

const deletePublication = async (req, res = response) => {

    const id = req.params.id;

    try {

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                ok: true,
                message: "No se encontro la publicación."
            });
        }

        await Publication.findByIdAndDelete(id);

        // Elimina la publicación
        res.json({
            ok: true,
            message: "Publicación eliminada correctamente."
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contacta al administrador'
        })
    }

}

module.exports = {
    getPublications,
    getPublicationById,
    createPublication,
    updatePublication,
    deletePublication,
    searchPublications
}