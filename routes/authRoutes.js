const passport = require('passport');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.stripeSecretKey)

module.exports = (app) => {
    //kick user into the passport flow
    app.get('/auth/google', passport.authenticate('google', {
        //permissions we're asking google for for this user
        scope: ['profile', 'email']
        })
    );

    //confirm the user with the returned code
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys')
        }
    );

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

    app.get('/api/logout', (req, res) => {
        req.logout(err => {
            if (err) { return next(err); }
        });
        res.redirect('/')
        
    })

    app.post('/api/payment_intents', async (req, res) => {
        try {
            const { amount } = req.body;
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "usd"
            });

            res.status(200).send(paymentIntent.client_secret);
            console.log(paymentIntent.client_secret)
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message })
        }

    })
};