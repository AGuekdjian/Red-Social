const mongoose = require("mongoose");
require('dotenv').config()

const connection = async() => {

    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.NAME_DB}.kr2k8xj.mongodb.net/?retryWrites=true&w=majority`);

        console.log("Conectado correctamente a la base de datos!");

    } catch(error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos !!");
    }

}

module.exports = connection;