const express = require('express');
const port = 8000;
const app = express();


// type http://localhost:8000/profile to get the result
app.get('/profile', function(req, res){
    res.send("<h1>Hello, you are on home page</h1>");
});//getting request from profile and sending content to profile from server

app.listen(port, function(err){
    if(err){
        console.log("Error");
    }
    console.log("Server running at" , port);
});