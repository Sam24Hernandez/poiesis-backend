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
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/users");
const {
    validateJWT
} = require("../middlewares/validate-jwt");

const router = Router();

// Modelo de Rutas
router.get("/", validateJWT, getUsers);

router.post(
    "/",
    [
        check("name", "El nombre es un campo obligatorio").not().isEmpty(),
        check("password", "La contraseña es un campo obligatorio").not().isEmpty(),
        check("email", "El email es un campo obligatorio").isEmail(),
        validateFields
    ],
    createUser
);

router.put("/:id",
    [
        validateJWT,
        check("name", "El nombre es un campo obligatorio").not().isEmpty(),
        check("email", "El email es un campo obligatorio").isEmail(),
        check("role", "El rol es obligatorio").not().isEmpty(),
        validateFields
    ],
    updateUser
);

router.delete("/:id", validateJWT, deleteUser);

module.exports = router;