const router = require("express").Router();
const { User } = require("../db/models")


const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
router.use(bodyParser.json());

// auth/login
router.post("/login", async(req, res, next) => {
    try {
        console.log("REQ BODY: ", req.body);
        console.log(User.findOne({where: {email: req.body.email}}));
        const user = await User.findOne({where: {email: req.body.email}});
        console.log("REQ BODY: ", req.body);
        if (!user || !(await user.correctPassword(req.body.password))) {
            console.log("invalid");
            res.status(401).send("Invalid login attempt");
        } else {
            // Log in with Passport.js
            console.log("success");
            console.log("Correct pw", user.correctPassword(req.body.password));
            const userJ = JSON.stringify(user);
            console.log("USER: ", JSON.stringify(user));
            req.login(userJ, err => (err ? next(err) : res.status(200).json(user)));
        }
    } catch (error) {
        next(error);
    }
})

// auth/signup
router.post("/signup", async(req, res, next) => {
    try {
        const {email, password, firstName, lastName,profilePic} = req.body;
        
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).send("Required fields missing");
        }
        const user = await User.create(req.body);
        // Logs in user automatically after sign up with Passport js
        const userJ = JSON.stringify(user);
        console.log("USER: ", JSON.stringify(user));
        req.login(userJ, err => (err ? next(err) : res.status(200).json(user)));
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
router.post("/logout",async (req, res, next) => {
    // Passport js logout method
    
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        console.log("LOGOUT")
        res.send(200);
        
        // Redirect to logged out home page
        
    })

    
})

// auth/profile
router.post("/profile", async(req, res, next) => {
    const user = await User.findOne({where: {email: req.body.email}});
    // When on /profile, send profile data to be accessed
    res.status(200).json(req.body);
})

module.exports = router;