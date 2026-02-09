const mongoose = require('mongoose');
const connect = async()=>{
    await mongoose.connect("mongodb://localhost/chatApp")
}
module.exports = connect