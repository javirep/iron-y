const express = require ("express");
const router = express.Router();

//Requerimos el modelo User
const User = require("../models/User");

//Requerimos bcrypt para encriptar contraseñas

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

// Routes:

router.get("/signup", (req, res, next)=>{
    res.render("auth/signup.hbs")
})

router.post("/signup", (req, res, next) =>{
    const{ username, password } = req.body;
    console.log(username, password)

    if (username ==="" || password === ""){
        res.render("auth/signup.hbs", {
            errorMessage: "You have to provide a valid username and password"
        })
    }

    User.findOne({"username": username})
        .then(user => {
            if (user){ 
                res.render("auth/signup.hbs", {
                errorMessage: "This username is already taken, please user another one"
            })
            return;
        }
        
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        User.create({
            username, 
            password: hashPass
        })
            .then((user)=>{
                console.log(user)
                req.session.currentUser = user;
                res.redirect("/priv");
            })
            .catch(error=>{
                console.log("error while creating a new user: " + error)
            })
    
    })
    .catch(error => {
        console.log("error while checking if the user is already in the DB: " + error)
    })
    .catch(err=>{
        next(err)
    })
    
})

router.get("/login", (req, res, next)=>{
    res.render("auth/login.hbs")
})

router.post("/login", (req, res, next)=>{
    const {username, password} = req.body;

    if (username === "" || password === ""){
        res.render("auth/login", {
            errorMessage: "You have to provide a valid username / password"
        })
    }

    User.findOne({ "username" : username })
        .then (user => {
            console.log(user)
            if(!user){
                res.render("auth/login", {
                    errorMessage: "There is no user with that username"
                })
            }

            if(bcrypt.compareSync(password, user.password)){
                req.session.currentUser = user;
                res.redirect("/priv")
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