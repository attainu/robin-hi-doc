const mongoose = require('mongoose');


// database connected locally


mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(()=> console.log('Database Connected'))
.catch(err => console.log(err))



