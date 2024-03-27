const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://localhost:27017/TunApp_db")

// Check if connection are built or not
connect.then(() => {
    console.log("Database connected Sucessfully!")
})
.catch(() => {
    console.log("Database cannot be connected.")
})

// Create schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Collection part
const collection = new mongoose.model("users", LoginSchema)

module.exports = collection