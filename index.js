//import all frameworks and models
const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

//start express framework for handling get and post requests
const app = express();

const ports = process.env.PORT || 3000;

//to parse the requests
app.use(bodyParser.json());

app.use((req, res, next) => {
    //add headers which are used in response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //start the next function app.use('auth....)
    next();
});

//if route begins with /auth then switch to authRoutes file
app.use('/auth', authRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on ${ports}`));
