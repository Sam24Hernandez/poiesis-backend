const User = require("../models/user.model");
const fs = require("fs");
const Publication = require("../models/publication.model");

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const updateImage = async (type, id, fileName) => {

    // Reemplazar el nombre del path anterior
    let oldPath = "";

    switch (type) {
        case "publications":
            const publication = await Publication.findById(id);
            if (!publication) {
                console.log("El id no coincide con la publicación.");
                return false;
            }

            oldPath = `./uploads/publications/${ publication.img }`;
            deleteImage(oldPath);

            publication.img = fileName;
            await publication.save();
            return true;

            break;

        case "users":
            const user = await User.findById(id);
            if (!user) {
                console.log("El id no coincide con el usuario.");
                return false;
            }

            oldPath = `./uploads/users/${ user.img }`;
            deleteImage(oldPath);

            user.img = fileName;
            await user.save();
            return true;

            break;
    }

}

module.exports = {
    updateImage
}