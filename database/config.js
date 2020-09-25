const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNEC, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("Conexión a MongoDB realizada con éxito.");
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de conectar a MongoDB.");
    }
};

module.exports = {
    dbConnection
};