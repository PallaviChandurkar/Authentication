const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/Authentication");

//check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch((error) => {
    console.error("Error connecting to database:", error);
});

//Create a Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//collection Part
const collection = new mongoose.model("Users",LoginSchema);

module.exports = collection;