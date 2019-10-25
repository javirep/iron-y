var express = require('express');
var router = express.Router();

const User = require("../models/User")
const PersonalChallenge = require("../models/PersonalChallenge")

// ESTE ES EL MIDDLEWARE QUE SE ASEGURA DE QUE SOLO LOS CURRENT USERS PUEDAN ACCEDER AL CONTENIDO PRIVATE

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    console.log("redirected to login by the middleware")
    res.redirect("/auth/login")
  }
})

router.get('/user', async (req, res, next) => {
  const id = req.session.currentUser._id
  const user = await User.findOne({ "_id": id }).populate("PersonalChallenge")
  console.log(user.personalChallenges)
  res.render("priv/profile.hbs", { user })
});

router.get('/user/challenge/:id', async (req, res, next) => {
  res.render("priv/personalChallengeDetail.hbs")
})


/* GET users listing. */
router.get("/addPersonalChallenge", (req, res, next) => {
  res.render("priv/addPersonalChallenge.hbs")
})



router.post("/addPersonalChallenge", (req, res, next) => {
  const { name, description, modify, difficulty } = req.body
  console.log("entered in the post router")
  const personalChallenge = new PersonalChallenge({
    name,
    description,
    modify,
    difficulty
  })
  console.log(personalChallenge)
  personalChallenge.save(function (err, personalChallenge) {
    if (err) return console.error(err);
    console.log(personalChallenge.name + " saved in the DB.");
  });

  User.findOneAndUpdate({ "_id": req.session.currentUser._id }, { $set: { personalChallenges: personalChallenge._id } }, { new: true })
    .then(user => console.log(user))

  res.redirect("/priv/user/")
})

router.get("/socialChallenges", (req, res, next) => {
  res.render("priv/socialChallenges.hbs")
})

module.exports = router;