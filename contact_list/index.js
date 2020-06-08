const express = require('express');
const path = require('path');
const port = 8000;
const app = express();
var contactList = [
    {
        name: "puneet",
        phone: "123456787654"
    }
];

//view engine  used to render view file into html code
app.set('view engine', 'ejs');
//__dirname is used to get current directory
app.set('views', path.join(__dirname, 'views'));// just to set views value to view path
app.use(express.urlencoded({ extended: false }));//middleware method
app.use(express.static("assets"));//used here to make middleware for accessing contents of assets folder => for seeint this effect just go and see the home.ejs file where css file and js script has been loded
// app.use vs router.use -> https://stackoverflow.com/questions/27227650/difference-between-app-use-and-router-use-in-express

// //middleware1
// app.use(function(req, res, next){
//     console.log(app.settings.views);// jsut checking working of app.path()
//     req.body.name = "You have been changed in MiddleWAre in index.js file at line 21"
//     console.log("Middleware 1 is called");
//     next();
// });

// //middleware2
// app.use(function(req, res, next){
//     console.log("Middleware 2 is called");
//     next();
// });


// '/' is route and 'function() is the controller'
app.get('/', function(req, res){
    //sending title as vairiable in home page
    return res.render('home', {
        title: "Contact List",
        contactList: contactList
    });//it's not neccesary to use res.render in return statement
});

app.get('/practice', function(req, res){
    return res.render('practice',{
        title: "Let's practice"
    });//renders data and redirects to another end point
});

app.post('/create-contact', function(req, res){
    contactList.push(req.body);
    console.log(req.body.name);
    // return res.redirect('/');//rediredcts to an end point
    //here "back" has it's own significance
    return res.redirect('back');
});

app.listen(port);