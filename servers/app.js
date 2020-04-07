const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./employee')

app.use(bodyParser.json())
// create routes below this else request.body is undefined




const employee = mongoose.model("employee")


const mongoUri = "mongodb+srv://gray_lappy:TuiQg7RtyTVfH7Z@cluster0-oi6g0.mongodb.net/test?retryWrites=true&w=majority" ;

mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", ()=>{
    console.log("Connected to Mongo  boom ")
})

mongoose.connection.on("error", (err)=>{
    console.log("Error: ", err)
})


app.get('/',(req,res)=>{
    res.send("Welcome to the node js server")
})

app.post('/send-data',(req,res)=>{
    const Employee = new employee({
        name: req.body.name,
        position: req.body.position,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
        picture: req.body.picture
        })
    Employee.save()
    .then(data=>{
        console.log(data)
        res.send("Success")
    }).catch(err=>{
        console.log(err)
    })
})


app.listen(3000,()=>{
    console.log("Server Running")
})