const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const dotenv = require("dotenv")
dotenv.config({path:'./.env'})
require('./config/db');

const app = express()

const routes = require("./routes/_indexRoute")
const patient = require('./routes/patient');
const doctor = require('./routes/doctor');
const globalerrorhandler = require("./errorhandler/globalerrorhandler")

// app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(morgan("dev"))

app.use('/api/v1', routes)
app.use('/patient/account', patient);
app.use('/doctor/account', doctor);


// index()
app.use((req,res,next)=>{
    res.send('Invalid URL')
}) 
app.use('/', globalerrorhandler)


const port = process.env.PORT || 3000

app.listen(port,()=>console.log(`server is running on ${port}`))