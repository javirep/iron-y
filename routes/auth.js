const express = require("express");
const router = express.Router();

//Requerimos el modelo User
const User = require("../models/User");

//Requerimos bcrypt para encriptar contraseñas

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

// Routes:

router.get("/signup", (req, res, next) => {
    res.render("auth/signup.hbs")
})

router.post("/signup", async (req, res, next) => {
    const { username, password } = req.body;

    if (username === "" || password === "") {
        return res.render("auth/signup.hbs", {
            errorMessage: "You have to provide a valid username and password"
        })
    }

    const user = await User.findOne({ username })

    if (user) {
        return res.render("auth/signup.hbs", {
            errorMessage: "This username is already taken, please user another one"
        })
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({
        username,
        password: hashPass
    })
        .then((user) => {
            console.log(user)
            req.session.currentUser = user;
            res.redirect("/priv/user/");
        })
        .catch(error => {
            console.log("error while creating a new user: " + error)
        })

})


router.get("/login", (req, res, next) => {
    res.render("auth/login.hbs")
})

router.post("/login", (req, res, next) => {
    const { username, password } = req.body;

    if (username === "" || password === "") {
        res.render("auth/login", {
            errorMessage: "You have to provide a valid username / password"
        })
    }

    User.findOne({ "username": username })
        .then(user => {
            console.log(user)
            if (!user) {
                res.render("auth/login", {
                    errorMessage: "There is no user with that username"
                })
            }

            if (bcrypt.compareSync(password, user.password)) {
                req.session.currentUser = user;
                res.redirect("/priv/user/")
            }

            else {
                res.render("auth/login", {
                    errorMessage: "Incorrect username / password"
                })
            }

        })
        .catch(err => console.log("error finding the user: " + err))
})

module.exports = router;