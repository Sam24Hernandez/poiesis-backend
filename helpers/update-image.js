const User = require("../models/user.model");
const fs = require("fs");

const Author = require("../models/author.model");

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
        case "authors":
            const author = await Author.findById(id);
            if (!author) {
                console.log("El id no coincide con el autor.");
                return false;
            }

            oldPath = `./uploads/authors/${ author.img }`;
            deleteImage(oldPath);

            author.img = fileName;
            await author.save();
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