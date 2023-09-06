const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// creating a database 
mongoose.connect('mongodb+srv://Contacts:nirmit@cluster0.zr1tqhd.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to the mongodb database');
}).catch((err) => {
    console.log(err);
});
console.log("just for the badge");


// middleware 
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))
const Item = mongoose.model('Item', {
    name: String,
    email: String,
    message: String
});


//extras
var date = new Date();
var year = date.getFullYear();

var myAge = year - 2007;
console.log(myAge);

// routing 
app.get('/', (req, res) => {
    res.render('index', {
        age: myAge
    });
});

app.post('/contact', (req, res) => {
    // console.log(req.body);
    var formReq = req.body;
    var formSave = new Item(formReq);
    formSave.save().then(() => {
        console.log('saved form req');
        res.redirect('/');
    });

});

app.get('/cv', (req, res) => {
    res.render('cv');
});


// listen 
app.listen(process.env.PORT || 3000, () => {
    console.log('server is runnig at port')
});
