const mongoose = require('mongoose');


// database connected locally

mongoose.connect('mongodb://localhost/doctordata', { useUnifiedTopology: true, useNewUrlParser: true})
.then(()=> console.log('Database Connected'))
.catch(err => console.log(err))







