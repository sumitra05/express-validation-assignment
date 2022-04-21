const  mongoose = require("mongoose");

//first_name, last_name, email, pincode, age, gender,

const  userSchema = new mongoose.Schema(
    {
        firstName : {type : String, required : true},
        lastName : { type : String, required : true},
        email : {type : String, required : true, unique : true},
        pincode : {type : Number, required : true},
        age : {type : Number, required : true},
        gender : {type : String, required : true, enum : ["Male", "Female", "Others"]},
    },
    {
        versionKey : false,
        timestamps : true
    }
);

module.exports = mongoose.model("user", userSchema);