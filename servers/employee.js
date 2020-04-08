const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    //_id: String,
    name:String,
    email:String,
    phone:String,
    picture:String,
    salary:String,
    position:String 
});

mongoose.model("employee",employeeSchema);