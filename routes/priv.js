var express = require('express');
var router = express.Router();

const User = require("../models/User")
const PersonalChallenge = require("../models/PersonalChallenge")
const SocialChallenge = require("../models/SocialChallenge")

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
  const sameUser = await User.findOne({ "_id": id })
  console.log("Este es el usuario antes del .populate: " + sameUser)
  const user = await User.findOne({ "_id": id })
    // Estas dos lineas hacen que user deje de tener solo los id de personal y social challenges y tenga todos los datos de todos los challenges:
    .populate("personalChallenges")
    .populate("socialChallenges")
  console.log("Este es el user despues de los .populate" + user)
  res.render("priv/profile.hbs", { user })
});

/* GET users listing. */
router.get("/addPersonalChallenge", (req, res, next) => {
  res.render("priv/addPersonalChallenge.hbs")
})

router.post("/addPersonalChallenge", (req, res, next) => {
  const { name, description, modify, difficulty } = req.body
  const personalChallenge = new PersonalChallenge({
    name,
    description,
    modify,
    difficulty
  })
  personalChallenge.save(function (err, personalChallenge) {
    if (err) return console.error(err);
    console.log(personalChallenge.name + " saved in the DB.");
  });

  User.findOneAndUpdate({ "_id": req.session.currentUser._id }, { $push: { personalChallenges: personalChallenge._id } }, { new: true })

  res.redirect("/priv/user/")
})

router.get("/user/personalChallenge/:id", (req, res, next) => {
  const { id } = req.params;
  PersonalChallenge.findOne({ "_id": id })
    .then(personalChallenge => {
      res.render("priv/personalChallengeDetail.hbs", { personalChallenge })
    })
})


router.get("/socialChallenges", (req, res, next) => {
  SocialChallenge.find()
    .then(data => {
      res.render("priv/socialChallenges.hbs", { data })
      console.log(data)
    })

    .catch(error => { console.log('Error finding socialChallenge', error) })
})


router.get('/socialChallengeDetail/:id', (req, res, next) => {
  const { id } = req.params;
  SocialChallenge.findById(id)
    .then(data => { res.render("priv/challengeDetail.hbs", { data }) })
    .catch(error => { console.log('Error finding socialChallenge', error) })
})


router.post('/addSocialChallenge/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.currentUser;
  SocialChallenge.findById(id)
  User.findOneAndUpdate({ "_id": userId }, { $push: { socialChallenges: id } }, { new: true })
    .then(challenge => console.log(challenge))
  res.redirect("/priv/socialChallenges");
})

router.post('/socialChallenge/delete/:id', (req, res, next) => {
  const {id} = req.params;
  SocialChallenge.findByIdAndDelete({ _id: id})
  .then (() => {
    res.redirect('/priv/user')
  })
  .catch((error) => {
    console.log(error);
  })
})




module.exports = router;