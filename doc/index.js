const express = require('express');
const bodyparser = require('body-parser');
const user = require('./routes/user');
require('./config/database');


const app = express();



//middelware
app.use(bodyparser.json());


//router middelware

app.use('/user', user);


app.get('/', (req, res) => {
    res.send('Working Properly')
});


// server connection
app.listen(3000, (req, res) => {
    console.log('Server Connected')
});