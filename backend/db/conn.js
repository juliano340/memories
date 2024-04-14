const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);

async function main() {

    await mongoose.connect(process.env.CONNECTIONSTRING);
    console.log('Conectado ao MongoDB!');
    
}

main().catch((err) => console.log(err));

module.exports = main;