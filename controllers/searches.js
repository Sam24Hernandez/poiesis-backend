const {
    response
} = require("express");

const User = require("../models/user.model");
const Publication = require("../models/publication.model");

const getAll = async (req, res = response) => {

    const search = req.params.search;
    const regex = new RegExp(search, "i");

    const [users] = await Promise.all([
        User.find({
            name: regex
        }),
    ]);

    res.json({
        ok: true,
        users
    });
}

const getDocumentsCollections = async (req, res = response) => {

    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp(search, "i");

    let data = [];

    switch (table) {
        case "publications":
            data = await Publication.find({
                    title: regex,
                    content: regex
                })
                .populate("user", "name img");

            break;

        case "users":
            data = await User.find({
                "$or": [{
                        "name": {
                            "$regex": search,
                            "$options": "i"
                        }
                    },
                    {
                        "email": {
                            "$regex": search,
                            "$options": "i"
                        }
                    }
                ]
            });

            break;

        default:
            return res.status(400).json({
                ok: false,
                message: "La tabla de búsqueda debe coincidir con usuarios/publicaciones."
            });
    }

    res.json({
        ok: true,
        results: data
    });

}

module.exports = {
    getAll,
    getDocumentsCollections
}