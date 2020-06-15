const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const morgan = require("morgan")
require("dotenv/config")

mongoose.connect(process.env.DB_CONNECTION,
    {
        dbName:"TEST-1",
        user:"user1",
        pass:"user1",
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(d=>console.log(`DB connected ${d}`)).catch(e=>console.log(e.message))
mongoose.set('debug',true)

const app = express()

const routes = require("./routes/_indexRoute")

// app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(morgan("dev"))

app.use('/api/test1',routes)

// index()
app.use((req,res,next)=>{
    res.send('Invalid URL')
})

const port = process.env.Port || 3000

app.listen(port,()=>console.log(`server is running on ${port}`))