const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();

// In order to use middle wear
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");


// Implement logging feature
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url} `;
    
    // Log both in the console and file
    console.log(log);
    fs.appendFile("server.log", log + "\n", (error) => {
        if (error)
            console.log("Cannot write to a file");  
    })
    
    next();
});

// Comme this out after the maintainance.
// The contents below this line will not be rendered (because there is no 'next')
/*
app.use((req, res, error) => {
    res.render("maintainance.hbs");
});
*/

// Content in public folder comes after the maintainance middle wear
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    //res.send('<h1>hi</h1>');
    res.send({
        data: "test",
        aaa: "hello"
    });
});

app.get('/about', (req, res) => {
    res.send('About page');
    
});

// Bad request page
app.get('/bad', (req, res) => {
    res.send({
        error: "Unable to send request"
    });
});


//app.listen(process.env.PORT, process.env.IP, () => {
app.listen(3030, () => {
    console.log('server starting....');
});