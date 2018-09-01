const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoConfig = require('./config/mongoConfig');
const sessionConfig = require('./config/sessionConfig');

const app = express();

//Connect mongodb
mongoose.connect(mongoConfig.mongodb.dbURI, () => {
    console.log('Connected to mongodb');
});

//Set up view engine
// app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [sessionConfig.session.cookieKey]
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    });
});

if (module === require.main) {

    const server = app.listen(process.env.PORT || 8080, () => {
      const port = server.address().port;
      console.log(`App listening on port ${port}`);
    });
}