const {
    response
} = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const {
    generateJWT
} = require("../helpers/jwt");

const login = async (req, res = response) => {

    const {
        email,
        password
    } = req.body;

    try {

        // Verificar email
        const userDB = await User.findOne({
            email
        });

        // Si los datos que son ingresados son incorrectos
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                message: "Email inválido, inténtalo de nuevo."
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: "Contraseña incorrecta, inténtalo de nuevo."
            });
        }

        // Generar el TOken - JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Contactar al administrador"
        });
    }
}

module.exports = {
    login
}