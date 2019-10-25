var express = require('express');
var router = express.Router();

// ESTE ES EL MIDDLEWARE QUE SE ASEGURA DE QUE SOLO LOS CURRENT USERS PUEDAN ACCEDER AL CONTENIDO PRIVATE
router.use((req, res, next) => {
  if(req.session.currentUser){
    next();
  } else{
    res.redirect("/auth/login")
  }
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('priv/profile.hbs');
});

router.get("/addPersonalChallenge", (req, res, next) => {
  res.render("priv/addPersonalChallenge.hbs")
})

router.get("/socialChallenges", (req, res, next) =>{
  res.render("priv/socialChallenges.hbs")
})

module.exports = router;