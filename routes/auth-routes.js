const router  = require('express').Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup')

router.get('/login', (req ,res, ) => {
    res.render('login' , {user: req.user} )
}
)

router.get('/logout', (req, res) => {
    //passport will handle it
    req.logout();
    res.redirect('/')
})

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

//callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res ) => {
    res.redirect('/profile/');
    
})


module.exports = router;