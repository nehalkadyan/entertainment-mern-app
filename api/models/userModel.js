const mongoose = require("mongoose");

// userSchema for mongodb
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },

})

// creating model
const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
