const router = require("express").Router();
const { User } = require("../db/models")

// auth/login
router.post("/login", async(req, res, next) => {
    try {
        const user = await User.findOne({where: {email: req.body.email}});
        if (!user || !user.correctPassword(req.body.password)) {
            res.status(401).send("Invalid login attempt");
        } else {
            // Log in with Passport.js
            req.login(user, err => (err ? next(err) : res.status(200).json(user)));
        }
    } catch (error) {
        next(error);
    }
})

// auth/signup
router.post("/signup", async(req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).send("Required fields missing");
        }
        const user = await User.create(req.body);
        // Logs in user automatically after sign up with Passport js
        req.login(user, err => (err ? next(err) : res.status(200).json(user)));
    } catch (error) {
        // Error for if user already exists
        if (error.name ===  "SequelizeUniqueConstraintError") {
            res.status(409).send("User already exists");
        } else {
            next(error);
        }
    }
});

// auth/logout
router.post("/logout", async(req, res, next) => {
    // Passport js logout method
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        // Redirect to logged out home page
        res.redirect("/")
    })
})