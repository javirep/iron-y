const express = require ("express")
const router = express.Router();

//Requerimos el modelo User
const User = require("../models/User");

//Requerimos bcrypt para encriptar contraseñas

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

// Routes:

router.get("/signup", (req, res, next)=>{
    res.render("auth/signup")
})

router.post("/signup", (req, res, next) =>{
    res.render("auth/login")
})

router.get("/login", (req, res, next)=>{
    res.render("auth/login")
})

module.exports = router;