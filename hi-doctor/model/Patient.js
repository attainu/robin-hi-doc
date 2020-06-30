const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        max:255,
        min: 6
    },

    email: {
        type: String,
        unique: true,
        required: true,
        max:255,
        min: 6
    },

    password: {
        type: String,
        required: true,
        max:1024,
        min:6
    },

    Profile_CreatedAt: {
        type: Date,
        default: Date.now()
    },
    
    profileID :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PP'
    }
});

module.exports = mongoose.model('Patient', PatientSchema);


