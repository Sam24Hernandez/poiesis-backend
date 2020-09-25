/*
    route: api/all/
*/
const {
    Router
} = require("express");
const {
    validateJWT
} = require("../middlewares/validate-jwt");

const {
    getAll,
    getDocumentsCollections
} = require("../controllers/searches");

const router = Router();

router.get("/:search", validateJWT, getAll);

router.get("/coleccion/:table/:search", validateJWT, getDocumentsCollections);

module.exports = router;