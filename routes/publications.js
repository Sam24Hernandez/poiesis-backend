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
    createPublication,
    getPublications,
    updatePublication,
    deletePublication,
    getPublicationById,
    searchPublications
} = require("../controllers/publications");
const {
    validateJWT
} = require("../middlewares/validate-jwt");

const router = Router();

// Modelo de Rutas
router.get("/", getPublications);

router.get("/:search", searchPublications);

router.post(
    "/:id",
    [
        validateJWT,
        check("title", "El título es un campo obligatorio").not().isEmpty(),
        check("content", "El contenido es un campo obligatorio").not().isEmpty(),
        validateFields
    ],
    createPublication
);

router.put('/:id',
    [
        validateJWT,
        check('title', 'El título de la publicación es necesaria').not().isEmpty(),
        check('content', 'El contenido es necesario').not().isEmpty(),
        validateFields
    ],
    updatePublication
);

router.delete('/:id',
    validateJWT,
    deletePublication
);

router.get('/:id',
    getPublicationById
);

module.exports = router;