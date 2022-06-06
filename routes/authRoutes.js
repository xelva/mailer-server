const passport = require('passport');

module.exports = (app) => {
    //kick user into the passport flow
    app.get('/auth/google', passport.authenticate('google', {
        //permissions we're asking google for for this user
        scope: ['profile', 'email']
        })
    );

    //confirm the user with the returned code
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

    app.get('/api/logout', (req, res) => {
        req.logout(err => {
            if (err) { return next(err); }
        });
        res.send(req.user)
    })
};