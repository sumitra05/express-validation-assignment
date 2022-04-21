const mongoose = require('mongoose');

 const connect = () => {
    return mongoose.connect("mongodb+srv://Ak046203:Qwerty123456@cluster0.5q94v.mongodb.net/validation")
};

module.exports = connect;