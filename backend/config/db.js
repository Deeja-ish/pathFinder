const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log(`Mongodb connected sucessfully! ${mongoose.connection.host}`)
    } catch (error) {
        console.error(`Error ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB