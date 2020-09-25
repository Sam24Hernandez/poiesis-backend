const {
    response
} = require("express");

const User = require("../models/user.model");
const Author = require("../models/author.model");

const getAll = async (req, res = response) => {

    const search = req.params.search;
    const regex = new RegExp(search, "i");

    const [users, authors] = await Promise.all([
        User.find({
            name: regex
        }),
        Author.find({
            name: regex
        }),
    ]);

    res.json({
        ok: true,
        users,
        authors
    });
}

const getDocumentsCollections = async (req, res = response) => {

    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp(search, "i");

    let data = [];

    switch (table) {
        case "authors":
            data = await Author.find({
                    name: regex
                })
                .populate("user", "name img");

            break;

        case "users":
            data = await User.find({
                name: regex
            });

            break;

        default:
            return res.status(400).json({
                ok: false,
                message: "La tabla de búsqueda debe coincidir con usuarios/autores."
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