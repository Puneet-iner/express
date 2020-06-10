//getting started mongoose
const mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://localhost/contact_listdb');

//acquire connection to check if it is successfull
var db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'connection error:'));

//up and running then print message
db.once('open', function(){
    console.log("Successfully connected to the database");
});