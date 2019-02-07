const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const mongoose = require('mongoose');

const profileRoutes = require('./routes/profile-routes')

require('dotenv').config()
  
const app = express();

const port = process.env.PORT || 4000;


// static folder
app.use( express.static("assets") );

// set view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[ process.env.SESSION_KEY]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log('Connencted to Mongodb mlab')})
.catch(error => console.log(error))

app.use('/auth', authRoutes );
app.use('/profile', profileRoutes )

// create home route
app.get('/', (req, res) => {
    res.render('home', {user : req.user});
});

app.listen(port, () => {
    console.log('app now listening for requests on port 3000');
});
