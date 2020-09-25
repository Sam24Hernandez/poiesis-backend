const {
    Router
} = require("express");
const {
    check
} = require("express-validator");
const {
    validateFields
} = require("../middlewares/validate-fields");
const {
    validateJWT
} = require("../middlewares/validate-jwt");

const {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require("../controllers/authors");

const router = Router();

// Modelo de Rutas
router.get("/", validateJWT, getAuthors);

router.post(
    "/",
    [
        validateJWT,
        check("name", "El nombre del autor es necesario.").not().isEmpty(),
        validateFields
    ],
    createAuthor
);

router.put("/:id",
    [
        validateJWT,
        check("name", "El nombre del autor es necesario.").not().isEmpty(),
        validateFields
    ],
    updateAuthor
);

router.delete("/:id", validateJWT, deleteAuthor);

module.exports = router;