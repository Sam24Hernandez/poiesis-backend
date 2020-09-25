const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
    // Leer el Token de Validación
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "¡No hay token en la petición!"
        });
    }

    try {

        const {
            uid
        } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: "Token inválido."
        });
    }
}

module.exports = {
    validateJWT
}