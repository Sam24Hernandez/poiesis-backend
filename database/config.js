const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/poiesisDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("Conexión a MongoDB realizada con éxito.");
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de conectar a la MongoDB.");
    }
};

module.exports = {
    dbConnection
};