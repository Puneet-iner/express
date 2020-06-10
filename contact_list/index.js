const express = require('express');
const path = require('path');
const port = 8000;

//mongoose just before express fire up
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();
var contactList = [
    {
        name: "puneet",
        phone: "123456787654"
    }
];

//view engine  used to     render view file into html code
app.set('view engine', 'ejs');
//__dirname is used to get current directory
app.set('views', path.join(__dirname, 'views'));// just to set views value to view path
app.use(express.urlencoded({ extended: false }));//middleware method, not for params but is used for form data
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
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching data from datanaase");
        }
        return res.render('home', {
            title: "Contact List",
            contactList: contacts
        });//it's not neccesary to use res.render in return statement
    });
});

app.get('/practice', function(req, res){
    return res.render('practice',{
        title: "Let's practice"
    });//renders data and redirects to another end point
});

app.post('/create-contact', function(req, res){
    // contactList.push(req.body);
    // return res.redirect('/');//rediredcts to an end point
    //here "back" has it's own significance
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log("error in adding data");
            return;
        }
        console.log("added to database");
    });
    return res.redirect('back');
});

//delete-contact/10 => params
//delete-contact/?phone=....&something=...
// app.get('/delete-contact/:phone', function(req, res){
//     console.log(req.params);
//     let phone = req.params.phone;
//     let contactIndex = contactList.findIndex(contact => contact.phone == phone);//it is a kind of for each loop  which is very advance
//     if(contactIndex != -1){
//         contactList.splice(contactIndex, 1);
//     }
//     return res.redirect('back');
// });

//query is like form, above method also works, it is like forms get =>it will show params in the loading link
app.get('/delete-contact', function(req, res){
    console.log(req.query);
    // let phone = req.query.phone;
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);//it is a kind of for each loop  which is very advance
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }
    Contact.findByIdAndDelete(req.query.id, function(err){
        if(err){
            console.log("error in deleting");
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port);