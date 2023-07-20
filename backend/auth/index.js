const router = require("express").Router();
const { User } = require("../db/models")

// auth/login
router.post("login", async(req, res, next) => {
    try {
        const user = await User.findOne({where: {email: req.body.email}});
        if (!user || !user.correctPassword(req.body.password)) {
            res.status(401).send("Invalid login attempt");
        } else {
            // Passport.js
            req.login(user, err => (err ? next(err) : res.status(200).json(user)));
        }
    } catch (error) {
        next(error);
    }
})