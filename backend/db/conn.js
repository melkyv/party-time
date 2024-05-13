const mongoose = require("mongoose");

async function main() {
    try {
        // Link to connect mongodb
        await mongoose.connect("link")
        console.log("Conectado ao banco!");
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main