const router = require('express').Router();
const passport = require('passport');

//Local auth login
router.get('/login', (req, res) => {
    res.render('login', {
        user: req.user
    });
});

//Local auth logout
router.get('/logout', (req, res) => {
    //Use passport here
    req.logout();
    // res.redirect('/');
    res.send('You logged out successfully');
});

//Google auth login
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//Callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send('You are logged in via google');
    res.send(req.user);
    // res.redirect('/profile');
});

//Facebook auth login
router.get('/facebook', passport.authenticate('facebook', {
    scope: []
}));

//Callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    // res.send('You are logged in via facebook');
    res.send(req.user);
    // res.redirect('/profile');
});

module.exports = router;