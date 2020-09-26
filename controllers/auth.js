const {
    response
} = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const {
    generateJWT
} = require("../helpers/jwt");
const {
    googleVerify
} = require("../helpers/google-verify");

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

// Login con Google
const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const {
            name,
            email,
            picture
        } = await googleVerify(googleToken);

        const userDB = await User.findOne({
            email
        });
        let user;

        if (!userDB) {
            // si no existe el usuario
            user = new User({
                name: name,
                email,
                password: "@@@",
                img: picture,
                google: true
            });
        } else {
            // si existe el usuario
            user = userDB;
            user.google = true;
        }

        // Guardarlo en la base de datos
        await user.save();

        // Generar el TOKEN - JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            name,
            email,
            picture,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            message: "Token inválido"
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generar el Token - JWT
    const token = await generateJWT(uid);

    // Obtener el usuario por su ID
    const user = await User.findById(uid);

    res.json({
        ok: true,
        token,
        user
    });

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}