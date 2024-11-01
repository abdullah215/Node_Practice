const express = require('express');
const app = express();
const db = require('./db'); // Ensure this connects correctly to your database
const bodyParser = require('body-parser');
const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuRoutes');




app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/home', function (req, res) {
    res.send('This is a Home Page');
});

app.get('/product', function (req, res) {
    res.send('These are the products');
});

app.put('/api', function (req, res) {
    res.send('This is an API page');
});







app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes)
app.listen(7000, function () {
    console.log('Server is running on port 7000');
});
