const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('express-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user')
require('./services/passport')

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 1000,
        secret: keys.cookieKey,
        resave: false, 
        saveUninitialized: true,
        cookie: {},
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//let heroku define the port
const PORT = process.env.PORT || 5000;
app.listen(PORT);